import AppModel from '../../../AppModel';

const appManager = new AppModel();

function generateRandomNumber(min: number = 0, max: number = 20) {
  return Math.floor(Math.random() * (max - min) + min);
}

export async function getWordsByGroup(groupId: number) {
  const promiseArr: any[] = [];
  const maxPageNumber = 29;
  const randomPageNumber = generateRandomNumber(0, maxPageNumber);
  promiseArr.push(...(await appManager.getWords(groupId, randomPageNumber)));

  const data: any = promiseArr;

  return await data;
}

function generateRoundData(data: []) {
  const maxNumberWords = 20;
  const maxOptionsNumber = 5;
  const optionsData: [] = [];
  const correctWordId: number = generateRandomNumber(0, maxNumberWords);
  const optionsId: number[] = [];
  optionsId.push(correctWordId);
  const correctWord = data[correctWordId];
  optionsData.push(correctWord);
  while (optionsData.length < maxOptionsNumber) {
    const idx = generateRandomNumber();
    const option = data[idx];
    if (optionsId.includes(idx)) {
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

export async function createQuizData(level: number) {
  const quizData = [];
  const correctWordIdArray: number[] = [];
  const maxQuizRounds = 10;
  const data = await getWordsByGroup(level);
  while (quizData.length < maxQuizRounds) {
    const newRoundData = generateRoundData(data);
    const newRoundOptionsData = newRoundData.optionsData;

    if (correctWordIdArray.includes(newRoundData.correctWordId)) {
      continue;
    }
    quizData.push(newRoundOptionsData);
    correctWordIdArray.push(newRoundData.correctWordId);
  }
  return quizData;
}

export const getShuffledArray: (arr: any[]) => any = (arr) => {
  if (arr.length === 1) {
    return arr;
  }
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand], ...getShuffledArray(arr.filter((_, i) => i !== rand))];
};
