/* eslint-disable prettier/prettier */
import renderFooterTemplate from '../../components/Footer/_renderFooterTemplate';
import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import renderPageDescTemplate from '../../components/PageDesc/_renderPageDescTemplate';

import AppView from '../../core/View';
import { emojiList } from '../AppModel';
import styles from './BookStyle.module.scss';

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
            <div class="${styles.content}">
            ${renderPageDescTemplate(this.titlePage, this.subtitlePage)}
              <div class="${styles['book-cards']} app">
              ${(() => {
                let result = ``;

                // eslint-disable-next-line no-restricted-syntax
                for (const elem of emojiList) {
                  const [value, emoji] = elem;
                  result += `<div class="
                                ${styles['book-cards__card']}
                                ${styles['shadow-active']}
                                " data-group='${value}'>
                                  <p class="${
                                    styles['book-cards__emoji']
                                  }">${emoji}</p>
                                  <p class="
                                  ${styles['book-cards__header']} ${
                    styles['header-font']
                  }
                                  ">${
                                    value !== 'difficult'
                                      ? `Группа слов #${value}`
                                      : `Сложные слова`
                                  }</p>
                              </div>`;
                }

                return result;
              })()}
              </div>
            </div>
            ${renderFooterTemplate()}`;
  }
}

export default BookView;
