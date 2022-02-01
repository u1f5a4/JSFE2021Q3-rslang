import AppView from '../AppView';

class BookView extends AppView {
  text: string;

  constructor() {
    super();
    this.text = 'book view';
  }

  drawPage(): void {
    AppView.clear();

    this.homeButton = AppView.createElement('button', 'button');
    this.homeButton.textContent = 'На главную';

    const p = AppView.createElement('p', 'paragraph');
    p.textContent = this.text;

    const body = document.querySelector('body');
    body?.append(this.homeButton, p);
  }
}

export default BookView;
