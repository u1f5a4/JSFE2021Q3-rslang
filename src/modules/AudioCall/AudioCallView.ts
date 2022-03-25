// eslint-disable-next-line import/no-cycle
import AppView from '../../core/View';
import styles from './AudioCallStyle.module.scss';
import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import renderPageDescTemplate from '../../components/PageDesc/_renderPageDescTemplate';
import levelData from './level-data';

class AudioCallView extends AppView {
  titlePage = 'Аудиовызов';

  subtitlePage = `Слушай английскую речь и выбирай правильный перевод`;

  drawPage() {
    document.title = this.titlemain + this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  getHtml() {
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

export default AudioCallView;
