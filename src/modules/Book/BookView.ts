import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import AppView from '../../core/View';
import './BookStyle.module.scss';

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
              <div class="title-page">  
                <h2 class="title-page__title title-font">${this.titlePage}</h2>
                <p class="title-page__text text-font">${this.subtitlePage}</p>
              </div>
              <div class="app book-cards">
                <div class="book-cards__card shadow-active" data-group='1'>
                  <p class="book-cards__emoji">🤐</p>
                  <p class="book-cards__header header-font">Группа слов #1</p>
                </div>
                <div class="book-cards__card shadow-active" data-group='2'>
                  <p class="book-cards__emoji">🙄</p>
                  <p class="book-cards__header header-font">Группа слов #2</p>
                </div>
                <div class="book-cards__card shadow-active" data-group='3'>
                  <p class="book-cards__emoji">🤤</p>
                  <p class="book-cards__header header-font">Группа слов #3</p>
                </div>
                <div class="book-cards__card shadow-active" data-group='4'>
                  <p class="book-cards__emoji">🤓</p>
                  <p class="book-cards__header header-font">Группа слов #4</p>
                </div>
                <div class="book-cards__card shadow-active" data-group='5'>
                  <p class="book-cards__emoji">😎</p>
                  <p class="book-cards__header header-font">Группа слов #5</p>
                </div>
                <div class="book-cards__card shadow-active" data-group='6'>
                  <p class="book-cards__emoji">😭</p>
                  <p class="book-cards__header header-font">Группа слов #6</p>
                </div>
                <div class="book-cards__card shadow-active" data-group='difficult'>
                  <p class="book-cards__emoji">🤡</p>
                  <p class="book-cards__header header-font">Сложные слова</p>
                </div>
              </div>
            </div>`;
  }
}

export default BookView;
