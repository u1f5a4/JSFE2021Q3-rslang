import AppView from '../../core/View';
import './BookStyle.scss';

class BookView extends AppView {
  titlePage = 'Book View';

  drawPage() {
    document.title = this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  getHtml(): string {
    return `<h1>${this.titlePage}</h1>
            <div class="app">
              <div data-group='1'><p>Группа слов #1</p></div>
              <div data-group='2'><p>Группа слов #2</p></div>
              <div data-group='3'><p>Группа слов #3</p></div>
              <div data-group='4'><p>Группа слов #4</p></div>
              <div data-group='5'><p>Группа слов #5</p></div>
              <div data-group='6'><p>Группа слов #6</p></div>
              <div data-group='difficult'><p>Сложные слова</p></div>
            </div>`;
  }
}

export default BookView;
