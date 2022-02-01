// eslint-disable-next-line import/no-cycle
import AppController from '../AppController';
import AppModel from '../AppModel';
import AuthView from './AuthView';

class AuthController extends AppController {
  view: AuthView;

  constructor(view: AuthView, model: AppModel) {
    super(view, model);
    this.view = view;
    this.model = model;
  }

  displayPage(): void {
    this.view.drawPage();
  }
}

export default AuthController;
