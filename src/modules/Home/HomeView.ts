// eslint-disable-next-line import/no-cycle
import AppView from '../../core/View';
import './HomeStyle.scss';
import renderHeaderTemplate from '../../Components/Header/_renderHeaderTemplate';

export default class HomeView extends AppView {
  titlePage = 'HomeView';

  getHtml(): string {
    return `

            <main>
            
            </main>
            <h1></h1>
            <a class="link" href="#book">Книга со </a>
            <br>
            <a class="link" href="#auth">Регистрация/Авторизация</a>`;
  }
}
