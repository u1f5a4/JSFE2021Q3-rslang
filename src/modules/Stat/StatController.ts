import Controller from '../../core/Controller';
import AppModel from '../AppModel';
import StatView from './StatView';

class StatController extends Controller {
  constructor(public view: StatView, public model: AppModel) {
    super(view, model);
  }

  async displayPage() {
    this.view.drawPage();
    this.model.logout();

    const stat = await this.model.getStat();
    this.view.drawNumbers(stat);
  }
}

export default StatController;
