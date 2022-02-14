import AppController from '../../core/Controller';
import AppModel from '../AppModel';
import BookView from './BookView';
import BookCardController from './Card/BookCardController';

class BookController extends AppController {
  card?: BookCardController;

  constructor(public view: BookView, public model: AppModel) {
    super(view, model);
  }

  async displayPage() {
    this.view.isUser = this.model.isUser();
    this.view.drawPage();
    this.bindButtons();
    this.model.logout();
  }

  bindButtons() {
    const buttons = document.querySelector('.app')?.childNodes as NodeList;

    Array.from(buttons).forEach((div) => {
      div.addEventListener('click', (event) => {
        this.card!.wordNumber = 0;
        const group = this.getDataset(event, 'group');
        window.location.href = `${window.location.href}/${group}`;
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getDataset(event: Event, value: string): string {
    const element = event.currentTarget as HTMLDivElement;
    return String(element.dataset[value]);
  }
}

export default BookController;
