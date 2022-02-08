import SignUpForm from './components/signup-form';
import './AuthStyle.scss';
import View from '../../core/View-auth';
import Control from '../../core/BaseElement';

class AuthView extends View {
  formAuth: SignUpForm;

  button: Control<HTMLButtonElement>;

  onClick!: () => void;

  name!: string;

  constructor() {
    super('div', 'auth__container');
    this.node.innerHTML = `<h1 class="auth__title">Добро пожаловать ${this.userName}</h1>`;
    this.formAuth = new SignUpForm(this.node);
    this.button = new Control(
      this.node,
      'button',
      'login-button',
      'Пользователи'
    );
    this.button.node.onclick = () => {
      this.onClick();
    };
  }

  get userName() {
    return this.name;
  }

  set userName(value) {
    this.name = value;
  }
}

export default AuthView;
