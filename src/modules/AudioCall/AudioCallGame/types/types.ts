import IWord from '../../../../models/word-model';

export interface INewWordData {
  correctWordId: number;
  optionsData: Array<IWord>;
}
