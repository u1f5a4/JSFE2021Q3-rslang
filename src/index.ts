import AppController from './modules/AppController';
import AppModel from './modules/AppModel';
import AppView from './modules/AppView';
import AuthController from './modules/Auth/AuthController';
import AuthView from './modules/Auth/AuthView';
import BookController from './modules/Book/BookController';
import BookView from './modules/Book/BookView';

const auth = new AuthController(new AuthView(), new AppModel());
const book = new BookController(new BookView(), new AppModel());
const app = new AppController(new AppView(), new AppModel());
app.auth = auth;
app.book = book;

app.displayPage();

// TODO: переписать роутер в отдельный класс
// TODO: посмотреть как можно сделать рабочими стрелочки в браузере
const routes = [
  {
    name: '',
    handler: () => app.displayPage(),
  },
  {
    name: 'book',
    handler: () => book.displayPage(),
  },
  {
    name: 'auth',
    handler: () => auth.displayPage(),
  },
];

window.onpopstate = function router() {
  const currentRoutName = window.location.hash.slice(1);

  const currentRoute = routes.find((obj) => obj.name === currentRoutName);
  if (!currentRoute) throw Error('CurrentRoute root element not found');

  AppView.clear();

  currentRoute.handler();
};
