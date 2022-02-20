import Control from '../../../core/BaseElement';
import IWord from '../../../models/word-model';

export default class SprintResults extends Control {
  public errorList: Control<HTMLElement>;

  public correctList: Control<HTMLElement>;

  public listContainer: Control<HTMLElement>;

  private resultButtonsContainer: Control<HTMLElement>;

  private finishButton: Control<HTMLElement>;

  public errorItem!: Control<HTMLElement>[];

  constructor(
    parentNode: HTMLElement,
    public errorsArr: IWord[],
    public correctArr: IWord[]
  ) {
    super(parentNode, 'div', 'sprint__results text-font');
    this.listContainer = new Control(this.node, 'div', 'list__container');
    this.errorList = new Control(
      this.listContainer.node,
      'ul',
      'list header-font',
      `Слова с ошибками ${errorsArr.length}`
    );
    this.correctList = new Control(
      this.listContainer.node,
      'ul',
      'list header-font',
      `Изученные слова ${correctArr.length}`
    );
    this.renderItems();
    this.resultButtonsContainer = new Control(
      this.node,
      'div',
      'buttons-field'
    );
    this.finishButton = new Control(
      this.resultButtonsContainer.node,
      'button',
      'game-button',
      'Закончить игру'
    );
    this.finishButton.node.onclick = () => {
      window.location.replace('/');
    };
  }

  private renderItems(): void {
    this.errorItem = this.errorsArr.map(
      (word: IWord) =>
        new Control(
          this.errorList.node,
          'li',
          'list__item text-font',
          `${word.word} ${word.transcription} - ${word.wordTranslate}`
        )
    );
    this.errorItem = this.correctArr.map(
      (word: IWord) =>
        new Control(
          this.correctList.node,
          'li',
          'list__item text-font',
          `${word.word} ${word.transcription} - ${word.wordTranslate}`
        )
    );
  }
}
