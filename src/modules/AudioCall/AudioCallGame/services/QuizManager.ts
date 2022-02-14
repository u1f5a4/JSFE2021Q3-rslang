import { createQuizData, getShuffledArray } from './utils';

export const ResultType = {
  WON: 'WON',
  LOST: 'LOST',
};

export class QuizManager {
  remainingQuestions: number = 10;

  quizHistory: any[] = [];

  quizData: any[] | undefined;

  currentRoundNumber: number = -1;

  level: string = '0';

  currentRoundQuestions: any;

  currentRoundAnswer: any;

  currentRoundOptions: any;

  currentRoundGuess: any;

  currentRoundResult: string = '';

  quizScore: number = 0;

  maxRoundNumber: number = 9;

  isGameFinished: boolean = false;

  setDefaultSettings() {
    this.remainingQuestions = 10;
    this.quizHistory = [];
    this.currentRoundNumber = -1;
    this.quizData = [];
    this.currentRoundResult = '';
    this.quizScore = 0;
    this.maxRoundNumber = 9;
    this.isGameFinished = false;
    this.level = window.location.href.charAt(window.location.href.length - 1);
  }

  async startRound() {
    this.setDefaultSettings();
    this.quizData = await createQuizData(this.level);
    await this.generateRound();
  }

  async generateRound() {
    if (this.currentRoundNumber !== this.maxRoundNumber) {
      this.currentRoundNumber += 1;
      this.currentRoundQuestions = await this.quizData?.[
        this.currentRoundNumber
      ];
      this.currentRoundAnswer = await this.currentRoundQuestions[0];
      this.currentRoundOptions = await getShuffledArray(
        this.currentRoundQuestions
      );
    } else {
      this.isGameFinished = true;
    }
  }

  guessAnswer(answerId: any) {
    this.currentRoundGuess = answerId;
    this.currentRoundResult =
      this.currentRoundGuess === this.currentRoundAnswer?.id
        ? ResultType.WON
        : ResultType.LOST;
    this.quizHistory.push({
      roundOptions: this.currentRoundOptions,
      roundAnswer: this.currentRoundAnswer,
      roundResult: this.currentRoundResult,
      roundNumber: this.currentRoundNumber,
      userGuess: this.currentRoundGuess,
    });
  }

  getQuizResult() {
    const rightAnswers: any[] = [];
    const wrongAnswers: any[] = [];
    const points = this.quizHistory.reduce((acc: number, round) => {
      acc += round.roundResult === ResultType.WON ? 1 : 0;
      if (round.roundResult === ResultType.WON) {
        rightAnswers.push(round.roundAnswer);
      } else {
        wrongAnswers.push(round.roundAnswer);
      }
      return acc;
    }, 0);

    return {
      points,
      rightAnswers,
      wrongAnswers,
    };
  }
}
