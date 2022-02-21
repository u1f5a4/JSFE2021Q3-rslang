import { createQuizData, getShuffledArray } from './utils';
import IWord from '../../../../models/word-model';
import { IQuizHistory } from '../types/types';
import AppModel from '../../../AppModel';

export const ResultType = {
  WON: 'WON',
  LOST: 'LOST',
};

export class QuizManager {
  remainingQuestions: number = 10;

  quizHistory: IQuizHistory[] = [];

  quizData!: IWord[][];

  currentRoundNumber: number = -1;

  group: string = '0';

  page: string = 'random';

  currentRoundQuestions?: IWord[];

  currentRoundAnswer!: IWord;

  currentRoundOptions!: IWord[];

  currentRoundGuess!: string;

  currentRoundResult: string = '';

  quizScore: number = 0;

  maxRoundNumber: number = 9;

  isGameFinished: boolean = false;

  model = new AppModel();

  setDefaultSettings(group: string, page: string) {
    this.remainingQuestions = 10;
    this.quizHistory = [];
    this.currentRoundNumber = -1;
    this.quizData = [];
    this.currentRoundResult = '';
    this.quizScore = 0;
    this.maxRoundNumber = 9;
    this.isGameFinished = false;
    this.group =
      group || window.location.href.charAt(window.location.href.length - 1);
    this.page = page;
  }

  async startRound(group: string, page: string) {
    this.setDefaultSettings(group, page);
    this.quizData = await createQuizData(this.group, this.page);
    await this.generateRound();
  }

  async generateRound() {
    if (this.currentRoundNumber !== this.maxRoundNumber) {
      this.currentRoundNumber += 1;
      this.currentRoundQuestions = this.quizData?.[this.currentRoundNumber];
      // eslint-disable-next-line prefer-destructuring
      this.currentRoundAnswer = this.currentRoundQuestions[0];
      this.currentRoundOptions = getShuffledArray(this.currentRoundQuestions);
    } else {
      this.isGameFinished = true;
    }
  }

  async guessAnswer(wordId: string) {
    const correctAudio = document.getElementById(
      'correct-audio'
    ) as HTMLAudioElement;
    const errorAudio = document.getElementById(
      'error-audio'
    ) as HTMLAudioElement;

    this.currentRoundGuess = wordId;
    const wordIdRightWord = this.currentRoundAnswer?.id;
    if (this.currentRoundGuess === wordIdRightWord) {
      correctAudio.play();

      if (this.model.isUser()) {
        const word = await this.model.getWord(wordIdRightWord);
        this.model.rightWord(word);
      }
      this.currentRoundResult = ResultType.WON;
    } else {
      errorAudio.play();
      if (this.model.isUser()) {
        const word = await this.model.getWord(String(wordIdRightWord));
        this.model.wrongWord(word);
      }
      this.currentRoundResult = ResultType.LOST;
    }

    this.quizHistory.push({
      roundOptions: this.currentRoundOptions,
      roundAnswer: this.currentRoundAnswer,
      roundResult: this.currentRoundResult,
      roundNumber: this.currentRoundNumber,
      userGuess: this.currentRoundGuess,
    });
  }

  getQuizResult() {
    if (this.model.isUser()) this.saveStat(this.quizHistory);

    const rightAnswers: IWord[] = [];
    const wrongAnswers: IWord[] = [];
    const points = this.quizHistory.reduce((acc: number, round) => {
      // eslint-disable-next-line no-param-reassign
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

  saveStat(history: IQuizHistory[]) {
    const words = history.map((elem) => String(elem.roundAnswer.id));
    const right = history.filter((elem) => elem.roundResult === 'WON').length;
    const wrong = history.filter((elem) => elem.roundResult === 'LOST').length;
    const series = this.getSeries(history);

    const data = { words, right, wrong, series };
    this.model.updateGameStat('audioGame', data);
  }

  getSeries(data: IQuizHistory[]) {
    let result = 0;
    const array = data.map((elem) => (elem.roundResult === 'WON' ? '1' : '0'));
    let index = 0;
    const tall = array.length - 1;
    let tempCount = 0;
    while (index <= tall) {
      if (array[index] === '1') tempCount += 1;
      else {
        result = result < tempCount ? tempCount : result;
        tempCount = 0;
      }

      if (index === tall) result = result < tempCount ? tempCount : result;

      index += 1;
    }

    return result;
  }
}
