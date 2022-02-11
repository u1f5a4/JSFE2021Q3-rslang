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
    if (group === 'difficult') {
      console.log('difficult page');
      return;
    }

    let localPage = Number(this.model.getSetting(`group/${group}`));
    if (!localPage) {
      this.model.addSetting({ [`group/${group}`]: [`${this.page}`] });
      localPage = this.page;
    }
    this.page = localPage;

    this.view.page = this.page;
    this.view.group = group;
    this.view.wordNumber = this.wordNumber;

    this.words = await this.model.getWords(Number(group), this.page);
    const word = this.words[this.wordNumber];
    this.view.drawCardPage(word);

    this.bindButton(group);
    this.model.logout();
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
      const buttons = ['play-audio-card'];
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
  }
}

export default BookCardController;
