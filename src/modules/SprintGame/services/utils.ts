import IWord from '../../../models/word-model';

export function shuffle(arr: IWord[] | string[]) {
  const array = arr;
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function playAudio(track: string) {
  const player = new Audio();
  player.src = track;
  player.play();
}

export function getSeries(seriesArr: boolean[]) {
  let result = 0;
  const array = seriesArr.map((elem) => (elem === true ? '1' : '0'));
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

export function disable() {
  document.onkeydown = () => false;
}
export function enable() {
  document.onkeydown = () => true;
}
