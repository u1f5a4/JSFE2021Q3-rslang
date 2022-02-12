// eslint-disable-next-line import/no-cycle
import AppView from '../../core/View';
import styles from './AudioCallStyle.module.scss';
import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import renderFooterTemplate from '../../components/Footer/_renderFooterTemplate';
import levelData from "./level-data";

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
        <form class="form" id="audio-call-form">
            <div class="form__level-list">
                ${levelData.map(level => 
                  `              
                    <div class="form__level-item">
                        <input type="radio" id="${level.levelId}" name="audio-game" class="form__level-input" value="${level.levelValue}" >
                        <label class="form__level-label" for="${level.levelId}">
                            <span class="form__level-title">${level.levelTitle}</span>
                            <span class="form__level-name">${level.levelName}</span>
                        </label>
                    </div>
                    `  
                ).join('')}
            </div>
            <button type="submit">Play</button>
        </form>
      </main>
      ${renderFooterTemplate()}
    `;
  }
}

export default AudioCallView;
