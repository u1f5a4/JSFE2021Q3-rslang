// eslint-disable-next-line import/no-cycle
import AppController from '../AppController';
import AppModel from '../AppModel';
import HomeView from './HomeView';

class HomeController extends AppController {
  view: HomeView;

  constructor(view: HomeView, model: AppModel) {
    super(view, model);
    this.view = view;
    this.model = model;
  }

  async displayPage() {
    this.view.drawPage();
    this.bindButtons();
  }

  bindButtons() {}
}

export default HomeController;
