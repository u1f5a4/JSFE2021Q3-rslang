import AppModel from './modules/AppModel';
import AuthController from './modules/Auth/AuthController';
import AuthView from './modules/Auth/AuthView';
import BookController from './modules/Book/BookController';
import BookView from './modules/Book/BookView';
import BookCardController from './modules/Book/Card/BookCardController';
import BookCardView from './modules/Book/Card/BookCardView';
import Router from './modules/Router';
import HomeController from './modules/Home/HomeController';
import HomeView from './modules/Home/HomeView';
import AuthModel from './modules/Auth/AuthModel';

const auth = new AuthController(new AuthView(), new AuthModel());

const book = new BookController(new BookView(), new AppModel());
const bookCard = new BookCardController(new BookCardView(), new AppModel());
book.card = bookCard;

const home = new HomeController(new HomeView(), new AppModel());
home.displayPage();

const router = new Router();
router.init();
router.add('', () => home.displayPage());
router.add('book', () => book.displayPage());
router.add('auth', () => auth.displayPage());
router.add('book/1', () => bookCard.displayPage('0'));
router.add('book/2', () => bookCard.displayPage('1'));
router.add('book/3', () => bookCard.displayPage('2'));
router.add('book/4', () => bookCard.displayPage('3'));
router.add('book/5', () => bookCard.displayPage('4'));
router.add('book/6', () => bookCard.displayPage('5'));
router.add('book/difficult', () => bookCard.displayPage('difficult'));
