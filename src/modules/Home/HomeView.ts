// eslint-disable-next-line import/no-cycle
import AppView from '../../core/View';
import './HomeStyle.scss';
import styles from './HomeStyle.module.scss';
import renderHeaderTemplate from '../../Components/Header/_renderHeaderTemplate';
import renderFooterTemplate from '../../Components/Footer/_renderFooterTemplate';
import pageCardsData from './page-cards-data';

class HomeView extends AppView {
  titlePage = 'Учебник английского с карточками и мини-играми';

  subtitlePage = `Простой и понятный интерфейс нашего приложения позволит сконцентрироваться на изучении и достигнуть результата наблюдая за своим прогрессом`;

  drawPage() {
    document.title = this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  getHtml() {
    return `
      ${renderHeaderTemplate()} 
      <main class="${styles.main}">
        <div class="${styles.hero}">
            <h1 class="${styles.hero__title}">RSlang играй и учись</h1>
        </div>
        <div class="${styles.main__block} _container">
            <div class="page-caption">  
                <h2 class="page-caption__title title-font">${
                  this.titlePage
                }</h2>
                <p class="page-caption__subtitle text-font">${
                  this.subtitlePage
                }</p>
            </div>
            <div class="${styles.cards__list}">
              ${pageCardsData
                .map(
                  (card) =>
                    `<div class="${styles.cards__item}">
                    <div class="${styles.cards__inner}">
                        <i class="${styles.cards__icon} ${card.cardIconClassName} normalized-icon"></i>
                        <h4 class="${styles.cards__title}">
                            ${card.cardTitle}
                        </h4>
                    </div>
                    <p class="page-cards__text text-font">
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
