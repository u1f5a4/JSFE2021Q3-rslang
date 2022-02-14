import Control from '../../../core/BaseElement';
import InputControl from '../../../core/BaseElement-input';
import { IUser } from '../../../models/user-model';

class SignUpForm extends Control {
  public inputName: InputControl<HTMLInputElement>;

  private inputEmail: InputControl<HTMLInputElement>;

  private inputPassword: InputControl<HTMLInputElement>;

  public onSubmit!: (value: IUser) => void;

  public singUpButton: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'form', 'form', '');

    this.inputName = new InputControl(
      this.node,
      'input',
      '',
      '2',
      'text',
      'Имя'
    );

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

    this.singUpButton = new Control(
      this.node,
      'button',
      'login-button',
      'Зарегистрироваться'
    );

    this.singUpButton.node.setAttribute('type', 'submit');
    this.singUpButton.node.onclick = (event) => {
      event.preventDefault();
      this.onSubmit(this.submitFormHandler());
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
