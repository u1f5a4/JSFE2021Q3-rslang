import renderHeaderTemplate from '../../../Components/Header/_renderHeaderTemplate';
import AppView from '../../../core/View';
import IWord from '../../../models/word-model';
import './BookCardStyle.scss';

class BookCardView extends AppView {
  group?: string;

  page?: number;

  wordNumber?: number;

  word?: IWord;

  subtitlePage = `Нажимай на карточку и смотри перевод, добавляй
   в свой список слов, удаляй и смотри изображение`;

  async drawCardPage(word: IWord) {
    this.word = word;

    this.body!.innerHTML = this.getHtml();
  }

  getHtml(): string {
    const ZeroCountCompensation = 1;
    return `${renderHeaderTemplate()}
            <div class="content">
              <div class="title-page">  
                <h2 class="title-page__title title-font">Группа слов 
                  #${Number(this.group) + ZeroCountCompensation}</h2>
                <p class="title-page__text text-font">
                  ${this.subtitlePage}
                </p>
              </div>

              <div class="book-card">
                <div class="book-card__body">
                  <button class="book-card__button" id="prev-word">👈</button>
                  <div class="book-card__card">
                    <div class="book-card__content">
                      <div class="book-card__title">
                        <p id="en-word" class="header-font">${
                          this.word?.word
                        }</p>
                      </div>
                      <p></p>
                    </div>
                  </div>
                  <button class="book-card__button" id="next-word">👉</button>
                </div>
                <p id='count-word'>${
                  Number(this.wordNumber) + ZeroCountCompensation
                }/20</p>
              </div>

              <br><br><br><br>
              
              <button id="prev-page">prev page</button>
              <p id="num-page">
              ${Number(this.page) + ZeroCountCompensation}/30
              </p>
              <button id="next-page">next page</button>
            </div>
    `;
  }
}

export default BookCardView;
