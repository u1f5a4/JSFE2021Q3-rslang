import renderHeaderTemplate from '../../../Components/Header/_renderHeaderTemplate';
import AppView from '../../../core/View';
import './BookCardStyle.scss';

class BookCardView extends AppView {
  group?: number;

  word?: string;

  page!: number;

  subtitlePage = `Нажимай на карточку и смотри перевод, добавляй
   в свой список слов, удаляй и смотри изображение`;

  async drawCardPage(group: string, word: string, page: number) {
    this.group = Number(group) + 1;
    this.word = word;
    this.page = page;

    this.body!.innerHTML = this.getHtml();
  }

  getHtml(): string {
    const ZeroCountCompensation = 1;
    return `${renderHeaderTemplate()}
            <div class="content">
              <div class="title-page">  
                <h2 class="title-page__title title-font">Группа слов 
                  #${this.group}</h2>
                <p class="title-page__text text-font">
                  ${this.subtitlePage}
                </p>
              </div>

              <div class="book-card">
                <div class="book-card__body">
                  <button class="book-card__button" id="prev-word">👈</button>
                  <div class="book-card__card card">
                    <p id="en-word">${this.word}</p>
                  </div>
                  <button class="book-card__button" id="next-word">👉</button>
                </div>
                <p id='count-word'>1/20</p>
              </div>

              <br><br><br><br>
              
              <button id="prev-page">prev page</button>
              <p id="num-page">
              ${this.page + ZeroCountCompensation}/30
              </p>
              <button id="next-page">next page</button>
            </div>
    `;
  }
}

export default BookCardView;
