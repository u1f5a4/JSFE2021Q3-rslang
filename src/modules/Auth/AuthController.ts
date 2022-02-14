import AppController from '../../core/Controller';
import AppModel from '../AppModel';
import AuthView from './AuthView';

class AuthController extends AppController {
  constructor(public view: AuthView, public model: AppModel) {
    super(view, model);
  }

  displayPage() {
    this.view.drawPage();
    this.bindButton();
  }

  bindButton() {
    const btnRegistration = document.querySelector('#button-registration');
    btnRegistration?.addEventListener('click', () => this.registration());

    const btnSingIn = document.querySelector('#button-signIn');
    btnSingIn?.addEventListener('click', () => this.signIn());
  }

  // eslint-disable-next-line class-methods-use-this
  getDataInput() {
    const name = (document.querySelector('#name') as HTMLInputElement).value;
    const email = (document.querySelector('#email') as HTMLInputElement).value;
    const password = (document.querySelector('#password') as HTMLInputElement)
      .value;

    return { name, email, password };
  }

  registration() {
    this.model.createUser(this.getDataInput());
  }

  signIn() {
    const dataInputs = this.getDataInput();
    const data = {
      email: dataInputs.email,
      password: dataInputs.password,
    };

    this.model.signIn(data);
  }
}

export default AuthController;
