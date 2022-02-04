import AppController from '../core/AppController';
import HomeView from './HomeView';
import AppModel from './modules/AppModel';

class HomeController extends AppController {
  constructor(public view: HomeView, public model: AppModel) {
    super(view, model);
  }

  displayPage() {
    this.view.drawPage();
  }
}

export default HomeController;
