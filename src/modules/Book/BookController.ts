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
    this.view.drawPage();
    this.bindButtons();
  }

  bindButtons() {
    const buttons = document.querySelector('.app')?.childNodes as NodeList;

    Array.from(buttons).forEach((div) => {
      div.addEventListener('click', (event) => {
        let group = this.getData(event, 'group');
        if (group === 'difficult') {
          console.log('difficult page');
        } else {
          const ZeroCountCompensation = 1;
          group = String(Number(group) - ZeroCountCompensation);
          this.card?.displayPage(group);
        }
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getData(event: Event, value: string): string {
    const element = event.currentTarget as HTMLDivElement;
    return String(element.dataset[value]);
  }
}

export default BookController;
