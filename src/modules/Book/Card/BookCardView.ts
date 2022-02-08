import renderFooterTemplate from '../../../components/Footer/_renderFooterTemplate';
import renderHeaderTemplate from '../../../components/Header/_renderHeaderTemplate';
import AppView from '../../../core/View';
import IWord from '../../../models/word-model';
import css from './BookCardStyle.module.scss';

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
            <div class="${css.content}">
              <div class="${css['title-page']}">  
                <h2 class="
                ${css['title-page__title']} ${css['title-font']}
                ">Группа слов 
                  #${Number(this.group) + ZeroCountCompensation}</h2>
                <p class="${css['title-page__text']} ${css['text-font']}">
                  ${this.subtitlePage}
                </p>
              </div>

              <div class="${css['book-card']}">
                <div class="${css['book-card__body']}">

                  <button class="${css['book-card__button']} 
                                 ${css.button} 
                                 ${css['shadow-active']}
                                " id="prev-word">👈</button>

                  <div class="${css['book-card__container']}">
                    <div class="${css['book-card__card']}" id="flip">
    
                      <div class="${css['book-card__front']} 
                                  ${css['book-card__content']}">
                          <div class="${css['book-card__title']}">
                            <p class="${css['header-font']} 
                                      ${css['book-card__text']}">
                            ${this.word?.word} – ${this.word?.transcription}
                            </p>
                            <button class='${css.button} 
                                            ${css['book-card__button-audio']}
                                            ' id="play-audio-card">🔊</button>
                          </div>
                            <p class="${css['text-font']} 
                                      ${css['book-card__text']} ">
                              ${this.word?.textMeaning}
                            </p>
                            <p class="${css['body-font']}
                                      ${css['book-card__text']}">
                              ${this.word?.textExample}
                            </p>
                      </div>
    
                      <div class="${css['book-card__back']} 
                                  ${css['book-card__content-back']}">
                        <div class="${css['book-card__body-back']}">
                          <p class="${css['header-font']} 
                                    ${css['book-card__text']}">
                            ${this.word?.wordTranslate}
                          </p>
                          <p class="${css['text-font']} 
                                    ${css['book-card__text']}">
                            ${this.word?.textMeaningTranslate}
                          </p>
                          <p class="${css['body-font']} 
                                    ${css['book-card__text']} ">
                            ${this.word?.textExampleTranslate}
                          </p>
                        </div>
                        <img class="${css['book-card__img']}" 
                        src="${this.domain}/${this.word?.image}" 
                        alt="${this.word?.id}">
                      </div>
    
                    </div>
                  </div>

                  <button class="${css['book-card__button']} 
                                 ${css.button}
                                 ${css['shadow-active']}
                                  " id="next-word">👉</button>

                </div>

                <p id='count-word'>${
                  Number(this.wordNumber) + ZeroCountCompensation
                }/20</p>
              </div>



              <div class="${css['page-pagination']}">
                <button class="${css['element-font']}
                               ${css['page-pagination__button']}
                               ${css.button}
                               ${css['shadow-active']}
                               " id="prev-page"><</button>

                <button class="${css['element-font']}
                               ${css['page-pagination__button']}
                               ${css.button}">
                  ${Number(this.page) + ZeroCountCompensation} / 30
                </button>

                <button class="${css['element-font']}
                                ${css['page-pagination__button']}
                                ${css.button}
                                ${css['shadow-active']}
                                " id="next-page">></button>
              </div>
            </div>
            ${renderFooterTemplate()}
    `;
  }
}

export default BookCardView;
