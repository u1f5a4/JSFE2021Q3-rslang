import renderFooterTemplate from '../../../components/Footer/_renderFooterTemplate';
import renderHeaderTemplate from '../../../components/Header/_renderHeaderTemplate';
import renderPageDescTemplate from '../../../components/PageDesc/_renderPageDescTemplate';
import AppView from '../../../core/View';
import IWord from '../../../models/word-model';
import { emojiList } from '../../AppModel';
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
          <div class="${css.content} ${css['book-card__page']}">

            ${renderPageDescTemplate(
              `${emojiList[Number(this.group)][1]} Группа слов # ${
                Number(this.group) + ZeroCountCompensation
              }`,
              this.subtitlePage
            )}

            <div class="">
              <div class="${css['book-card']}">
              <div class="${css.card}">
                <div class="${css['book-card__body']}">
                  
                    <button class="${css['book-card__button']}  
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
                              <button class='${css['book-card__button']}
                                              ${css['book-card__button-audio']}
                                              ${css['shadow-active']}
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
                            <div class="${css['book-card__buttons-word']}">
                              <button id="complicate-word" class="${css.btn} 
                              ${css['book-card__button-complicate-word']}">
                                  СЛОЖНА
                              </button>
                              <button id="easy-word" class="${css.btn}
                              ${css['book-card__button-easy-word']}">
                                  ИЗИ
                              </button>
                            </div>
                            
                          </div>
                          <img class="${css['book-card__img']}" 
                          src="${this.domain}/${this.word?.image}" 
                          alt="${this.word?.id}">
                        </div>
      
                      </div>
                    </div>

                    <button class="${css['book-card__button']} 
                                  ${css['shadow-active']}
                                    " id="next-word">👉</button>
                  </div>

                  <div class="${css['list-dot']}">
                    ${(() => {
                      let result = '';
                      // TODO: список сложных слов может быть больше 20ти
                      for (let i = 0; i < 20; i += 1) {
                        if (this.wordNumber === i) {
                          result += `<div class="${css['list-dot__dot']} ${css['list-dot__dot-active']}"></div>`;
                          // eslint-disable-next-line no-continue
                          continue;
                        }
                        result += `<div class="${css['list-dot__dot']}"></div>`;
                      }
                      return result;
                    })()}
                  </div>               

                </div>
              </div>
              </div>


              <div class="${css['page-pagination']}">
                <button id="button-back"
                        class="${css['element-font']}
                               ${css['shadow-active']}
                               ${css['page-pagination__button']}
                               ${css['page-pagination__button-back']}
                ">Назад к группам</button>

                <button class="${css['element-font']}
                               ${css['page-pagination__button']}
                               ${css['page-pagination__arrow']}
                               ${css['shadow-active']}
                               " id="prev-page"><</button>

                <button class="${css['element-font']}
                               ${css['page-pagination__text']}
                               ${css['page-pagination__button']}">
                  ${Number(this.page) + ZeroCountCompensation} / 30
                </button>

                <button class="${css['element-font']}
                                ${css['page-pagination__button']}
                                ${css['page-pagination__arrow']}
                                ${css['shadow-active']}
                                " id="next-page">></button>
                </div>
                
                <div class="${css['game-list']}">
                  <div id="go-audio-game"
                       class="${css['game-list__card']}
                       ${css['shadow-active']}">
                    <p class="${css['game-list__emoji']} ${css['title-font']}
                    ">📢</p>
                    <p class="${css['game-list__title']} ${css['header-font']}"
                    >“Аудиовызов” мини-игра</p>
                  </div>

                  <div id="go-sprint-game"
                       class="${css['game-list__card']}
                       ${css['shadow-active']}">
                    <p class="${css['game-list__emoji']} 
                    ${css['title-font']}">😥</p>
                    <p class="${css['game-list__title']} ${css['header-font']}">
                    “Спринт” мини-игра</p>
                  </div>
                </div>
                
           
          </div>
          ${renderFooterTemplate()}
    `;
  }
}

export default BookCardView;
