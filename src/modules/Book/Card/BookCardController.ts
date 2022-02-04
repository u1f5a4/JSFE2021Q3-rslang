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
  }

  async displayPage(group: string, page = this.page) {
    this.wordNumber = 0;
    this.words = await this.model.getWords(Number(group), page);
    const { word } = this.words[0];

    this.view.drawCardPage(group, word, page);

    this.bindButton(group);
  }

  bindButton(group: string) {
    const nextPage = document.querySelector('#next-page');
    nextPage?.addEventListener('click', () => {
      if (this.page !== 29) {
        this.page += 1;
        this.displayPage(group);
      }
    });

    const prevPage = document.querySelector('#prev-page');
    prevPage?.addEventListener('click', () => {
      if (this.page > 0) {
        this.page -= 1;
        this.displayPage(group);
      }
    });

    const enWord = document.querySelector('#en-word');
    const countWord = document.querySelector('#count-word');

    const prevWord = document.querySelector('#prev-word');
    prevWord?.addEventListener('click', () => {
      if (this.wordNumber > 0) this.wordNumber -= 1;
      enWord!.textContent = this.words[this.wordNumber].word;
      countWord!.textContent = `${this.wordNumber + 1}/20`;
    });

    const nextWord = document.querySelector('#next-word');
    nextWord?.addEventListener('click', () => {
      if (this.wordNumber !== 19) this.wordNumber += 1;
      enWord!.textContent = this.words[this.wordNumber].word;
      countWord!.textContent = `${this.wordNumber + 1}/20`;
    });
  }
}

export default BookCardController;
