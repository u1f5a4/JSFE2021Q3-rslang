import AppController from './modules/AppController';
import AppView from './modules/AppView';

// TODO: посмотреть как можно сделать рабочими стрелочки в браузере

type Path = {
  path: string;
  handler: () => void;
};

class Router {
  paths: Path[];

  constructor() {
    this.paths = [];
  }

  add(path: string, controller: AppController) {
    this.paths.push({ path, handler: () => controller.displayPage() });
  }

  init() {
    const { paths } = this;

    window.onpopstate = function router() {
      const currentRoutName = window.location.hash.slice(1);

      const currentRoute = paths.find(
        (obj: Path) => obj.path === currentRoutName
      );

      if (!currentRoute) return;

      AppView.clear();

      currentRoute.handler();
    };
  }
}

export default Router;
