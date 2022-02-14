import renderFooterTemplate from '../../components/Footer/_renderFooterTemplate';
import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import AppView from '../../core/View';
import css from './AuthStyle.module.scss';

class AuthView extends AppView {
  titlePage: string;

  constructor() {
    super();
    this.titlePage = 'Добро пожаловать';
  }

  getHtml(): string {
    return `
    <div class="">
            ${renderHeaderTemplate()}
            <div class="${css.content} ${css.wrapper}">
              <h2>${this.titlePage}</h2>
              <input id="name" type="text" placeholder="name">
              <input id="email" type="text" placeholder="email">
              <input id="password" type="text" placeholder="password">
              <button id="button-registration">Регистрация</button> <button id="button-signIn">Вход</button>
            </div>
            ${renderFooterTemplate()}
    </div>
        `;
  }
}

export default AuthView;
