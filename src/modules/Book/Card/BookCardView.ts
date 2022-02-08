import renderHeaderTemplate from '../../../components/Header/_renderHeaderTemplate';
import AppView from '../../../core/View';
import IWord from '../../../models/word-model';
import './BookCardStyle.module.scss';

class BookCardView extends AppView {
  group?: string;

  page?: number;

  wordNumber?: number;

  word?: IWord;

  subtitlePage = `Нажимай на карточку и смотри перевод, добавляй
   в свой список слов, удаляй и смотри изображение`;

  domain?: string;

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

                  <button class="book-card__button button shadow-active" id="prev-word">👈</button>

                  <div class="book-card__container">
                    <div class="book-card__card"  id="flip">
    
                      <div class="book-card__front book-card__content">
                          <div class="book-card__title">
                            <p class="header-font book-card__text">
                            ${this.word?.word} – ${this.word?.transcription}
                            </p>
                            <button class='button book-card__button-audio'>🔊</button>
                          </div>
                            <p class="text-font book-card__text">
                              ${this.word?.textMeaning}
                            </p>
                            <p class="body-font book-card__text">
                              ${this.word?.textExample}
                            </p>
                      </div>
    
                      <div class="book-card__back book-card__content-back">
                        <div class="book-card__body-back">
                          <p class="header-font book-card__text">
                            ${this.word?.wordTranslate}
                          </p>
                          <p class="text-font book-card__text">
                            ${this.word?.textMeaningTranslate}
                          </p>
                          <p class="body-font book-card__text">
                            ${this.word?.textExampleTranslate}
                          </p>
                        </div>
                        <img class="book-card__img" 
                        src="${this.domain}/${this.word?.image}" 
                        alt="${this.word?.id}">
                      </div>
    
                    </div>
                  </div>

                  <button class="book-card__button button shadow-active" id="next-word">👉</button>

                </div>

                <p id='count-word'>${
                  Number(this.wordNumber) + ZeroCountCompensation
                }/20</p>
              </div>




              <div class="page-pagination">
                <button class="element-font page-pagination__button button shadow-active" id="prev-page"><</button>

                <button class="element-font page-pagination__button button">
                  ${Number(this.page) + ZeroCountCompensation} / 30
                </button>

                <button class="element-font page-pagination__button button shadow-active" id="next-page">></button>
              </div>
            </div>
    `;
  }
}

export default BookCardView;
