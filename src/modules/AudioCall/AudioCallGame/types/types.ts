import IWord from '../../../../models/word-model';

export interface INewWordData {
  correctWordId: number;
  optionsData: IWord[];
}

export interface IQuizHistory {
  roundAnswer: IWord;
  roundNumber: number;
  roundOptions: IWord[];
  roundResult: string;
  userGuess: string;
}
