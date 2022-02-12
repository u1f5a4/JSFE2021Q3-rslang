import { createQuizData, getWordsByGroup } from './utils';

export default class DataManger {
  private level: string | undefined;
  private words: undefined;
  private rounds: any[] | undefined;

  async getData() {
    this.level = window.location.href.charAt(window.location.href.length - 1);
    const data = await getWordsByGroup(Number(this.level));
    this.words = data;
    console.log(data);
  }
}
