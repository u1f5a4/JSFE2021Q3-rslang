class AppView {
  authButton?: HTMLElement;

  bookButton?: HTMLElement;

  homeLink: HTMLLinkElement;

  body = document.querySelector('body');

  constructor() {
    this.homeLink = AppView.createElement('a', 'link') as HTMLLinkElement;
    this.homeLink.textContent = 'На главную';
    this.homeLink.href = '#';
  }

  // eslint-disable-next-line class-methods-use-this
  drawPage() {
    const bookLink = AppView.createElement('a', 'link') as HTMLLinkElement;
    bookLink.textContent = 'Книга со словами';
    bookLink.href = '#book';

    const authLink = AppView.createElement('a', 'link') as HTMLLinkElement;
    authLink.textContent = 'Регистрация/Авторизация';
    authLink.href = '#auth';

    this.body?.append(bookLink, document.createElement('br'), authLink);
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
