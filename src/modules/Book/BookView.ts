/* eslint-disable prettier/prettier */
import renderFooterTemplate from '../../Components/Footer/renderFooterTemplate';
import renderHeaderTemplate from '../../Components/Header/renderHeaderTemplate';
import AppView from '../../core/View';
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
              <div class="${styles['title-page']}">  
                <h2 class="${styles['title-page__title']} 
                          ${styles['title-font']}
                ">${this.titlePage}</h2>
                <p class="
                ${styles['title-page__text']}
                ${styles['text-font']}
                ">${this.subtitlePage}</p>
              </div>

              <div class="${styles['book-cards']} app">
                <div class="
                ${styles['book-cards__card']}
                ${styles['shadow-active']}
                " data-group='1'>
                  <p class="${styles['book-cards__emoji']}">🤐</p>
                  <p class="
                  ${styles['book-cards__header']} ${styles['header-font']}
                  ">Группа слов #1</p>
                </div>

                <div class="
                ${styles['book-cards__card']}
                ${styles['shadow-active']}
                " data-group='2'>
                  <p class="${styles['book-cards__emoji']}">🙄</p>
                  <p class="
                  ${styles['book-cards__header']} ${styles['header-font']}
                  ">Группа слов #2</p>
                </div>

                <div class="
                ${styles['book-cards__card']}
                ${styles['shadow-active']}
                " data-group='3'>
                  <p class="${styles['book-cards__emoji']}">🤤</p>
                  <p class="
                  ${styles['book-cards__header']} ${styles['header-font']}
                  ">Группа слов #3</p>
                </div>

                <div class="
                ${styles['book-cards__card']}
                ${styles['shadow-active']}
                " data-group='4'>
                  <p class="${styles['book-cards__emoji']}">🤓</p>
                  <p class="
                  ${styles['book-cards__header']} ${styles['header-font']}
                  ">Группа слов #4</p>
                </div>

                <div class="
                ${styles['book-cards__card']}
                ${styles['shadow-active']}
                " data-group='5'>
                  <p class="${styles['book-cards__emoji']}">😎</p>
                  <p class="
                  ${styles['book-cards__header']} ${styles['header-font']}
                  ">Группа слов #5</p>
                </div>

                <div class="
                ${styles['book-cards__card']}
                ${styles['shadow-active']}
                " data-group='6'>
                  <p class="${styles['book-cards__emoji']}">😭</p>
                  <p class="
                  ${styles['book-cards__header']} ${styles['header-font']}
                  ">Группа слов #6</p>
                </div>

                <div class="
                ${styles['book-cards__card']}
                ${styles['shadow-active']}
                " data-group='difficult'>
                  <p class="${styles['book-cards__emoji']}">🤡</p>
                  <p class="
                  ${styles['book-cards__header']} ${styles['header-font']}
                  ">Сложные слова</p>
                </div>
              </div>
            </div>
            ${renderFooterTemplate()}`;
  }
}

export default BookView;
