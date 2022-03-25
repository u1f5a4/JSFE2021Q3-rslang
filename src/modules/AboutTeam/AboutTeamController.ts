// eslint-disable-next-line import/no-cycle
import AppController from '../../core/Controller';
import AppModel from '../AppModel';
import AboutTeamView from './AboutTeamView';

class AboutTeamController extends AppController {
  constructor(public view: AboutTeamView, public model: AppModel) {
    super(view, model);
  }

  displayPage() {
    this.view.drawPage();
    this.model.logout();
  }
}

export default AboutTeamController;
