import Control from '../../../core/BaseElement';
import SignUpForm from './signup-form';

class FormHeader extends Control {
  public titleUp: Control<HTMLButtonElement>;

  public titleIn: Control<HTMLButtonElement>;

  public onToggleIn!: () => void;

  public onToggleUp!: () => void;

  titleBlock: Control<HTMLElement>;

  isToggle: boolean = false;

  formHeader: Control<HTMLElement>;

  formAuth: SignUpForm;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'form__container', '');

    this.formHeader = new Control(this.node, 'div', 'form__header', '');

    this.titleBlock = new Control(
      this.formHeader.node,
      'div',
      'title-block',
      ''
    );

    this.titleUp = new Control(
      this.titleBlock.node,
      'button',
      'auth__button header-font active-button',
      'Зарегистрироваться'
    );

    this.titleUp.node.disabled = true;
    this.titleIn = new Control(
      this.titleBlock.node,
      'button',
      'auth__button header-font',
      'Вход'
    );

    this.formAuth = new SignUpForm(this.node);

    this.titleIn.node.onclick = () => {
      this.onToggleIn();
      this.titleIn.node.disabled = true;
      this.titleUp.node.disabled = false;
      this.titleIn.node.classList.toggle('active-button');
      this.titleUp.node.classList.toggle('active-button');
    };

    this.titleUp.node.onclick = () => {
      this.onToggleUp();
      this.titleIn.node.disabled = false;
      this.titleUp.node.disabled = true;
      this.titleIn.node.classList.toggle('active-button');
      this.titleUp.node.classList.toggle('active-button');
    };
  }
}

export default FormHeader;
