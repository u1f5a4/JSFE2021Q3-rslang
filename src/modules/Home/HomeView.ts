// eslint-disable-next-line import/no-cycle
import AppView from '../../core/View';
import './HomeStyle.scss';
import renderHeaderTemplate from '../../Components/Header/_renderHeaderTemplate';

class HomeView extends AppView {
  titlePage = 'home';

  text = 'App View';

  drawPage() {
    document.title = this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  getHtml() {
    return `
            ${renderHeaderTemplate()}
        <h1>${this.text}</h1>
          <a class="link" href="#book">Книга со словами</a>
          <br>
          <a class="link" href="#auth">Регистрация/Авторизация</a>`;
  }
}

export default HomeView;
