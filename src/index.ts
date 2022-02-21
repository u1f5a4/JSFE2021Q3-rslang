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
import AudioCallController from './modules/AudioCall/AudioCallController';
import AudioCallView from './modules/AudioCall/AudioCallView';
import AudioCallGameController from './modules/AudioCall/AudioCallGame/AudioCallGameController';
import AudioCallGameView from './modules/AudioCall/AudioCallGame/AudioCallGameView';
import AuthModel from './modules/Auth/AuthModel';
import GamesController from './modules/Games/GamesController';
import GamesView from './modules/Games/GamesView';
import StatController from './modules/Stat/StatController';
import StatView from './modules/Stat/StatView';
import SprintController from './modules/SprintGame/SprintController';
import SprintView from './modules/SprintGame/SprintView';
import AboutTeamView from './modules/AboutTeam/AboutTeamView';
import AboutTeamController from './modules/AboutTeam/AboutTeamController';

const audioCall = new AudioCallController(new AudioCallView(), new AppModel());
const audioCallGame = new AudioCallGameController(
  new AudioCallGameView(),
  new AppModel()
);

const sprint = new SprintController(new SprintView(), new AppModel());

const games = new GamesController(new GamesView(), new AppModel());

const auth = new AuthController(new AuthView(), new AuthModel());
auth.appModel = new AppModel();

const stat = new StatController(new StatView(), new AppModel());

const book = new BookController(new BookView(), new AppModel());
const bookCard = new BookCardController(new BookCardView(), new AppModel());
book.card = bookCard;
bookCard.audioGame = audioCallGame;

const home = new HomeController(new HomeView(), new AppModel());
const team = new AboutTeamController(new AboutTeamView(), new AppModel());

const router = new Router();
router.init();

router.add('', () => home.displayPage());
router.add('auth', () => auth.displayPage());
router.add('stat', () => stat.displayPage());
router.add('team', () => team.displayPage());

router.add('book', () => book.displayPage());
router.add('book/1', () => bookCard.displayPage('0'));
router.add('book/2', () => bookCard.displayPage('1'));
router.add('book/3', () => bookCard.displayPage('2'));
router.add('book/4', () => bookCard.displayPage('3'));
router.add('book/5', () => bookCard.displayPage('4'));
router.add('book/6', () => bookCard.displayPage('5'));
router.add('book/difficult', () => bookCard.displayPage('difficult'));

router.add('games', () => games.displayPage());
router.add('audio-game', () => audioCall.displayPage());
router.add('audio-game/0', () => audioCallGame.displayPage('0', 'random'));
router.add('audio-game/1', () => audioCallGame.displayPage('1', 'random'));
router.add('audio-game/2', () => audioCallGame.displayPage('2', 'random'));
router.add('audio-game/3', () => audioCallGame.displayPage('3', 'random'));
router.add('audio-game/4', () => audioCallGame.displayPage('4', 'random'));
router.add('audio-game/5', () => audioCallGame.displayPage('5', 'random'));
router.add('sprint', () => sprint.displayPage());

router.add('sprint-game', () => sprint.displayPage());
router.add('sprint-game/0', () => sprint.playGame('0', 'random'));
router.add('sprint-game/1', () => sprint.playGame('1', 'random'));
router.add('sprint-game/2', () => sprint.playGame('2', 'random'));
router.add('sprint-game/3', () => sprint.playGame('3', 'random'));
router.add('sprint-game/4', () => sprint.playGame('4', 'random'));
router.add('sprint-game/5', () => sprint.playGame('5', 'random'));

window.addEventListener('load', () => {
  const { hash } = window.location;
  if (!hash) home.displayPage();
  router.go();
});
