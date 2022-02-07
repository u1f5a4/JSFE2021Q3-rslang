// eslint-disable-next-line import/no-cycle
import AppView from '../../core/View';
import './HomeStyle.scss';
import renderHeaderTemplate from '../../Components/Header/_renderHeaderTemplate';

class HomeView extends AppView {
  titlePage = 'home';

  drawPage() {
    document.title = this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  // eslint-disable-next-line class-methods-use-this
  getHtml() {
    return `
    <div class="content">
            ${renderHeaderTemplate()}
          <a class="link" href="#book">Книга со словами</a>
          <br>
          <a class="link" href="#auth">Регистрация/Авторизация</a>
          </div>`;
  }
}

export default HomeView;
