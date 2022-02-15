// eslint-disable-next-line import/no-cycle
import AppController from '../../core/Controller';
import AppModel from '../AppModel';
import AudioCallView from './AudioCallView';

class AudioCallController extends AppController {
  constructor(public view: AudioCallView, public model: AppModel) {
    super(view, model);
  }

  bindButtons() {
    const form = document.getElementById('audio-call-form') as HTMLFormElement;
    const firstInput = document.getElementById('level-1') as HTMLInputElement;
    firstInput.checked = true;
    form.addEventListener('submit', (event) => {
      const checkedInput = document.querySelector(
        'input[name=audio-game]:checked'
      ) as HTMLInputElement;
      const checkedInputValue = checkedInput.value;

      window.location.href = `/#audio-game/${checkedInputValue}`;
      event.preventDefault();
    });
  }

  displayPage() {
    this.view.drawPage();
    this.bindButtons();
  }
}

export default AudioCallController;
