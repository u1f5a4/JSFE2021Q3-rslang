import DataManger from './DataManager';
import { createQuizData, getShuffledArray } from './utils';

export const ResultType = {
  WON: 'WON',
  LOST: 'LOST',
};


export class QuizManager {
  private _dataManager: DataManger;
  private remainingQuestions: number;
  private _quizHistory: any[];
  private _currentRound: any;
  private _quizData: any[] | undefined;
  private _currentRoundNumber: number;
  private _level: number;
  private _currentRoundQuestions: any;
  private _currentRoundAnswer: any;
  private _currentRoundOptions: any;
  private _currentRoundGuess: any;
  private _currentRoundResult: string;
  private _quizScore: number;
  private _maxRoundNumber: number;

  constructor() {
    this._dataManager = new DataManger();
    this.remainingQuestions = 10;
    this._quizHistory = [];
    this._level = Number(
      window.location.href.charAt(window.location.href.length - 1)
    );
    this._currentRoundNumber = 0;
    this._currentRound = null;
    this._quizData = [];
    this._currentRoundResult = '';
    this._quizScore = 0;
    this._maxRoundNumber = 10;
  }

  async startRound() {
    this._quizData = await createQuizData(this._level);
    await this.generateRound();
  }

  async generateRound() {
    this._currentRoundNumber++;
    this._currentRoundQuestions = this._quizData?.[this._currentRoundNumber];
    this._currentRoundAnswer = this._currentRoundQuestions[0];
    this._currentRoundOptions = getShuffledArray(this._currentRoundQuestions);
    // console.log('ROUND OPTIONS BEFORE ',this._currentRoundQuestions);
    // console.log('ROUND OPTIONS AFTER SHUFFLE',this._currentRoundOptions);
    // console.log('CORRECT ANSWER', this._currentRoundAnswer);
    this.guessAnswer(this._currentRoundOptions[1]);
  }

  guessAnswer(answer: any) {
    this._currentRoundGuess = answer;
    this._currentRoundResult =
    this._currentRoundGuess === this._currentRoundAnswer
        ? ResultType.WON
        : ResultType.LOST;
    console.log(this._currentRoundResult);
    this._quizHistory.push({
      "roundOptions": this._currentRoundOptions,
      "roundAnswer": this._currentRoundAnswer,
      "roundResult": this._currentRoundResult,
      "roundNumber": this._currentRoundNumber,
      "userGuess": this._currentRoundGuess,
    })
    console.log(this._quizHistory);
    if (this._currentRoundNumber === this._maxRoundNumber) {
      this.endRound()
    }
  }

  endRound () {
    console.log("GAME HAS BEEN FINISHED");
  }
}
