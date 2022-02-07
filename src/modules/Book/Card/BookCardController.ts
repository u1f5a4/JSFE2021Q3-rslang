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

  async displayPage(group: string, page = this.page) {
    if (group === 'difficult') {
      console.log('difficult page');
      return;
    }

    this.view.group = group;
    this.view.page = page;
    this.view.wordNumber = this.wordNumber;

    this.words = await this.model.getWords(Number(group), page);
    const word = this.words[this.wordNumber];
    this.view.drawCardPage(word);

    document
      .querySelector('#flip')
      ?.addEventListener('click', (event) => this.flip(event));

    this.bindButton(group);
  }

  // eslint-disable-next-line class-methods-use-this
  playAudio() {}

  // eslint-disable-next-line class-methods-use-this
  flip(event: Event) {
    const card = event.currentTarget as HTMLElement;

    const element = event.target as HTMLElement;
    const buttons = ['book-card__button-audio'];
    const isButton = (htmlElement: HTMLElement) =>
      !buttons.some((selector) => htmlElement.classList.contains(selector));

    if (isButton(element)) {
      if (card.className === 'book-card__card') {
        if (card.style.transform === 'rotateY(180deg)') {
          card.style.transform = 'rotateY(0deg)';
        } else {
          card.style.transform = 'rotateY(180deg)';
        }
      }
    }
  }

  bindButton(group: string) {
    const nextPage = document.querySelector('#next-page');
    nextPage?.addEventListener('click', () => {
      if (this.page !== 29) {
        this.page += 1;
        this.wordNumber = 0;
        this.displayPage(group);
      }
    });

    const prevPage = document.querySelector('#prev-page');
    prevPage?.addEventListener('click', () => {
      if (this.page > 0) {
        this.page -= 1;
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

    const playAudio = document.querySelector('.book-card__button-audio');
    playAudio?.addEventListener('click', () => {
      const word = this.words[this.wordNumber];
      const audio = new Audio(`${this.model.getDomain()}/${word.audio}`);
      audio.play();
    });
  }
}

export default BookCardController;
