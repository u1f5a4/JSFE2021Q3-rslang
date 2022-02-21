import View from '../../core/View-auth';
import './SprintStyle.scss';
import styles from './SprintStyle.module.scss';
import levelData from '../AudioCall/level-data';
import renderPageDescTemplate from '../../components/PageDesc/_renderPageDescTemplate';
import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';

export default class SprintView extends View {
  public titlePage = 'Спринт';

  public subtitlePage =
    'За одну минуту найди как можно больше совпадений: английское слово - перевод';

  constructor() {
    super('div', 'auth');
  }

  public drawPage(): void {
    document.title = this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  public getHtml(): string {
    return `
      ${renderHeaderTemplate()} 
      <main class="${styles.wrapper} ${styles.container}">
        ${renderPageDescTemplate(this.titlePage, this.subtitlePage)}
        <form class="${styles.form}" id="audio-call-form">
            <div class="${styles.level__list}">
                ${levelData
                  .map(
                    (level) =>
                      `              
                    <div class="${styles.level__item}">
                        <input type="radio" id="${level.levelId}" name="audio-game" class="${styles.level__input}" value="${level.levelValue}" >
                        <label class="${styles.level__label} ${styles['body-font']}" for="${level.levelId}">
                            <span class=" level__title">${level.levelTitle}</span>
                            <span class="level__name">${level.levelName}</span>
                        </label>
                    </div>
                    `
                  )
                  .join('')}
            </div>
            <button type="submit" class="${styles.btn}">Play</button>
        </form>
      </main>
    `;
  }
}
