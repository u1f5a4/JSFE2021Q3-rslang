import Control from '../../../core/BaseElement';

export default class ErrorContainer extends Control {
  public textList: Control<HTMLElement>;

  public errorItem!: Control<HTMLElement>;

  private errorIcon: Control<HTMLElement>;

  constructor(
    parentNode: HTMLElement,
    public messageErrors: string[],
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
      Array.from(this.messageErrors).map((message) => {
        this.errorItem = new Control(
          this.textList.node,
          'li',
          'error__item',
          `${message}`
        );
        return false;
      });
    }
  }
}
