const emojiList = [
  ['1', '🤐'],
  ['2', '🙄'],
  ['3', '🤤'],
  ['4', '🤓'],
  ['5', '😎'],
  ['6', '😭'],
  ['difficult', '🤡'],
];

class AppModel {
  private domain = 'https://rslang-words.herokuapp.com';

  async getWords(group: number, page: number) {
    return (
      await this.request(`${this.domain}/words?group=${group}&page=${page}`)
    ).json();
  }

  getDomain(): string {
    return this.domain;
  }

  // eslint-disable-next-line class-methods-use-this
  async request(url: string, options = { method: 'GET' }) {
    // console.log(url);
    const req = await fetch(url, options);
    return req;
  }

  getSetting(key: string) {
    const setting = this.downloadSetting();
    if (setting) return setting[key];
    return null;
  }

  addSetting(data: {}) {
    const setting = this.downloadSetting();
    if (setting) this.saveSetting(Object.assign(setting, data));
    else this.saveSetting(data);
  }

  // eslint-disable-next-line class-methods-use-this
  private downloadSetting() {
    const setting = localStorage.getItem('rslang-localStorage');
    return JSON.parse(String(setting));
  }

  // eslint-disable-next-line class-methods-use-this
  private saveSetting(setting: {}) {
    localStorage.setItem('rslang-localStorage', JSON.stringify(setting));
  }
}

export default AppModel;
export { emojiList };
