import Control from '../../core/BaseElement';
import {
  COUNT_RIGHT_ANSWERS,
  delayBorderHighlight,
  MAX_COUNT_WORD_PER_PAGE,
  START_POINTS,
} from '../../core/constants/server-constants';
import delay from '../../core/delay';
import AppView from '../../core/View';
import IWord from '../../models/word-model';
import AppModel from '../AppModel';
import SprintResults from './components/results';
// eslint-disable-next-line import/no-cycle
import SprintFieldGame from './components/sprint-field-game';
// eslint-disable-next-line import/no-cycle
import SprintGame from './components/sprint-game';
import shuffle from './services/utils';
import SprintView from './SprintView';

export type Question = {
  answersCorrect: IWord[];
  answers: {
    word: string[];
    translate: string[];
  };
};

export default class SprintController {
  data!: IWord[];

  game!: SprintGame;

  checkedInputValue!: string;

  pageIndex: number = 0;

  correctAnswersArr: IWord[] = [];

  errorAnswersArr: IWord[] = [];

  rightWords: boolean[] = [];

  scoreValue: number = 0;

  scorePoints: number = 10;

  correctWord: IWord | undefined;

  errorWord: IWord | undefined;

  result!: SprintResults;

  constructor(public view: SprintView, public model: AppModel) {}

  private bindButtons(): void {
    const form = document.getElementById('audio-call-form') as HTMLFormElement;
    const firstInput = document.getElementById('level-1') as HTMLInputElement;
    firstInput.checked = true;
    form.addEventListener('submit', async (event) => {
      const checkedInput = document.querySelector(
        'input[name=audio-game]:checked'
      ) as HTMLInputElement;
      this.checkedInputValue = checkedInput.value;
      AppView.clear();
      window.location.href = `/#sprint-game/${this.checkedInputValue}`;
      this.data = await this.model.getWords(
        this.checkedInputValue,
        this.pageIndex
      );
      this.game = new SprintGame(this.scoreValue, this.getWordsPerPage());
      this.game.drawPage();
      this.checkAnswers();
      this.stopGame();
      event.preventDefault();
    });
  }

  private getWordsPerPage(): Question[] {
    const answers: Array<string> = [];
    const translate: Array<string> = [];
    const result: Array<Question> = [];
    const set = new Set<IWord>();
    for (let i = 0; i < 10; i += 1) {
      const correctAnswerIndex = Math.floor(
        Math.random() * MAX_COUNT_WORD_PER_PAGE
      );
      set.add(this.data[correctAnswerIndex]);
    }
    this.data.forEach((word) => {
      answers.push(word.word);
      translate.push(word.wordTranslate);
      shuffle(answers);
      shuffle(translate);
    });
    const question: Question = {
      answersCorrect: [...set],
      answers: {
        word: answers,
        translate,
      },
    };
    result.push(question);
    return result;
  }

  private buttonsHandler(): void {
    this.game.gameField.index += 1;
    this.game.gameField.word.destroy();
    this.game.gameField.translation.destroy();
    this.game.gameField.gameButtons.destroy();
    this.game.gameField.renderWords();
    this.checkAnswers();
    this.keyHandler();
    this.swithOnNextPage();
  }

  private async swithOnNextPage(): Promise<void> {
    if (this.game.gameField.index === MAX_COUNT_WORD_PER_PAGE) {
      this.data = await this.model.getWords(
        this.checkedInputValue,
        this.pageIndex + 1
      );
      this.game.gameField.destroy();
      this.game.gameField = new SprintFieldGame(
        this.game.sprintContainer.node,
        this.getWordsPerPage()
      );
      this.buttonsHandler();
    }
  }

  private checkAnswers(): void {
    this.game.gameField.gameButtons.onClickNextWordTrue = async () => {
      await this.onClicTrueButton();
    };
    this.game.gameField.gameButtons.onClickNextWordFalse = async () => {
      await this.onClickFalseButton();
    };
  }

  private async onClicTrueButton(): Promise<void> {
    if (
      this.game.gameField.answerArr.includes(
        this.game.gameField.dataWord.answers.word[this.game.gameField.index]
      )
    ) {
      this.getRightAnswer();
    } else {
      await this.getWrongAnswer();
    }
    this.buttonsHandler();
  }

  private async onClickFalseButton(): Promise<void> {
    if (
      !this.game.gameField.answerArr.includes(
        this.game.gameField.dataWord.answers.word[this.game.gameField.index]
      )
    ) {
      this.getRightAnswer();
    } else {
      await this.getWrongAnswer();
    }
    this.buttonsHandler();
  }

  private getRightAnswer(): void {
    this.correctWord = this.data.find(
      (item) =>
        item.word ===
        this.game.gameField.dataWord.answers.word[this.game.gameField.index]
    );
    this.correctAnswersArr.push(this.correctWord!);
    this.renderPoints();
    this.rightWords.push(true);
    this.scoreValue += this.scorePoints;
    this.game.score.destroy();
    this.game.score = new Control(
      this.game.sprintContainer.node,
      'span',
      'score header-font',
      `${this.scoreValue}`
    );
  }

  private async getWrongAnswer(): Promise<void> {
    this.errorWord = this.data.find(
      (item) =>
        item.word ===
        this.game.gameField.dataWord.answers.word[this.game.gameField.index]
    );
    this.errorAnswersArr.push(this.errorWord!);
    this.game.gameField.markerContainer.destroy();
    this.game.gameField.markerContainer = new Control(
      this.game.gameField.node,
      'div',
      'marker-container'
    );
    this.rightWords = [];
    this.scorePoints = START_POINTS;
    this.game.gameField.node.classList.add('animate');
    await delay(delayBorderHighlight);
    this.game.gameField.node.classList.remove('animate');
  }

  private renderPoints(): void {
    if (this.rightWords.length < COUNT_RIGHT_ANSWERS) {
      // this.scorePoints;
      this.game.gameField.marker = new Control(
        this.game.gameField.markerContainer.node,
        'span',
        'marker',
        ''
      );
      return;
    }
    if (this.rightWords.length >= COUNT_RIGHT_ANSWERS) {
      this.scorePoints += START_POINTS;
      this.game.gameField.markerContainer.destroy();
      this.game.gameField.markerContainer = new Control(
        this.game.gameField.node,
        'div',
        'marker-container'
      );
      this.game.gameField.marker = new Control(
        this.game.gameField.markerContainer.node,
        'span',
        'marker',
        ''
      );
      this.rightWords = [];
    }
  }

  private stopGame(): void {
    this.game.timer.onTimeOut = () => {
      this.game.sprintContainer.destroy();
      this.result = new SprintResults(
        this.game.node,
        this.errorAnswersArr,
        this.correctAnswersArr
      );
    };
  }

  private keyHandler() {
    document.onkeydown = (e) => {
      if (e.keyCode === 37) {
        this.onClickFalseButton();
      }
      if (e.keyCode === 39) {
        this.onClicTrueButton();
      }
    };
  }

  public displayPage(): void {
    this.view.drawPage();
    this.bindButtons();
  }
}
