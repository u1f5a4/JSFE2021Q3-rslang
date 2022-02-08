import Control from '../../../core/BaseElement';
import InputControl from '../../../core/BaseElement-input';
import AuthButton from './auth-button';

class SignInForm extends Control {
  inpunEmail: InputControl<HTMLInputElement>;

  passwordInput: InputControl<HTMLInputElement>;

  formButtons: AuthButton;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'form', '', '');
    this.node.insertAdjacentHTML('afterbegin', '<h5>Войти</h5>');
    this.inpunEmail = new InputControl(
      this.node,
      'input',
      '',
      'text',
      'Email Adress'
    );
    this.passwordInput = new InputControl(
      this.node,
      'input',
      '',
      'password',
      'Пароль'
    );
    this.formButtons = new AuthButton(this.node);
  }
}

export default SignInForm;
