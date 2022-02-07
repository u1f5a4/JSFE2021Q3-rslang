class AppModel {
  private domain = 'https://rslang-words.herokuapp.com';

  async getWords(group: number, page: number) {
    return (
      await this.request(`${this.domain}/words?page=${page}&group=${group}`)
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
}

export default AppModel;
