import AppController from './modules/AppController';
import AppModel from './modules/AppModel';
import AppView from './modules/AppView';
import AuthController from './modules/Auth/AuthController';
import AuthView from './modules/Auth/AuthView';
import BookController from './modules/Book/BookController';
import BookView from './modules/Book/BookView';
import BookCardController from './modules/Book/Card/BookCardController';
import BookCardView from './modules/Book/Card/BookCardView';
import Router from './modules/Router';

const auth = new AuthController(new AuthView(), new AppModel());

const book = new BookController(new BookView(), new AppModel());
const bookCard = new BookCardController(new BookCardView(), new AppModel());
book.card = bookCard;

const app = new AppController(new AppView(), new AppModel());
app.auth = auth;
app.book = book;

app.displayPage();

const router = new Router();
router.init();
router.add('', app);
router.add('book', book);
router.add('auth', auth);
