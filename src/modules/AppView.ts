class AppView {
  body = document.querySelector('body');

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

  static clear() {
    const body = document.querySelector('body');
    while (body?.firstChild) {
      body.removeChild(body.firstChild);
    }
  }

  static createElement(tag: string, className: string): HTMLElement {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    return elem;
  }
}

export default AppView;
