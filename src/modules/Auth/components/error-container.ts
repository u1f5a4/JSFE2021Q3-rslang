import Control from '../../../core/BaseElement';

type ErrorMessage = { message: string; path: string[] };

export default class ErrorContainer extends Control {
  public textList: Control<HTMLElement>;

  public errorItem!: Control<HTMLElement>;

  private errorIcon: Control<HTMLElement>;

  constructor(
    parentNode: HTMLElement,
    public messageErrors: ErrorMessage[],
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
      Array.from(this.messageErrors).forEach((message: ErrorMessage) => {
        this.errorItem = new Control(
          this.textList.node,
          'li',
          'error__item',
          `${message.message}`
        );
      });
    }
  }
}
