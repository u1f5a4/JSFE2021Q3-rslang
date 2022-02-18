import AppView from '../../../core/View';
import IWord from '../../../models/word-model';
import renderFooterTemplate from '../../../components/Footer/_renderFooterTemplate';
import renderHeaderTemplate from '../../../components/Header/_renderHeaderTemplate';
import renderPageDescTemplate from '../../../components/PageDesc/_renderPageDescTemplate';
import { emojiList } from '../../AppModel';
import css from './BookCardStyle.module.scss';

class BookCardView extends AppView {
  group?: string;

  page?: number;

  wordNumber?: number;

  word?: IWord;

  isUser?: boolean;

  titlePage = ``;

  subtitlePage = `Нажимай на карточку и смотри перевод, добавляй
   в список сложных или лёгких слов, смотри изображение и слушай произношение`;

  domain?: string;

  countDifficultWords?: number;

  countDifficultWordsOnPage?: number;

  typePage?: 'easy' | 'difficult' | 'mixed';

  async drawCardPage(word: IWord) {
    this.word = word;
    if (this.group !== 'difficult') {
      this.body!.innerHTML = this.getHtml();
      this.titlePage = `Группа #${Number(this.group) + 1}`;
      this.isPage();
    } else {
      this.body!.innerHTML = this.getHtmlDifficult();
      this.titlePage = `Сложные слова`;
    }

    document.title = this.titlemain + this.titlePage;
  }

  isState() {
    if (this.isUser) {
      try {
        if (this.word!.userWord!.optional.easy)
          return css['book-card__card-easy'];
        if (this.word!.userWord!.optional.difficulty)
          return css['book-card__card-difficulty'];
      } catch {
        return false;
      }
    }
    return false;
  }

  rightAnswers() {
    try {
      if (this.isUser) {
        const { word } = this;
        if (
          word?.userWord &&
          !word?.userWord!.optional.easy &&
          !word?.userWord!.optional.difficulty
        ) {
          const answers = word?.userWord?.optional.answers;
          return `${this.genSquareAnswers(3, Number(answers))}`;
        }
        if (
          !word?.userWord!.optional.easy &&
          word?.userWord!.optional.difficulty
        ) {
          const answers = word?.userWord?.optional.answers;
          return `${this.genSquareAnswers(5, Number(answers))}`;
        }
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  genSquareAnswers(qty: number, qtyAnswers: number) {
    let result = '';
    for (let i = 0; i !== qty; i += 1) {
      if (i < qtyAnswers) {
        // console.log('1');
        result += `<div class="${css['book-card__answers-dot']}
        ${css['book-card__answers-dot-right']}"></div>`;
      } else {
        // console.log('0');
        result += `<div class="${css['book-card__answers-dot']}"></div>`;
      }
    }

    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  changeCardToEasy() {
    const card = document.querySelector('#flip');
    card?.classList.remove(`${css['book-card__card-difficulty']}`);
    card?.classList.add(`${css['book-card__card-easy']}`);
  }

  // eslint-disable-next-line class-methods-use-this
  changeCardToDifficulty() {
    const card = document.querySelector('#flip');
    card?.classList.remove(`${css['book-card__card-easy']}`);
    card?.classList.add(`${css['book-card__card-difficulty']}`);
  }

  // eslint-disable-next-line class-methods-use-this
  changeCardToDeleted() {
    const card = document.querySelector('#flip') as HTMLDivElement;
    card.style.borderColor = 'none';
  }

  isPage() {
    const pag = document.querySelector('#pag') as HTMLDivElement;
    if (this.typePage === 'easy') {
      pag?.classList.add(`${css['page-pagination__easy']}`);
    }
    if (this.typePage === 'difficult') {
      pag?.classList.add(`${css['page-pagination__difficulty']}`);
    }
  }

  getHtml(): string {
    const ZeroCountCompensation = 1;
    return `${renderHeaderTemplate()}
          <div class="${css.content} ${css['book-card__page']} ${css.wrapper}">

            ${renderPageDescTemplate(
              `${
                this.group !== 'difficult'
                  ? emojiList[Number(this.group)][1]
                  : emojiList[6][1]
              } Группа слов # ${Number(this.group) + ZeroCountCompensation}`,
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
                      <div class="${css['book-card__card']} 
                                  ${this.isState()}
                                  " id="flip">
      
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
                              <div class='${css['book-card__answers']}
                              '>${this.rightAnswers()}</div>
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
                            ${(() => {
                              if (this.isUser)
                                return `<div class="${css['book-card__buttons-word']}">
                              <button id="complicate-word" class="${css.btn} 
                              ${css['book-card__button-complicate-word']}">
                                  Сложно
                              </button>
                              <button id="easy-word" class="${css.btn}
                              ${css['book-card__button-easy-word']}">
                                  Легко
                              </button>
                            </div>`;
                              return '';
                            })()}
                            
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

                <button id="pag" class="${css['element-font']}
                               ${css['page-pagination__text']}
                               ${css['page-pagination__button']}">
                  <b>${Number(this.page) + ZeroCountCompensation}</b>
                   / 30 
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

  // eslint-disable-next-line class-methods-use-this
  getHtmlDifficult(): string {
    const ZeroCountCompensation = 1;
    return `${renderHeaderTemplate()}
    <div class="${css.content} ${css['book-card__page']}">

      ${renderPageDescTemplate(
        `${emojiList[6][1]} Сложные слова`,
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
                <div class="${css['book-card__card']} 
                            " id="flip">

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
                        <button id="clear-word" class="${css.btn}
                        ${css['book-card__button-easy-word']}">
                          убрать из сложных слов
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
                              " id="next-word-difficult">👉</button>
            </div>

            <div class="${css['list-dot']}">
              ${(() => {
                let result = '';
                for (
                  let i = 0;
                  i < Number(this.countDifficultWordsOnPage);
                  i += 1
                ) {
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
            ${Number(this.page) + ZeroCountCompensation} / 
            ${Number(this.countDifficultWords) + ZeroCountCompensation}
          </button>

          <button class="${css['element-font']}
                          ${css['page-pagination__button']}
                          ${css['page-pagination__arrow']}
                          ${css['shadow-active']}
                          " id="next-page-difficult">></button>
          </div>
    </div>
    ${renderFooterTemplate()}
`;
  }
}

export default BookCardView;
