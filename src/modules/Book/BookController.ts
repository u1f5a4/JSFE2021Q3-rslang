// eslint-disable-next-line import/no-cycle
import AppController from '../AppController';
import AppModel from '../AppModel';
import BookView from './BookView';
// eslint-disable-next-line import/no-cycle
import BookCardController from './Card/BookCardController';

class BookController extends AppController {
  view: BookView;

  card?: BookCardController;

  constructor(view: BookView, model: AppModel) {
    super(view, model);
    this.view = view;
    this.model = model;
  }

  async displayPage() {
    this.view.drawPage();
    this.bindButtons();
  }

  bindButtons() {
    const buttons = document.querySelector('.app')?.childNodes as NodeList;

    Array.from(buttons).forEach((div) => {
      div.addEventListener('click', (event) => {
        const group = this.getData(event, 'group');
        this.card?.displayPageCard(group);
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getData(event: Event, value: string) {
    const element = event.currentTarget as HTMLDivElement;
    return String(element.dataset[value]);
  }
}

export default BookController;
