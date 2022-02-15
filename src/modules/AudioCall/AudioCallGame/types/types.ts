import IWord from '../../../../models/word-model';

export interface INewWordData {
  correctWordId: number;
  optionsData: Array<IWord>;
}

export interface IQuizHistory {
  roundAnswer: IWord;
  roundNumber: number;
  roundOptions: Array<IWord>;
  roundResult: string;
  userGuess: string;
}
