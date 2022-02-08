import Control from '../../../core/BaseElement';

export default class ErrorContainer extends Control {
  private errorIcon: Control<HTMLElement>;

  public textList: Control<HTMLElement>;

  public errorItem!: Control<HTMLElement>;

  constructor(
    parentNode: HTMLElement,
    public messageErrors: any,
    public messageText?: string
  ) {
    super(parentNode, 'div', 'auth__error', '');
    this.errorIcon = new Control(this.node, 'span', 'error__icon', '');
    this.textList = new Control(this.node, 'ul', 'error__list', '');
    this.renderErrorMessage();
  }

  renderErrorMessage() {
    if (this.messageText) {
      this.errorItem = new Control(
        this.textList.node,
        'li',
        'error__item',
        `${this.messageText}`
      );
    } else {
      this.messageErrors.map((message: any) => {
        this.errorItem = new Control(
          this.textList.node,
          'li',
          'error__item',
          `${message.message}`
        );
        return false;
      });
    }
  }
}
