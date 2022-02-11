import AppModel from "../modules/AppModel";
import AuthView from "../modules/Auth/AuthView";

class AppController {
  constructor(public view: AuthView, public model: AppModel) {}
}

export default AppController;
