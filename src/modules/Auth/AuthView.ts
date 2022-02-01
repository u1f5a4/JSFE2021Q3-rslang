import AppView from '../AppView';

class AuthView extends AppView {
  text: string;

  constructor() {
    super();
    this.text = 'auth view';
  }

  drawPage(): void {
    AppView.clear();

    const p = AppView.createElement('p', 'paragraph');
    p.textContent = this.text;

    const body = document.querySelector('body');

    this.homeButton.textContent = 'На главную';
    body?.appendChild(this.homeButton);

    body?.append(p);
  }
}

export default AuthView;
