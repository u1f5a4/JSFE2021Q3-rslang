import AppView from '../AppView';

class BookView extends AppView {
  text: string;

  constructor() {
    super();
    this.text = 'book view';
  }

  drawPage() {
    const p = AppView.createElement('p', 'paragraph');
    p.textContent = this.text;

    this.body?.append(p, this.homeLink);
  }
}

export default BookView;
