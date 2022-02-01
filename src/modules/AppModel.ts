type Word = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
};

class AppModel {
  domain = 'https://rslang-words.herokuapp.com';

  async getWords(group: number, page: number) {
    return (
      await this.request(`${this.domain}/words?page=${page}&group=${group}`)
    ).json();
  }

  // eslint-disable-next-line class-methods-use-this
  async request(url: string, options = { method: 'GET' }) {
    // console.log(url);
    const req = await fetch(url, options);
    return req;
  }
}

export default AppModel;
export { Word };
