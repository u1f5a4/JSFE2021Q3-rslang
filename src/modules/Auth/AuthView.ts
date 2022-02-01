import AppView from '../AppView';

class AuthView extends AppView {
  text: string;

  constructor() {
    super();
    this.text = 'auth view';
  }

  drawPage(): void {
    const p = AppView.createElement('p', 'paragraph');
    p.textContent = this.text;

    this.body?.append(p, this.homeLink);
  }
}

export default AuthView;
