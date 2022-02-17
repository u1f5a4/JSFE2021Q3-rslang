import Controller from '../../core/Controller';
import AppModel from '../AppModel';
import GamesView from './GamesView';

class GamesController extends Controller {
  constructor(public view: GamesView, public model: AppModel) {
    super(view, model);
  }

  displayPage() {
    this.view.drawPage();
    this.bindButton();
  }

  // eslint-disable-next-line class-methods-use-this
  bindButton() {
    const buttonGoAudioGame = document.querySelector('#go-audio-game');
    buttonGoAudioGame?.addEventListener('click', () => {
      document.location = '/#audioCall';
    });
    const buttonGoSprintGame = document.querySelector('#go-sprint-game');
    buttonGoSprintGame?.addEventListener('click', () => {
      document.location = '/#sprint';
    });
  }
}

export default GamesController;
