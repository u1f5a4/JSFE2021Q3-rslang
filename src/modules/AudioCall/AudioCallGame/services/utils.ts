import IWord from '../../../../models/word-model';
import { INewWordData } from '../types/types';

import AppModel from '../../../AppModel';

const appManager = new AppModel();

function generateRandomNumber(min: number = 0, max: number = 20) {
  return Math.floor(Math.random() * (max - min) + min);
}

export async function getWordsByGroup(groupId: string) {
  const promiseArr: IWord[] = [];
  const maxPageNumber = 29;
  const randomPageNumber = generateRandomNumber(0, maxPageNumber);
  promiseArr.push(...(await appManager.getWords(groupId, randomPageNumber)));

  return promiseArr;
}

function generateRoundData(data: Array<IWord>) {
  const maxNumberWords = 20;
  const maxOptionsNumber = 5;
  const optionsData: IWord[] = [];
  const correctWordId: number = generateRandomNumber(0, maxNumberWords);
  const optionsId: number[] = [];
  optionsId.push(correctWordId);
  const correctWord: IWord = data[correctWordId];
  optionsData.push(correctWord);
  while (optionsData.length < maxOptionsNumber) {
    const idx: number = generateRandomNumber();
    const option: IWord = data[idx];
    if (optionsId.includes(idx)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    optionsData.push(option);
    optionsId.push(idx);
  }
  return {
    optionsData,
    correctWordId,
  };
}

export async function createQuizData(level: string): Promise<Array<IWord[]>> {
  const quizData: Promise<Array<IWord[]>> | [] = [];
  const correctWordIdArray: number[] = [];
  const maxQuizRounds = 10;
  const data: Array<IWord> = await getWordsByGroup(level);
  while (quizData.length < maxQuizRounds) {
    const newRoundData: INewWordData = generateRoundData(data);
    const newRoundOptionsData: Array<IWord> = newRoundData.optionsData;

    if (correctWordIdArray.includes(newRoundData.correctWordId)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    // @ts-ignore
    quizData.push(newRoundOptionsData);
    correctWordIdArray.push(newRoundData.correctWordId);
  }
  return quizData;
}

export const getShuffledArray: (arr: IWord[]) => IWord[] = (arr): IWord[] => {
  if (arr.length === 1) {
    return arr;
  }
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand], ...getShuffledArray(arr.filter((_, i) => i !== rand))];
};
