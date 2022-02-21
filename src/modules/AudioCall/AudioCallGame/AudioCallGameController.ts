// eslint-disable-next-line import/no-cycle
import AppController from '../../../core/Controller';
import AppModel from '../../AppModel';
import AudioCallView from './AudioCallGameView';
import { QuizManager } from './services/QuizManager';
import IWord from '../../../models/word-model';
import styles from './style.module.scss';

class AudioCallController extends AppController {
  qm = new QuizManager();

  constructor(public view: AudioCallView, public model: AppModel) {
    super(view, model);
  }

  async setEvents(group: string, page: string) {
    // START QUIZ
    await this.qm.startRound(group, page);
    await this.getQuizElements();
  }

  async getQuizElements() {
    if (!this.qm.isGameFinished) {
      await this.getOptions();
      await this.getAudio();
    } else {
      this.showResultContainer();
    }
    this.keyHandler();
  }

  async getAudio() {
    try {
      const audio = document.getElementById('round-audio') as HTMLAudioElement;
      audio.src = '';
      audio.src = `${this.model.getDomain()}/${
        this.qm.currentRoundAnswer?.audio
      }`;
      await audio.play();

      this.playRoundWord();
      audio.src = '';
      audio.src = `${this.model.getDomain()}/${
        this.qm.currentRoundAnswer?.audio
      }`;

      await audio.play();
    } catch (error) {
      // console.log(error);
    }
  }

  async getOptions() {
    const optionsBox = document.getElementById(
      'game-options-box'
    ) as HTMLElement;
    optionsBox.innerHTML = '';
    this.qm.currentRoundOptions.forEach((option: IWord) => {
      const btn = document.createElement('button');
      btn.id = <string>option?.id;
      btn.classList.add('quiz-options-btn');
      btn.classList.add(`${styles['element-font']}`);
      btn.classList.add(`${styles['shadow-active']}`);
      btn.classList.add(`${styles['white-button']}`);
      btn.innerText = option?.wordTranslate;
      optionsBox.appendChild(btn);
    });

    const onAnswer = (event: MouseEvent): void => {
      event.preventDefault();
      const target = <HTMLBodyElement>event.target;
      if (target.nodeName === 'DIV') return;
      const targetId = target.id;
      if (target.classList.contains('quiz-options-btn')) {
        this.qm.guessAnswer(targetId);
      }

      this.switchBtnState(true);
      optionsBox.removeEventListener('click', onAnswer);
      this.changeOptionsColor();
    };

    optionsBox.addEventListener('click', onAnswer);
  }

  async changeOptionsColor() {
    const allOptionBtnCollection = document.querySelectorAll(
      '.quiz-options-btn'
    ) as NodeListOf<HTMLButtonElement>;
    allOptionBtnCollection.forEach((btn) => {
      // eslint-disable-next-line no-param-reassign
      btn.disabled = true;
      if (btn.id === this.qm.currentRoundAnswer.id) {
        btn.classList.toggle(`${styles['white-button__success']}`);
      } else {
        btn.classList.toggle(`${styles['white-button__wrong']}`);
      }
    });
    const soundImg = document.getElementById('sound-img') as HTMLImageElement;
    soundImg.src = `${this.model.getDomain()}/${
      this.qm.currentRoundAnswer?.image
    }`;
  }

  async bindElements() {
    const nextQuestionBtn = document.getElementById(
      'next-question'
    ) as HTMLButtonElement;

    nextQuestionBtn.addEventListener('click', async () => {
      await this.qm.generateRound();
      await this.getQuizElements();
      if (this.qm.isGameFinished) {
        nextQuestionBtn.disabled = true;
      }
      this.switchBtnState(false);

      const soundImg = document.getElementById('sound-img') as HTMLImageElement;
      soundImg.src = `assets/images/sound.png`;
    });
  }

  switchBtnState(isUserAnswered: boolean) {
    const nextQuestionBtn = document.getElementById(
      'next-question'
    ) as HTMLButtonElement;

    const showAnswerBtn = document.getElementById(
      'show-answer'
    ) as HTMLButtonElement;

    if (isUserAnswered) {
      showAnswerBtn.style.display = 'none';
      nextQuestionBtn.style.display = 'block';
    } else {
      showAnswerBtn.style.display = 'block';
      nextQuestionBtn.style.display = 'none';
    }
  }

  playRoundWord() {
    const playAudioBtn = document.getElementById(
      'play-game-audio'
    ) as HTMLButtonElement;
    playAudioBtn.classList.add('heartbeat');
    setTimeout(() => {
      playAudioBtn.classList.remove('heartbeat');
    }, 1000);
  }

  async bindButtons() {
    const audio = document.getElementById('round-audio') as HTMLAudioElement;

    const playAudioBtn = document.getElementById(
      'play-game-audio'
    ) as HTMLButtonElement;

    this.playRoundWord();
    playAudioBtn.addEventListener('click', () => {
      audio.play();
      this.playRoundWord();
    });

    const showAnswerBtn = document.getElementById(
      'show-answer'
    ) as HTMLButtonElement;

    showAnswerBtn.addEventListener('click', () => {
      this.qm.guessAnswer('wrong-answer');
      this.changeOptionsColor();

      this.switchBtnState(true);
    });
  }

  keyHandler() {
    const gameOptionsBox = document.getElementById(
      'game-options-box'
    ) as HTMLDivElement;

    const nextQuestionBtn = document.getElementById(
      'next-question'
    ) as HTMLButtonElement;

    const showAnswerBtn = document.getElementById(
      'show-answer'
    ) as HTMLButtonElement;

    const playAudioBtn = document.getElementById(
      'play-game-audio'
    ) as HTMLButtonElement;

    const gameOptionsFirstBtn = gameOptionsBox.children[0] as HTMLButtonElement;
    const gameOptionsSecondBtn = gameOptionsBox
      .children[1] as HTMLButtonElement;
    const gameOptionsThirdBtn = gameOptionsBox.children[2] as HTMLButtonElement;
    const gameOptionsFourthBtn = gameOptionsBox
      .children[3] as HTMLButtonElement;
    const gameOptionsFifthBtn = gameOptionsBox.children[4] as HTMLButtonElement;

    document.onkeydown = (e) => {
      if (
        // eslint-disable-next-line no-restricted-globals
        location.hash.slice(1, -2) === 'book' ||
        // eslint-disable-next-line no-restricted-globals
        location.hash.slice(1, -2) === 'audio-game'
      ) {
        switch (e.keyCode) {
          case 49:
            gameOptionsFirstBtn.click();
            break;
          case 50:
            gameOptionsSecondBtn.click();
            break;
          case 51:
            gameOptionsThirdBtn.click();
            break;
          case 52:
            gameOptionsFourthBtn.click();
            break;
          case 53:
            gameOptionsFifthBtn.click();
            break;
          case 32:
            if (nextQuestionBtn.style.display === 'none') {
              showAnswerBtn.click();
            } else {
              nextQuestionBtn.click();
            }
            e.preventDefault();
            break;
          case 80:
            playAudioBtn.click();
            break;
          default:
            break;
        }
      }
    };
  }

  showResultContainer() {
    const resultContainer = document.getElementById(
      'result-container'
    ) as HTMLDivElement;
    const quizScore = document.getElementById('quiz-score') as HTMLSpanElement;

    const tableBody = document.getElementById(
      'result-table-body'
    ) as HTMLTableElement;

    this.qm.quizHistory.forEach((data) => {
      const tableRow = document.createElement('tr') as HTMLTableRowElement;
      tableRow.innerHTML = `
        <td class="${styles['result-table-data']}" >${
        data.roundAnswer.word
      }</td>
        <td class="${styles['result-table-data']}" >${
        data.roundAnswer.transcription
      }</td>
        <td class="${styles['result-table-data']}" >${
        data.roundAnswer.wordTranslate
      }</td>
        <td class="${styles['result-table-data']} ${
        styles['audio-controller']
      }" id="${data.roundAnswer.id}-audio-controller">🔊</td>
        <td class="${styles['result-table-data']}"  >${
        data.roundResult !== 'WON' ? '❌' : '✅'
      }</td>
        <audio src="${this.model.getDomain()}/${data.roundAnswer.audio}" id="${
        data.roundAnswer.id
      }-audio"></audio>
      `;
      tableBody.appendChild(tableRow);
      const tableAudioController = document.getElementById(
        `${data.roundAnswer.id}-audio-controller`
      ) as HTMLTableElement;
      const tableAudio = document.getElementById(
        `${data.roundAnswer.id}-audio`
      ) as HTMLAudioElement;

      tableAudioController.addEventListener('click', () => {
        tableAudio.play();
      });
    });
    quizScore.innerText = this.qm.getQuizResult().points.toString();

    const gameContainer = document.getElementById(
      'game-container'
    ) as HTMLDivElement;

    resultContainer.classList.toggle('display-none');
    resultContainer.classList.add(`${styles['result-container']}`);

    gameContainer.classList.toggle('display-none');
  }

  async displayPage(group: string, page: string) {
    this.view.drawPage();
    await this.setEvents(group, page);
    await this.bindButtons();
    await this.bindElements();
  }
}

export default AudioCallController;
