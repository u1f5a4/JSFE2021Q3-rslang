import Control from '../../../core/BaseElement';

class AuthButton extends Control {
  singUpButton: Control<HTMLElement>;

  singInButton: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'button-container', '');
    this.singUpButton = new Control(
      this.node,
      'button',
      'login-button',
      'Регистрация'
    );
    this.singInButton = new Control(
      this.node,
      'button',
      'login-button',
      'Войти'
    );
  }
}

export default AuthButton;
