import AppModel from '../modules/AppModel';
import AppView from './AppView';

class AppController {
  constructor(public view: AppView, public model: AppModel) {}
}

export default AppController;
