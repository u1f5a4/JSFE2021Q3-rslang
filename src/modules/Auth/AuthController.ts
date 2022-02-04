import AppController from '../../core/Controller';
import AppModel from '../AppModel';
import AuthView from './AuthView';

class AuthController extends AppController {
  constructor(public view: AuthView, public model: AppModel) {
    super(view, model);
  }

  displayPage() {
    this.view.drawPage();
    // вот здесь будет бинд кнопок к событиям
    // события будут записаны здесь как методы
  }
}

export default AuthController;
