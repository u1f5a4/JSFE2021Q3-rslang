import Control from '../../core/BaseElement';
import {
  CORRECT_SOUND,
  COUNT_RIGHT_ANSWERS,
  delayBorderHighlight,
  ERROR_SOUND,
  MAX_COUNT_WORD_PER_PAGE,
  START_POINTS,
} from '../../core/constants/server-constants';
import delay from '../../core/delay';
import IWord from '../../models/word-model';
import AppModel from '../AppModel';
import { generateRandomNumber } from '../AudioCall/AudioCallGame/services/utils';
import SprintResults from './components/results';
// eslint-disable-next-line import/no-cycle
import SprintFieldGame from './components/sprint-field-game';
// eslint-disable-next-line import/no-cycle
import SprintGame from './components/sprint-game';
import {
  shuffle,
  playAudio,
  getSeries,
  disable,
  enable,
} from './services/utils';
import SprintView from './SprintView';

export type Question = {
  answersCorrect: IWord[];
  answers: {
    word: IWord[];
    translate: string[];
  };
};

export default class SprintController {
  data!: IWord[];

  game!: SprintGame;

  group?: string;

  pageIndex: number = 0;

  correctAnswersArr: IWord[] = [];

  errorAnswersArr: IWord[] = [];

  rightWords: boolean[] = [];

  scoreValue: number = 0;

  scorePoints: number = 10;

  correctWord: IWord | undefined;

  errorWord: IWord | undefined;

  result!: SprintResults;

  newWords: Set<string>;

  seriesArr: boolean[] = [];

  constructor(public view: SprintView, public model: AppModel) {
    this.newWords = new Set();
  }

  private bindButtons(): void {
    const form = document.getElementById('audio-call-form') as HTMLFormElement;
    const firstInput = document.getElementById('level-1') as HTMLInputElement;
    firstInput.checked = true;
    form.addEventListener('submit', async (event) => {
      const checkedInput = document.querySelector(
        'input[name=audio-game]:checked'
      ) as HTMLInputElement;
      window.location.href = `/#sprint-game/${checkedInput.value}`;
      event.preventDefault();
    });
  }

  private getWordsPerPage(): Question[] {
    const answers: Array<IWord> = [];
    const translate: Array<string> = [];
    const result: Array<Question> = [];
    const set = new Set<IWord>();
    for (let i = 0; i < 10; i += 1) {
      const correctAnswerIndex = Math.floor(
        Math.random() * MAX_COUNT_WORD_PER_PAGE
      );
      set.add(this.data[correctAnswerIndex]);
    }
    this.data.forEach((word) => {
      answers.push(word);
      translate.push(word.wordTranslate);
      shuffle(answers);
      shuffle(translate);
    });
    const question: Question = {
      answersCorrect: [...set],
      answers: {
        word: answers,
        translate,
      },
    };
    result.push(question);
    return result;
  }

  private async buttonsHandler(): Promise<void> {
    this.game.gameField.index += 1;
    await this.switchOnNextPage();
    this.game.gameField.word.destroy();
    this.game.gameField.translation.destroy();
    this.game.gameField.gameButtons.destroy();
    this.game.gameField.renderWords();
    this.game.gameField.gameButtons.falseButton.node.disabled = false;
    this.game.gameField.gameButtons.trueButton.node.disabled = false;
    enable();
    this.checkAnswers();
    this.keyHandler();
    this.newWords.add(
      this.game.gameField.dataWord.answers.word[this.game.gameField.index].id!
    );
  }

  private async switchOnNextPage(): Promise<void> {
    if (this.game.gameField.index === 20) {
      this.data = await this.model.getWords(
        String(this.group),
        this.pageIndex + 1
      );
      this.game.gameField.destroy();
      this.game.gameField = new SprintFieldGame(
        this.game.sprintContainer.node,
        this.getWordsPerPage()
      );
      this.renderPoints();
      this.buttonsHandler();
    }
  }

  private checkAnswers(): void {
    this.game.gameField.gameButtons.onClickNextWordTrue = async () => {
      this.game.gameField.gameButtons.falseButton.node.disabled = true;
      this.game.gameField.gameButtons.trueButton.node.disabled = true;
      await this.onClickTrueButton();
    };
    this.game.gameField.gameButtons.onClickNextWordFalse = async () => {
      this.game.gameField.gameButtons.falseButton.node.disabled = true;
      this.game.gameField.gameButtons.trueButton.node.disabled = true;
      await this.onClickFalseButton();
    };
  }

  private async onClickTrueButton(): Promise<void> {
    if (
      this.game.gameField.answerArr.includes(
        this.game.gameField.dataWord.answers.word[this.game.gameField.index]
          .word
      ) ||
      this.game.gameField.dataWord.answers.translate[
        this.game.gameField.index
      ] ===
        this.game.gameField.dataWord.answers.word[this.game.gameField.index]
          .wordTranslate
    ) {
      this.getRightAnswer();
    } else {
      await this.getWrongAnswer();
    }
    await this.buttonsHandler();
  }

  private async onClickFalseButton(): Promise<void> {
    if (
      !this.game.gameField.answerArr.includes(
        this.game.gameField.dataWord.answers.word[this.game.gameField.index]
          .word
      )
    ) {
      this.getRightAnswer();
    } else {
      await this.getWrongAnswer();
    }
    await this.buttonsHandler();
  }

  private getRightAnswer(): void {
    this.correctWord = this.data.find(
      (item) =>
        item.word ===
        this.game.gameField.dataWord.answers.word[this.game.gameField.index]
          .word
    );
    if (this.correctWord) this.correctAnswersArr.push(this.correctWord);
    const track = `assets/audio/${CORRECT_SOUND}`;
    playAudio(track);
    this.renderPoints();
    this.rightWords.push(true);
    this.seriesArr.push(true);
    this.scoreValue += this.scorePoints;
    this.game.score.destroy();
    this.game.score = new Control(
      this.game.sprintContainer.node,
      'span',
      'score header-font',
      `${this.scoreValue}`
    );
  }

  private async getWrongAnswer(): Promise<void> {
    this.errorWord = this.data.find(
      (item) =>
        item.word ===
        this.game.gameField.dataWord.answers.word[this.game.gameField.index]
          .word
    );
    if (this.errorWord) this.errorAnswersArr.push(this.errorWord);
    this.game.gameField.markerContainer.destroy();
    this.game.gameField.markerContainer = new Control(
      this.game.gameField.node,
      'div',
      'marker-container'
    );
    this.rightWords = [];
    this.seriesArr.push(false);
    this.scorePoints = START_POINTS;
    this.game.gameField.node.classList.add('animate');
    const track = `assets/audio/${ERROR_SOUND}`;
    playAudio(track);
    await delay(delayBorderHighlight);
    this.game.gameField.node.classList.remove('animate');
  }

  private renderPoints(): void {
    if (this.rightWords.length < COUNT_RIGHT_ANSWERS) {
      this.game.gameField.marker = new Control(
        this.game.gameField.markerContainer.node,
        'span',
        'marker',
        ''
      );
      return;
    }
    if (this.rightWords.length >= COUNT_RIGHT_ANSWERS) {
      this.scorePoints += START_POINTS;
      this.game.gameField.markerContainer.destroy();
      this.game.gameField.markerContainer = new Control(
        this.game.gameField.node,
        'div',
        'marker-container'
      );
      this.game.gameField.marker = new Control(
        this.game.gameField.markerContainer.node,
        'span',
        'marker',
        ''
      );
      this.rightWords = [];
    }
  }

  private onPlayAudio(): void {
    this.game.onPlayAudio = () => {
      const track = `${this.model.getDomain()}/${this.game.gameField.audio}`;
      playAudio(track);
    };
  }

  private stopGame(): void {
    this.game.timer.onTimeOut = () => {
      this.game.sprintContainer.destroy();
      if (this.model.isUser()) this.saveStat();
      this.result = new SprintResults(
        this.game.node,
        this.errorAnswersArr,
        this.correctAnswersArr
      );
      this.scoreValue = 0;
      this.errorAnswersArr = [];
      this.correctAnswersArr = [];
    };
  }

  private keyHandler(): void {
    document.onkeydown = (e) => {
      if (e.keyCode === 37) {
        disable();
        this.onClickFalseButton();
      }
      if (e.keyCode === 39) {
        disable();
        this.onClickTrueButton();
      }
      if (e.keyCode === 32) {
        const track = `${this.model.getDomain()}/${this.game.gameField.audio}`;
        playAudio(track);
        disable();
        e.preventDefault();
      }
    };
  }

  public async displayPage(): Promise<void> {
    this.view.drawPage();
    this.bindButtons();
    this.model.logout();
  }

  public async playGame(group: string, page: string) {
    this.group = group;
    this.data = await this.genData(group, page);
    this.game = new SprintGame(this.scoreValue, this.getWordsPerPage());
    this.game.drawPage();
    this.onPlayAudio();
    this.checkAnswers();
    this.keyHandler();
    this.stopGame();
  }

  private saveStat(): void {
    const words = [...this.newWords];
    const right = this.correctAnswersArr.length;
    const wrong = this.errorAnswersArr.length;
    const series = getSeries(this.seriesArr);
    const data = { words, right, wrong, series };
    this.model.updateGameStat('sprintGame', data);
  }

  async genData(group: string, page: string) {
    let getWords;
    if (page === 'random') {
      const randomPage = generateRandomNumber(0, 29);
      getWords = this.model.getWords(group, randomPage);
    } else if (this.model.isUser()) {
      getWords = await this.model.getTwentyUserWordsWithoutEasy(
        group,
        Number(page)
      );
      // eslint-disable-next-line no-underscore-dangle
      getWords = getWords.map((elem) => ({ id: elem._id, ...elem }));
    } else {
      getWords = this.model.getWords(group, Number(page));
    }
    return getWords;
  }
}
