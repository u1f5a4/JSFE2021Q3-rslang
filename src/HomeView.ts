import AppView from './core/AppView';

class HomeView extends AppView {
  titlePage = 'home';

  text = 'App View';

  drawPage() {
    document.title = this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  getHtml() {
    return `<h1>${this.text}</h1>
          <a class="link" href="#book">Книга со словами</a>
          <br>
          <a class="link" href="#auth">Регистрация/Авторизация</a>`;
  }
}

export default HomeView;
