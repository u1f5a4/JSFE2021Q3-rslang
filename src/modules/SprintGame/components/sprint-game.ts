import renderHeaderTemplate from '../../../components/Header/_renderHeaderTemplate';
import Control from '../../../core/BaseElement';
import { TIME } from '../../../core/constants/server-constants';
import View from '../../../core/View-auth';
// eslint-disable-next-line import/no-cycle
import SprintFieldGame from './sprint-field-game';
import Timer from './timer';

export default class SprintGame extends View {
  public score: Control<HTMLElement>;

  public gameField: SprintFieldGame;

  public timer: Timer;

  public sprintContainer: Control<HTMLElement>;
  public soundButton: Control<HTMLElement>;

  constructor(public scoreValue: number, public result: any) {
    super('div', 'sprint');
    this.node.innerHTML = `${renderHeaderTemplate()}`;
    this.sprintContainer = new Control(this.node, 'div', 'sprint__container');
    this.soundButton = new Control(this.sprintContainer.node, '', `🔊`)
    this.timer = new Timer(this.sprintContainer.node);
    this.score = new Control(
      this.sprintContainer.node,
      'span',
      'score header-font',
      `${this.scoreValue}`
    );
    this.gameField = new SprintFieldGame(this.sprintContainer.node, result);
    this.timer.start(TIME);
  }
}
