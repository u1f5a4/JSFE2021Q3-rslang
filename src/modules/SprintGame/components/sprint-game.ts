import Control from '../../../core/BaseElement';
import { TIME } from '../../../core/constants/server-constants';
import View from '../../../core/View-auth';
import renderHeaderTemplate from '../../../components/Header/_renderHeaderTemplate';
// eslint-disable-next-line import/no-cycle
import SprintFieldGame from './sprint-field-game';
import Timer from './timer';
import styles from '../SprintStyle.module.scss';
// eslint-disable-next-line import/no-cycle
import { Question } from '../SprintController';

export default class SprintGame extends View {
  public score: Control<HTMLElement>;

  public gameField: SprintFieldGame;

  public timer: Timer;

  public sprintContainer: Control<HTMLElement>;

  public soundButton: Control<HTMLElement>;

  public onPlayAudio!: () => void;

  constructor(public scoreValue: number, public result: Question[]) {
    super('div', 'sprint');
    this.node.innerHTML = `${renderHeaderTemplate()}`;
    this.sprintContainer = new Control(
      this.node,
      'div',
      `sprint__container ${styles.wrapper}`
    );
    this.timer = new Timer(this.sprintContainer.node);
    this.soundButton = new Control(
      this.sprintContainer.node,
      'div',
      'sprint__audio',
      `🔊`
    );
    this.score = new Control(
      this.sprintContainer.node,
      'span',
      'score header-font',
      `${this.scoreValue}`
    );
    this.gameField = new SprintFieldGame(this.sprintContainer.node, result);
    this.timer.start(TIME);
    this.soundButton.node.onclick = () => {
      this.onPlayAudio();
    };
  }
}
