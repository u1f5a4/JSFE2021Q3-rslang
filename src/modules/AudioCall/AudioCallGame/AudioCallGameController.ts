// eslint-disable-next-line import/no-cycle
import AppController from '../../../core/Controller';
import AppModel from '../../AppModel';
import AudioCallView from './AudioCallGameView';
import { QuizManager } from './services/QuizManager';
import IWord from '../../../models/word-model';
import styles from './style.module.scss';

const qm = new QuizManager();

class AudioCallController extends AppController {
  constructor(public view: AudioCallView, public model: AppModel) {
    super(view, model);
  }

  async setEvents() {
    // START QUIZ
    await qm.startRound();
    await this.getQuizElements();
  }

  async getQuizElements() {
    if (!qm.isGameFinished) {
      await this.getOptions();
      await this.getAudio();
    } else {
      this.showResultContainer();
    }
  }

  async getAudio() {
    const audio = document.getElementById('round-audio') as HTMLAudioElement;

    audio.src = '';
    audio.src = `${this.model.getDomain()}/${qm.currentRoundAnswer?.audio}`;
    await audio.play();
  }

  async getOptions() {
    const optionsBox = document.getElementById(
      'game-options-box'
    ) as HTMLElement;
    optionsBox.innerHTML = '';
    qm.currentRoundOptions.forEach((option: IWord) => {
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
        qm.guessAnswer(targetId);
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
      if (btn.id === qm.currentRoundAnswer.id) {
        btn.classList.toggle(`${styles['white-button__success']}`);
      } else {
        btn.classList.toggle(`${styles['white-button__wrong']}`);
      }
    });
    const soundImg = document.getElementById('sound-img') as HTMLImageElement;
    soundImg.src = `${this.model.getDomain()}/${qm.currentRoundAnswer?.image}`;
  }

  async bindElements() {
    const nextQuestionBtn = document.getElementById(
      'next-question'
    ) as HTMLButtonElement;

    nextQuestionBtn.addEventListener('click', async () => {
      await qm.generateRound();
      await this.getQuizElements();
      if (qm.isGameFinished) {
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

  bindButtons() {
    const audio = document.getElementById('round-audio') as HTMLAudioElement;

    const playAudioBtn = document.getElementById(
      'play-game-audio'
    ) as HTMLButtonElement;
    playAudioBtn.addEventListener('click', () => {
      audio.play();
    });

    const showAnswerBtn = document.getElementById(
      'show-answer'
    ) as HTMLButtonElement;
    showAnswerBtn.addEventListener('click', () => {
      qm.guessAnswer('wrong-answer');
      this.changeOptionsColor();

      this.switchBtnState(true);
    });
  }

  showResultContainer() {
    const resultContainer = document.getElementById(
      'result-container'
    ) as HTMLDivElement;
    const quizScore = document.getElementById('quiz-score') as HTMLSpanElement;
    // const correctAnswersContainer = document.getElementById(
    //   'correct-answers-container'
    // ) as HTMLDivElement;
    // const wrongAnswersContainer = document.getElementById(
    //   'wrong-answers-container'
    // ) as HTMLDivElement;

    quizScore.innerText = qm.getQuizResult().points.toString();

    const gameContainer = document.getElementById(
      'game-container'
    ) as HTMLDivElement;

    resultContainer.classList.toggle('display-none');
    // resultContainer.classList.add(`${styles['result-container']}`);

    gameContainer.classList.toggle('display-none');
  }

  async displayPage() {
    this.view.drawPage();
    await this.setEvents();
    await this.bindElements();
    this.bindButtons();
  }
}

export default AudioCallController;
