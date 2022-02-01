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

// TODO: event homeButton
