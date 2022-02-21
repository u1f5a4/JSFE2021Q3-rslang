// eslint-disable-next-line import/no-cycle
import AppView from '../../../core/View';
import styles from './style.module.scss';
import renderHeaderTemplate from '../../../components/Header/_renderHeaderTemplate';
// import renderFooterTemplate from '../../../components/Footer/_renderFooterTemplate';
import './style.scss';
import renderPageDescTemplate from '../../../components/PageDesc/_renderPageDescTemplate';

class AudioCallGameView extends AppView {
  titlePage = 'Аудиовызов';

  subtitlePage = `Слушай английскую речь и выбирай правильный перевод`;

  drawPage() {
    document.title = this.titlemain + this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  getHtml() {
    return `
      ${renderHeaderTemplate()}
      <main class="${styles.wrapper} ${styles.main}  ${styles.container}">
      ${renderPageDescTemplate(this.titlePage, this.subtitlePage)}

        <div class="${styles.game}" id="game-container">
            <div class="${styles['game__sound-box']}">
                <div class="${styles['audio-box']}" id="play-game-audio">
                    <img alt="sound-img" class="${
                      styles['audio-box__img']
                    }" src="./assets/images/sound.png" id="sound-img">
                </div>
                <audio id="round-audio"></audio>
                <audio src="./assets/audio/correct.mp3" id="correct-audio"></audio>
                <audio src="./assets/audio/error.mp3" id="error-audio"></audio>
            </div>
            <div class="${styles['game__options-box']}" id="game-options-box">
            </div>
            <div id="game-control-box" class="${styles['game__control-box']}">
                <button class="${styles['element-font']}
                ${styles['white-button']}
                ${styles['shadow-active']}
                " id="next-question" style="display: none">Следующий вопрос</button>
                <button class="${styles['element-font']}
                ${styles['white-button']}
                ${styles['shadow-active']}
                " id="show-answer">Я не знаю ответа</button>
            </div>
        </div>
        <div class="display-none 
        ${styles['result-container']}" id="result-container">
            <h5 class="${styles['header-font']} 
            ${styles['result-container__title']}
            ">Ваш результат: <span class="${styles['result-container__score']}
            " id="quiz-score"></span></h5>
            <div class="" id="user-answers-container">
                <table class="${styles.table} element-font">
                    <thead>
                        <tr>
                            <th>Слово</th>
                            <th>Транскрипт</th>
                            <th>Перевод</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="result-table-body">
                        
                    </tbody>                   
                </table>
            </div>
        </div>
      </main>
    `;
  }
}

export default AudioCallGameView;
