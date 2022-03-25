import AppView from '../core/View';

type Path = {
  path: string;
  handler: () => void;
};

class Router {
  paths: Path[];

  constructor() {
    this.paths = [];
  }

  add(path: string, handler: () => void) {
    this.paths.push({ path, handler });
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

  go() {
    const currentRoutName = window.location.hash.slice(1);

    const currentRoute = this.paths.find(
      (obj: Path) => obj.path === currentRoutName
    );

    if (!currentRoute) return;
    AppView.clear();

    currentRoute!.handler();
  }
}

export default Router;
