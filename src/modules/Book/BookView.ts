import renderHeaderTemplate from '../../Components/Header/_renderHeaderTemplate';
import AppView from '../../core/View';
import './BookStyle.scss';

class BookView extends AppView {
  titlePage = 'Учебник';

  subtitlePage = `Выбери список слов по уровню сложности, 
  в каждой группе по тридцать страниц, а на каждой странице по двадцать слов`;

  drawPage() {
    document.title = this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  getHtml(): string {
    return `
          ${renderHeaderTemplate()}
            <div class="content">
              <div class="title-content">  
                <h2 class="title-font">${this.titlePage}</h2>
                <p class="text-font">${this.subtitlePage}</p>
              </div>
              <div class="app book-cards">
                <div class="book-cards__card" data-group='1'><p class="book-cards__header header-font">🤐 Группа слов #1</p></div>
                <div class="book-cards__card" data-group='2'><p class="book-cards__header header-font">🙄 Группа слов #2</p></div>
                <div class="book-cards__card" data-group='3'><p class="book-cards__header header-font">🤤 Группа слов #3</p></div>
                <div class="book-cards__card" data-group='4'><p class="book-cards__header header-font">🤓 Группа слов #4</p></div>
                <div class="book-cards__card" data-group='5'><p class="book-cards__header header-font">😎 Группа слов #5</p></div>
                <div class="book-cards__card" data-group='6'><p class="book-cards__header header-font">😭 Группа слов #6</p></div>
                <div class="book-cards__card" data-group='difficult'><p class="book-cards__header header-font">🤡 Сложные слова</p></div>
              </div>
            </div>`;
  }
}

export default BookView;
