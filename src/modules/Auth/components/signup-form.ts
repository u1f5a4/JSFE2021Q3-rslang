import Control from '../../../core/BaseElement';
import InputControl from '../../../core/BaseElement-input';
import { IUser } from '../../../models/user-model';
import AuthButton from './auth-button';

class SignUpForm extends Control {
  public inputName: InputControl<HTMLInputElement>;

  private inputEmail: InputControl<HTMLInputElement>;

  private inputPassword: InputControl<HTMLInputElement>;

  public formButtons: AuthButton;

  public onSubmit!: (value: IUser) => void;

  public onLogin!: (value: IUser) => void;

  public titleBlock: Control<HTMLElement>;

  private title: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'form', '', '');
    this.titleBlock = new Control(this.node, 'div', '', '');
    this.title = new Control(this.titleBlock.node, 'h5', '', 'Регистрация');
    this.inputName = new InputControl(this.node, 'input', '', 'text', 'Имя');
    this.inputEmail = new InputControl(
      this.node,
      'input',
      '',
      'text',
      'Email Adress'
    );
    this.inputPassword = new InputControl(
      this.node,
      'input',
      '',
      'password',
      'Пароль'
    );
    this.formButtons = new AuthButton(this.node);
    this.formButtons.singUpButton.node.onclick = (event) => {
      event.preventDefault();
      this.onSubmit(this.submitFormHandler());
    };
    this.formButtons.singInButton.node.onclick = (event) => {
      event.preventDefault();
      this.onLogin(this.submitFormHandler());
    };
  }

  public submitFormHandler(): IUser {
    const user = {
      name: this.inputName.node.value,
      email: this.inputEmail.node.value,
      password: this.inputPassword.node.value,
    };
    return user;
  }
}

export default SignUpForm;
