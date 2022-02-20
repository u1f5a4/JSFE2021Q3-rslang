// eslint-disable-next-line import/no-cycle
import AppView from '../../core/View';
import './HomeStyle.scss';
import styles from './HomeStyle.module.scss';
import pageCardsData from './page-cards-data';
import renderPageDescTemplate from '../../components/PageDesc/_renderPageDescTemplate';
import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import renderFooterTemplate from '../../components/Footer/_renderFooterTemplate';

class HomeView extends AppView {
  titlePage = `Изучение английского по карточкам и мини-играми`;

  subtitlePage = `Простой и понятный интерфейс нашего приложения позволит сконцентрироваться на изучении и достигнуть результата наблюдая за своим прогрессом`;

  drawPage() {
    document.title = this.titlemain + this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  // eslint-disable-next-line class-methods-use-this
  getHtml() {
    // <div class="${styles.hero}"></div>
    return `
      ${renderHeaderTemplate()} 

      <main class="${styles.content}">

        <div class="${styles.main__block}  ">
        
            ${renderPageDescTemplate(this.titlePage, this.subtitlePage)}

            <div class="${styles.cards__list}">
              ${pageCardsData
                .map(
                  (card) =>
                    ` <div class="${styles.cards__item}">
                        <div class="${styles.cards__inner}">
                          <i class="${styles.cards__icon} ${card.cardIconClassName}"></i>
                          <h4 class="${styles.cards__title} ${styles['header-font']}">
                            ${card.cardTitle}
                          </h4>
                        </div>
                        <p class="${styles.cards__text} ${styles['text-font']}">
                            ${card.cardSubtitle}
                        </p>
                      </div>`
                )
                .join('')}
            </div>
        </div>
      </main>

      ${renderFooterTemplate()}
    `;
  }
}

export default HomeView;
