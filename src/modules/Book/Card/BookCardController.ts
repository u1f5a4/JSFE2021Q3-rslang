/* eslint-disable no-underscore-dangle */
import AppModel from '../../AppModel';
import BookCardView from './BookCardView';
import IWord from '../../../models/word-model';
import AppController from '../../../core/Controller';

class BookCardController extends AppController {
  page: number;

  words!: IWord[];

  wordNumber: number;

  constructor(public view: BookCardView, public model: AppModel) {
    super(view, model);
    this.page = 0;
    this.wordNumber = 0;
    this.view.domain = this.model.getDomain();
  }

  async displayPage(group: string) {
    this.view.isUser = this.model.isUser();

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

    if (this.view.isUser && group === 'difficult') {
      this.words = await this.model.getAllDifficultWords(this.page);
      this.view.countDifficultWords = Number(
        (Number(await this.model.getCountAllDifficultWords()) / 20).toFixed()
      );
      this.view.countDifficultWordsOnPage = this.words.length;
    }
    if (this.view.isUser && group !== 'difficult') {
      this.words = await this.model.getTwentyUserWords(group, this.page);
    }
    if (!this.view.isUser) {
      this.words = await this.model.getWords(group, this.page);
    }

    const word = this.words[this.wordNumber];
    this.view.drawCardPage(word);

    this.bindButton(group);
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
      document.location = '/#book';
    });

    const buttonGoSprintGame = document.querySelector('#go-sprint-game');
    buttonGoSprintGame?.addEventListener('click', () => {
      document.location = '/#book';
    });

    const buttonDifficult = document.querySelector('#complicate-word');
    buttonDifficult?.addEventListener('click', async () => {
      const word = this.words[this.wordNumber];
      this.model.setWordDifficult(String(word._id), word.word);
      this.view.changeCardToDifficulty();
    });

    const buttonEasy = document.querySelector('#easy-word');
    buttonEasy?.addEventListener('click', () => {
      const word = this.words[this.wordNumber];
      this.model.setWordEasy(String(word._id), word.word);
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
      if (this.page !== this.view.countDifficultWords) {
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
