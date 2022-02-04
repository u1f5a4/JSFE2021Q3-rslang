import AppView from '../../core/View';

class AuthView extends AppView {
  text: string;

  titlePage = 'auth';

  constructor() {
    super();
    this.text = 'Auth View';
  }

  getHtml(): string {
    return `
            <h1>${this.text}</h1>
            <a href="#">home</a>
        `;
  }
}

export default AuthView;
