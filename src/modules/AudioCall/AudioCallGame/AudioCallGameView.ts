// eslint-disable-next-line import/no-cycle
import AppView from '../../../core/View';
import styles from './style.module.scss';
import renderHeaderTemplate from '../../../components/Header/_renderHeaderTemplate';
import renderFooterTemplate from '../../../components/Footer/_renderFooterTemplate';


class AudioCallGameView extends AppView {
  titlePage = 'Учебник английского с карточками и мини-играми';

  subtitlePage = `Простой и понятный интерфейс нашего приложения позволит сконцентрироваться на изучении и достигнуть результата наблюдая за своим прогрессом`;

  drawPage() {
    document.title = this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  getHtml() {
    return `
      ${renderHeaderTemplate()}
      <main class="${styles.main}  ${styles.container}">
        <div class="${styles.game}" id="game-container">
            <div class="${styles['game__sound-box']}">
                <div class="${styles['audio-box']}" id="play-game-audio">
                    <img alt="sound-img" class="${styles['audio-box__img']}" src="./assets/images/sound.png" id="sound-img">
                </div>
                <audio id="round-audio"></audio>
            </div>
            <div class="${styles['game__options-box']}" id="game-options-box">
            </div>
            <div class="${styles['game__control-box']}">
                <button id="next-question" style="display: none">NEXT</button>
                <button id="show-answer">I don't know</button>
            </div>
        </div>
        <div class="display-none" id="result-container">
            <h5>Ваш результат: <span id="quiz-score"></span></h5>
            <div class="" id="user-answers-container">
                <div class="" id="correct-answers-container"></div>
                <div class="" id="wrong-answers-container"></div>
            </div>
            <div class="" id="quiz-controls">
                <button id="repeat-game">Повторить</button>
                <button id="repeat-game">Закончить</button>
            </div>
        </div>
      </main>
      ${renderFooterTemplate()}
    `;
  }
}

export default AudioCallGameView;
