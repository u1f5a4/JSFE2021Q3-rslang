// eslint-disable-next-line import/no-cycle
import AppController from '../../../core/Controller';
import AppModel from '../../AppModel';
import AudioCallView from './AudioCallGameView';

import DataManger from "./scripts/DataManager";
const dm = new DataManger();

class AudioCallController extends AppController {
    constructor(public view: AudioCallView, public model: AppModel) {
        super(view, model);
    }

    bindElements () {
        dm.getData()
    }

    displayPage() {
        this.view.drawPage();
        this.bindElements()
    }
}

export default AudioCallController;
