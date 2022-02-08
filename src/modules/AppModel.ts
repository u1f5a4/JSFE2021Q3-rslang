import { domain } from '../core/constants/server-constants';

class AppModel {
  async getWords(group: number, page: number) {
    return (
      await this.request(`${domain}/words?page=${page}&group=${group}`)
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
