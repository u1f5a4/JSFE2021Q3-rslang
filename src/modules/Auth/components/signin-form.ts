import Control from '../../../core/BaseElement';
import InputControl from '../../../core/BaseElement-input';
import { IUser } from '../../../models/user-model';

class SignInForm extends Control {
  private inputEmail: InputControl<HTMLInputElement>;

  private inputPassword: InputControl<HTMLInputElement>;

  public onLogin!: (value: IUser) => void;

  public singInButton: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'form', 'form', '');

    this.inputEmail = new InputControl(
      this.node,
      'input',
      '',
      '',
      'text',
      'Почта'
    );

    this.inputPassword = new InputControl(
      this.node,
      'input',
      '',
      '8',
      'password',
      'Пароль'
    );

    this.singInButton = new Control(
      this.node,
      'button',
      'login-button',
      'Войти'
    );

    this.singInButton.node.onclick = (event) => {
      event.preventDefault();
      this.onLogin(this.submitFormHandler());
    };
  }

  public submitFormHandler(): IUser {
    const user = {
      name: '',
      email: this.inputEmail.node.value,
      password: this.inputPassword.node.value,
    };
    return user;
  }
}

export default SignInForm;
