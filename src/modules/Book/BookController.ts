// eslint-disable-next-line import/no-cycle
import AppController from '../AppController';
import AppModel from '../AppModel';
import BookView from './BookView';

class BookController extends AppController {
  constructor(view: BookView, model: AppModel) {
    super(view, model);
    this.view = view;
    this.model = model;
  }

  displayPage(): void {
    this.view.drawPage();
  }
}

export default BookController;
