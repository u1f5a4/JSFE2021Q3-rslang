import { STATE } from '../core/constants/server-constants';
import AppView from '../core/View';
// eslint-disable-next-line import/no-cycle
import IWord from '../models/word-model';
import renderHeaderTemplate from '../сomponents/Header/_renderHeaderTemplate';
// eslint-disable-next-line import/no-cycle
import AuthController from './Auth/AuthController';
import AuthModel from './Auth/AuthModel';
import AuthView from './Auth/AuthView';

const emojiList = [
  ['1', '🤐'],
  ['2', '🙄'],
  ['3', '🤤'],
  ['4', '🤓'],
  ['5', '😬'],
  ['6', '😭'],
  ['difficult', '🤡'],
];

type UserWord = {
  difficulty: string;
  optional: { answers: string; difficulty: boolean; easy: boolean };
  id?: string;
  wordId?: string;
};
export { UserWord };

type UserWord2 = [
  { paginatedResults: IWord[]; totalCount: [{ count: number }] }
];

class AppModel {
  private domain = 'https://rslang-words.herokuapp.com';

  // === Работа со словами при авторизации === //

  async getAllDifficultWords(page: number): Promise<IWord[]> {
    const userWords = await this.getAllUserWords();
    const filtered = userWords.filter((elem) => elem.optional.difficulty);
    const wordIdList = filtered.map((elem) => elem.wordId);

    const promiseArray: Promise<any>[] = [];
    wordIdList.forEach((wordId) => {
      promiseArray.push(this.getWord(String(wordId)));
    });
    const commonWords = await Promise.all(promiseArray);
    const result = commonWords.map((elem, index) =>
      Object.assign(elem, { userWord: filtered[index] })
    );

    const ZeroCountCompensation = 1;
    const wordsOnPage = 20;

    const words = result.splice(
      wordsOnPage * (page + ZeroCountCompensation - 1),
      wordsOnPage * (page + ZeroCountCompensation)
    );

    return words;
  }

  async getCountAllDifficultWords(): Promise<number> {
    const userWords = await this.getAllUserWords();
    const filtered = userWords.filter((elem) => elem.optional.difficulty);
    return filtered.length;
  }

  async setWordDifficult(wordId: string, word: string): Promise<void> {
    try {
      await this.updateUserWord(wordId, word, '0', true, false);
    } catch {
      await this.createUserWord(wordId, word);
      await this.updateUserWord(wordId, word, '0', true, false);
    }
  }

  async setWordEasy(wordId: string, word: string): Promise<void> {
    try {
      await this.updateUserWord(wordId, word, '0', false, true);
    } catch {
      await this.createUserWord(wordId, word);
      await this.updateUserWord(wordId, word, '0', false, true);
    }
  }

  async getTwentyUserWords(group: string, page: number): Promise<IWord[]> {
    const one = (await this.getUserWords(group, page))[0].paginatedResults;

    const two = (await this.getUserWords(group, page + 1))[0].paginatedResults;

    const array = one.concat(two);

    return array;
  }

  async deleteUserWord(wordId: string): Promise<void> {
    const { userId, token } = this.getSetting('auth');

    await fetch(`${this.domain}/users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private async getUserWords(group: string, page: number): Promise<UserWord2> {
    const { userId, token } = this.getSetting('auth');

    const rawResponse = await fetch(
      `${this.domain}/users/${userId}/aggregatedWords?group=${group}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    return rawResponse.json();
  }

  private async createUserWord(wordId: string, word: string): Promise<void> {
    const { userId, token } = this.getSetting('auth');
    const data = {
      difficulty: word,
      optional: {
        correctAnswerCounter: '0',
        difficulty: false,
        easy: false,
      },
    };

    await fetch(`${this.domain}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  private async updateUserWord(
    wordId: string,
    word: string,
    answers: string,
    difficulty: boolean,
    easy: boolean
  ): Promise<UserWord> {
    const { userId, token } = this.getSetting('auth');

    const data: UserWord = {
      difficulty: word,
      optional: {
        answers,
        difficulty,
        easy,
      },
    };

    const response = await fetch(
      `${this.domain}/users/${userId}/words/${wordId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const content = await response.json();
    return content;
  }

  private async getAllUserWords(): Promise<UserWord[]> {
    const { userId, token } = this.getSetting('auth');

    const rawResponse = await fetch(`${this.domain}/users/${userId}/words/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const content = await rawResponse.json();
    return content;
  }

  // === Работа с User === //

  // eslint-disable-next-line class-methods-use-this
  public logout(): void {
    const logoutBtn = document.getElementById(
      'logout-btn'
    ) as HTMLButtonElement;
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        localStorage.clear();
        STATE.auth = JSON.parse(localStorage.getItem('user')!);
        STATE.userName = JSON.parse(localStorage.getItem('user')!);
        AppView.clear();
        const auth = new AuthController(new AuthView(), new AuthModel());
        auth.displayPage();
        renderHeaderTemplate();
      };
    }
  }

  isUser(): boolean {
    try {
      return 'name' in this.getSetting('auth');
    } catch (error) {
      return false;
    }
  }

  // === Работа со словами без авторизации === //

  async getWords(group: string, page: number): Promise<IWord[]> {
    return (
      await fetch(`${this.domain}/words?group=${group}&page=${page}`, {
        method: 'GET',
      })
    ).json();
  }

  async getWord(wordId: string): Promise<IWord> {
    return (
      await fetch(`${this.domain}/words/${wordId}`, {
        method: 'GET',
      })
    ).json();
  }

  getDomain(): string {
    return this.domain;
  }

  // === Работа с localStorage === //

  getSetting(key: string) {
    const setting = this.downloadSetting();
    if (setting) return setting[key];
    return null;
  }

  addSetting(data: {}): void {
    const setting = this.downloadSetting();
    if (setting) this.saveSetting(Object.assign(setting, data));
    else this.saveSetting(data);
  }

  // eslint-disable-next-line class-methods-use-this
  private downloadSetting() {
    const setting = localStorage.getItem('rslang-localStorage');
    return JSON.parse(String(setting));
  }

  // eslint-disable-next-line class-methods-use-this
  private saveSetting(setting: {}) {
    localStorage.setItem('rslang-localStorage', JSON.stringify(setting));
  }
}

export default AppModel;
export { emojiList };
