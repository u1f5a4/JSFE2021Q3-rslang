import Control from '../../../core/BaseElement';

export default class SprintButtons extends Control {
  public trueButton: Control<HTMLButtonElement>;

  public falseButton: Control<HTMLButtonElement>;

  public onClickNextWordTrue!: () => void;

  public onClickNextWordFalse!: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'buttons-field', '');
    this.falseButton = new Control(
      this.node,
      'button',
      'game-button true-button',
      'Неверно'
    );
    this.trueButton = new Control(
      this.node,
      'button',
      'game-button false-button',
      'Верно'
    );
    this.trueButton.node.onclick = () => {
      this.onClickNextWordTrue();
    };
    this.falseButton.node.onclick = () => {
      this.onClickNextWordFalse();
    };
  }
}
