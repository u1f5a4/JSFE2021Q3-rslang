/* eslint-disable no-underscore-dangle */
import AppModel from '../../AppModel';
import BookCardView from './BookCardView';
import IWord from '../../../models/word-model';
import AppController from '../../../core/Controller';
import AudioCallGameController from '../../AudioCall/AudioCallGame/AudioCallGameController';
import SprintController from '../../SprintGame/SprintController';
import SprintView from '../../SprintGame/SprintView';
import AppView from '../../../core/View';

class BookCardController extends AppController {
  page: number;

  words!: IWord[];

  wordNumber: number;

  countDifficultWords?: number;

  audioGame?: AudioCallGameController;

  sprintGame!: SprintController;

  isUser?: boolean;

  constructor(public view: BookCardView, public model: AppModel) {
    super(view, model);
    this.page = 0;
    this.wordNumber = 0;
    this.view.domain = this.model.getDomain();
  }

  async displayPage(group: string) {
    this.isUser = this.model.isUser();
    this.view.isUser = this.isUser;

    const localPage = Number(this.model.getSetting(`group/${group}`));
    if (Number.isNaN(localPage)) {
      this.model.addSetting({ [`group/${group}`]: [`0`] });
      this.page = 0;
    } else {
      this.page = localPage;
    }

    this.view.page = this.page;
    this.view.group = group;
    this.view.wordNumber = this.wordNumber;

    if (this.isUser && group === 'difficult') {
      this.words = await this.model.getAllDifficultWords(this.page);
      this.countDifficultWords = await this.model.getCountAllDifficultWords();
      this.view.countDifficultWords = this.countDifficultWords;
      this.view.countDifficultWordsOnPage = this.words.length;
    }
    if (this.isUser && group !== 'difficult') {
      this.words = await this.model.getTwentyUserWords(group, this.page);
      this.view.typePage = this.isTypePage();
    }
    if (!this.isUser) {
      this.words = await this.model.getWords(group, this.page);
    }

    const word = this.words[this.wordNumber];
    this.view.drawCardPage(word);

    this.bindButton(group);
    this.model.logout();
  }

  isTypePage() {
    const easy = this.words.every(
      (elem: IWord) => elem.userWord?.optional.easy
    );
    const difficult = this.words.every(
      (elem: IWord) => elem.userWord?.optional.difficulty
    );

    if (easy) return 'easy';
    if (difficult) return 'difficult';
    return 'mixed';
  }

  bindButton(group: string) {
    const nextPage = document.querySelector('#next-page');
    nextPage?.addEventListener('click', () => {
      if (this.page !== 29) {
        this.page += 1;
        this.model.addSetting({ [`group/${group}`]: [`${this.page}`] });

        this.wordNumber = 0;
        this.displayPage(group);
      }
    });

    const prevPage = document.querySelector('#prev-page');
    prevPage?.addEventListener('click', () => {
      if (this.page > 0) {
        this.page -= 1;
        this.model.addSetting({ [`group/${group}`]: [`${this.page}`] });

        this.wordNumber = 0;
        this.displayPage(group);
      }
    });

    const prevWord = document.querySelector('#prev-word');
    prevWord?.addEventListener('click', () => {
      if (this.wordNumber > 0) {
        this.wordNumber -= 1;
        this.displayPage(group);
      }
    });

    const nextWord = document.querySelector('#next-word');
    nextWord?.addEventListener('click', () => {
      if (this.wordNumber !== 19) {
        this.wordNumber += 1;
        this.displayPage(group);
      }
    });

    const playAudio = document.querySelector('#play-audio-card');
    playAudio?.addEventListener('click', () => {
      const word = this.words[this.wordNumber];
      const tracks = [
        `${this.model.getDomain()}/${word.audio}`,
        `${this.model.getDomain()}/${word.audioMeaning}`,
        `${this.model.getDomain()}/${word.audioExample}`,
      ];
      const player = new Audio();
      let currentTrack = 0;
      player.src = tracks[currentTrack];
      player.play();

      player.addEventListener('ended', () => {
        currentTrack += 1;
        if (currentTrack !== tracks.length) {
          player.src = tracks[currentTrack];
          player.play();
        }
      });
    });

    const cardFlip = document.querySelector('#flip');
    cardFlip?.addEventListener('click', (event) => {
      const card = event.currentTarget as HTMLElement;

      const element = event.target as HTMLElement;
      const buttons = ['play-audio-card', 'complicate-word', 'easy-word'];
      const isButton = (htmlElement: HTMLElement) =>
        !buttons.some((selector) => htmlElement.id === selector);

      if (isButton(element)) {
        if (card.style.transform === 'rotateY(180deg)') {
          card.style.transform = 'rotateY(0deg)';
        } else {
          card.style.transform = 'rotateY(180deg)';
        }
      }
    });

    const buttonBack = document.querySelector('#button-back');
    buttonBack?.addEventListener('click', () => {
      document.location = '/#book';
    });

    const buttonGoAudioGame = document.querySelector('#go-audio-game');
    buttonGoAudioGame?.addEventListener('click', () => {
      if (this.isUser) this.audioGame!.displayPage(group, String(this.page));
      else this.audioGame!.displayPage(group, String(this.page));
    });

    const buttonGoSprintGame = document.querySelector('#go-sprint-game');
    buttonGoSprintGame?.addEventListener('click', () => {
      const sprint = new SprintController(new SprintView(), new AppModel());
      if (this.isUser) {
        AppView.clear();
        sprint.playGame(group, String(this.page));
      } else {
        AppView.clear();
        sprint.playGame(group, String(this.page));
      }
    });

    const buttonDifficult = document.querySelector('#complicate-word');
    buttonDifficult?.addEventListener('click', async () => {
      const word = this.words[this.wordNumber];
      this.model.setWordDifficult(String(word.id), word.word);
      this.view.changeCardToDifficulty();
    });

    const buttonEasy = document.querySelector('#easy-word');
    buttonEasy?.addEventListener('click', () => {
      const word = this.words[this.wordNumber];
      this.model.setWordEasy(String(word.id), word.word);
      this.view.changeCardToEasy();
    });

    const buttonClear = document.querySelector('#clear-word');
    buttonClear?.addEventListener('click', () => {
      const word = this.words[this.wordNumber];
      this.model.deleteUserWord(String(word.id));
      setTimeout(() => this.displayPage('difficult'), 700);
    });

    const nextPageDifficult = document.querySelector('#next-page-difficult');
    nextPageDifficult?.addEventListener('click', () => {
      if (this.page !== this.countDifficultWords) {
        this.page += 1;
        this.model.addSetting({ [`group/${group}`]: [`${this.page}`] });
        this.wordNumber = 0;
        this.displayPage(group);
      }
    });

    const nextWordDifficult = document.querySelector('#next-word-difficult');
    nextWordDifficult?.addEventListener('click', () => {
      const ZeroCountCompensation = 1;
      if (this.wordNumber !== this.words.length - ZeroCountCompensation) {
        this.wordNumber += 1;
        this.displayPage(group);
      }
    });
  }
}

export default BookCardController;
