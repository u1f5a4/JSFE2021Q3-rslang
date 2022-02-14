// eslint-disable-next-line import/no-cycle
import AppView from '../../core/View';
import styles from './AudioCallStyle.module.scss';
import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import renderFooterTemplate from '../../components/Footer/_renderFooterTemplate';
import renderPageDescTemplate from '../../components/PageDesc/_renderPageDescTemplate';
import levelData from './level-data';

class AudioCallView extends AppView {
  titlePage = 'Учебник английского с карточками и мини-играми';

  subtitlePage = `Простой и понятный интерфейс нашего приложения позволит сконцентрироваться на изучении и достигнуть результата наблюдая за своим прогрессом`;

  drawPage() {
    document.title = this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  getHtml() {
    return `
      ${renderHeaderTemplate()} 
      <main class="${styles.container}">
        ${renderPageDescTemplate(
          'Аудиовызов',
          'В этой игре будут звучать английские слова. Кликните на правильный перевод прозвучавшего слова'
        )}
        <form class="${styles.form}" id="audio-call-form">
            <div class="${styles.level__list}">
                ${levelData
                  .map(
                    (level) =>
                      `              
                    <div class="${styles.level__item}">
                        <input type="radio" id="${level.levelId}" name="audio-game" class="${styles.level__input}" value="${level.levelValue}" >
                        <label class="${styles.level__label}" for="${level.levelId}">
                            <span class="level__title">${level.levelTitle}</span>
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
      ${renderFooterTemplate()}
    `;
  }
}

export default AudioCallView;
