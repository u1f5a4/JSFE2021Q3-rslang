// eslint-disable-next-line import/no-cycle
import AppView from '../AppView';
import './HomeStyle.scss';
import renderHeaderTemplate from '../../Components/Header/_renderHeaderTemplate';

export default class HomeView extends AppView {
  titlePage = 'HomeView';

  getHtml(): string {
    return `
            ${renderHeaderTemplate()}
            <main>
            
            </main>
            <h1>${this.text}</h1>
            <a class="link" href="#book">Книга со </a>
            <br>
            <a class="link" href="#auth">Регистрация/Авторизация</a>`;
  }
}
