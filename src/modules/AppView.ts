class AppView {
  authButton?: HTMLElement;

  bookButton?: HTMLElement;

  homeButton!: HTMLElement;

  constructor() {
    this.homeButton = AppView.createElement('button', 'button');
  }

  drawPage() {
    AppView.clear();

    this.authButton = AppView.createElement('button', 'button');
    this.authButton.textContent = 'Регистрация/Авторизация';

    this.bookButton = AppView.createElement('button', 'button');
    this.bookButton.textContent = 'Книга со словами';

    const body = document.querySelector('body');
    body?.append(this.authButton, this.bookButton);
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
