// eslint-disable-next-line import/no-cycle
import AppController from '../../../core/Controller';
import AppModel from '../../AppModel';
import AudioCallView from './AudioCallGameView';
import { QuizManager } from './services/QuizManager';
const qm = new QuizManager();

class AudioCallController extends AppController {
  constructor(public view: AudioCallView, public model: AppModel) {
    super(view, model);
  }

  bindElements() {
    qm.startRound();
  }

  displayPage() {
    this.view.drawPage();
    this.bindElements();
  }
}

export default AudioCallController;
