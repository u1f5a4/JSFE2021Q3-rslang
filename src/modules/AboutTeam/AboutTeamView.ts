// eslint-disable-next-line import/no-cycle
import AppView from '../../core/View';
import '../Home/HomeStyle.scss';
import styles from '../Home/HomeStyle.module.scss';
import teamData from './team-data';
import renderPageDescTemplate from '../../components/PageDesc/_renderPageDescTemplate';
import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import renderFooterTemplate from '../../components/Footer/_renderFooterTemplate';

class AboutTeamView extends AppView {
  titlePage = `Наша команда`;

  subtitlePage = ``;

  drawPage() {
    document.title = this.titlemain + this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  // eslint-disable-next-line class-methods-use-this
  getHtml() {
    return `
      ${renderHeaderTemplate()} 

      <main class="${styles.content}">

        <div class="${styles.main__block}  ">
        
            ${renderPageDescTemplate(this.titlePage, this.subtitlePage)}

            <div class="${styles.cards__list}">
              ${teamData
                .map(
                  (card) =>
                    ` <div class="${styles.cards__item}">
                        <div class="${styles.cards__inner}">
                        <img src="${card.src}" alt="Sergey Klimov" class="${styles.cards__icon}">
                          <a class="${styles.cards__title} ${styles['header-font']}" href="${card.href}">
                            ${card.name}
                          </a>
                        </div>
                        <p class="${styles.cards__text} ${styles['text-font']}">
                            ${card.func}
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

export default AboutTeamView;
