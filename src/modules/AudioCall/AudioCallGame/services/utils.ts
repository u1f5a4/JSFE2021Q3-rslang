import IWord from '../../../../models/word-model';
import { INewWordData } from '../types/types';

import AppModel from '../../../AppModel';

const appManager = new AppModel();

export function generateRandomNumber(min: number = 0, max: number = 20) {
  return Math.floor(Math.random() * (max - min) + min);
}

const getShuffledArray: (arr: IWord[]) => IWord[] = (arr): IWord[] => {
  if (arr.length === 1) {
    return arr;
  }
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand], ...getShuffledArray(arr.filter((_, i) => i !== rand))];
};

async function getWordsByGroup(groupId: string, page: string) {
  let getWords;

  if (page === 'random') {
    const maxPageNumber = 29;
    const randomPageNumber = generateRandomNumber(0, maxPageNumber);
    getWords = await appManager.getWords(groupId, randomPageNumber);
  } else if (appManager.isUser()) {
    getWords = await appManager.getTwentyUserWordsWithoutEasy(
      groupId,
      Number(page)
    );
    // eslint-disable-next-line no-underscore-dangle
    getWords = getWords.map((elem) => ({ id: elem._id, ...elem }));
  } else {
    getWords = await appManager.getWords(groupId, Number(page));
  }

  return getWords;
}

function generateRoundData(data: IWord[]) {
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

async function createQuizData(group: string, page: string): Promise<IWord[][]> {
  const quizData: IWord[][] = [];
  const correctWordIdArray: number[] = [];
  const maxQuizRounds = 10;
  const data: IWord[] = await getWordsByGroup(group, page);
  while (quizData.length < maxQuizRounds) {
    const newRoundData: INewWordData | never = generateRoundData(data);
    const newRoundOptionsData: IWord[] = newRoundData.optionsData;

    if (correctWordIdArray.includes(newRoundData.correctWordId)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    quizData.push(newRoundOptionsData);
    correctWordIdArray.push(newRoundData.correctWordId);
  }

  return quizData;
}

export { createQuizData, getShuffledArray, getWordsByGroup };
