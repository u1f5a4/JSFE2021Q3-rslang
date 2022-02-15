import Control from '../../../core/BaseElement';

interface ErrorType {
  message: string;
  path: [string];
}

export default class ErrorContainer extends Control {
  public textList: Control<HTMLElement>;

  public errorItem!: Control<HTMLElement>;

  private errorIcon: Control<HTMLElement>;

  constructor(
    parentNode: HTMLElement,
    public messageErrors: ErrorType[] | string,
    public messageText?: string
  ) {
    super(parentNode, 'div', 'auth__error', '');
    this.errorIcon = new Control(this.node, 'span', 'error__icon', '');
    this.textList = new Control(this.node, 'ul', 'error__list', '');
    this.renderErrorMessage();
  }

  renderErrorMessage() {
    if (typeof this.messageErrors === 'string') {
      this.errorItem = new Control(
        this.textList.node,
        'li',
        'error__item',
        `${this.messageErrors}`
      );
    } else {
      this.messageErrors.map((message: ErrorType) => {
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
