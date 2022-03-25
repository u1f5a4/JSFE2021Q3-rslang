import Control from '../../../core/BaseElement';
import IWord from '../../../models/word-model';
// eslint-disable-next-line import/no-cycle
import { Question } from '../SprintController';
import SprintButtons from './sprint-buttons';

export default class SprintFieldGame extends Control {
  public word!: Control<HTMLElement>;

  public translation!: Control<HTMLElement>;

  public gameButtons!: SprintButtons;

  public index: number;

  public dataWord: Question;

  public answerArr: string[] = [];

  public markerContainer: Control<HTMLElement>;

  public marker!: Control<HTMLElement>;

  private wordText!: string;

  private translationText!: string;

  public audio!: string;

  constructor(parentNode: HTMLElement, public result: Question[]) {
    super(parentNode, 'div', 'game-field', '');
    this.index = 0;
    const [dataWord] = this.result;
    this.dataWord = dataWord;
    this.markerContainer = new Control(this.node, 'div', 'marker-container');
    this.renderWords();
  }

  public renderWords(): void {
    this.dataWord.answersCorrect.forEach((word: IWord) => {
      this.answerArr.push(word.word);
    });

    if (this.answerArr.includes(this.dataWord.answers.word[this.index].word)) {
      this.wordText = this.dataWord.answers.word[this.index].word;
      this.translationText =
        this.dataWord.answersCorrect[
          this.answerArr.indexOf(this.dataWord.answers.word[this.index].word)
        ].wordTranslate;
      this.audio = this.dataWord.answers.word[this.index].audio;
    } else {
      this.wordText = this.dataWord.answers.word[this.index].word;
      this.translationText = this.dataWord.answers.translate[this.index];
      this.audio = this.dataWord.answers.word[this.index].audio;
    }
    this.word = new Control(
      this.node,
      'span',
      'game-word header-font',
      this.wordText
    );
    this.translation = new Control(
      this.node,
      'span',
      'game-translation header-font',
      this.translationText
    );
    this.gameButtons = new SprintButtons(this.node);
  }
}
