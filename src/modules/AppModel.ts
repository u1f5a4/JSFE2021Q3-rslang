import renderHeaderTemplate from '../Components/Header/renderHeaderTemplate';
import { domain, STATE } from '../core/constants/server-constants';
import AppView from '../core/View';
// eslint-disable-next-line import/no-cycle
import AuthController from './Auth/AuthController';
import AuthModel from './Auth/AuthModel';
import AuthView from './Auth/AuthView';

class AppModel {
  domain!: string;

  async getWords(group: number, page: number) {
    return (
      await this.request(`${domain}/words?page=${page}&group=${group}`)
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

  // eslint-disable-next-line class-methods-use-this
  public logout(): void {
    const logoutBtn = document.getElementById(
      'logout-btn'
    ) as HTMLButtonElement;
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        localStorage.clear();
        STATE.auth = JSON.parse(localStorage.getItem('user')!);
        STATE.userName = JSON.parse(localStorage.getItem('user')!);
        AppView.clear();
        const auth = new AuthController(new AuthView(), new AuthModel());
        auth.displayPage();
        renderHeaderTemplate();
      };
    }
  }
}

export default AppModel;
