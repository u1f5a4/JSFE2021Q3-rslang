// eslint-disable-next-line import/no-cycle
import AppController from '../../core/Controller';
import AppModel from '../AppModel';
import HomeView from './HomeView';

class HomeController extends AppController {
  constructor(public view: HomeView, public model: AppModel) {
    super(view, model);
  }

  displayPage() {
    this.view.drawPage();
  }
}

export default HomeController;
