import AppModel from './AppModel';
import AppView from './AppView';
// eslint-disable-next-line import/no-cycle
import AuthController from './Auth/AuthController';
// eslint-disable-next-line import/no-cycle
import BookController from './Book/BookController';

class AppController {
  view: AppView;

  model: AppModel;

  auth?: AuthController;

  book?: BookController;

  constructor(view: AppView, model: AppModel) {
    this.view = view;
    this.model = model;

    this.init();
  }

  init() {
    this.displayPage();
  }

  displayPage() {
    this.view.drawPage();
    this.bindButton();
  }

  bindButton() {
    this.view.authButton?.addEventListener('click', () =>
      this.auth?.displayPage()
    );

    this.view.bookButton?.addEventListener('click', () =>
      this.book?.displayPage()
    );
  }
}

export default AppController;
