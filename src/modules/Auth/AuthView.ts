import './AuthStyle.scss';
import View from '../../core/View-auth';
import Control from '../../core/BaseElement';
import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import FormHeader from './components/form-header';

class AuthView extends View {
  public onClick!: () => void;

  private imageBlock: Control<HTMLElement>;

  public authContainer: Control<HTMLElement>;

  public formContainer: FormHeader;

  constructor() {
    super('div', 'auth');
    this.node.innerHTML = `${renderHeaderTemplate()}`;
    this.authContainer = new Control(this.node, 'div', 'auth__container', '');
    this.imageBlock = new Control(
      this.authContainer.node,
      'div',
      'auth__image',
      ''
    );
    this.imageBlock.node.innerHTML =
      '<p class="auth__title text-font"><span class="title-font">Присоединяйся!</span><br> Получай дополнительные возможности приложения для более успешного изучения слов</p>';
    this.formContainer = new FormHeader(this.authContainer.node);
  }
  // =======
  // import renderFooterTemplate from '../../components/Footer/_renderFooterTemplate';
  // import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
  // import AppView from '../../core/View';
  // import css from './AuthStyle.module.scss';

  // class AuthView extends AppView {
  //   titlePage: string;

  //   constructor() {
  //     super();
  //     this.titlePage = 'Добро пожаловать';
  //   }

  //   getHtml(): string {
  //     return `
  //     <div class="">
  //             ${renderHeaderTemplate()}
  //             <div class="${css.content} ${css.wrapper}">
  //               <h2>${this.titlePage}</h2>
  //               <input id="name" type="text" placeholder="name">
  //               <input id="email" type="text" placeholder="email">
  //               <input id="password" type="text" placeholder="password">
  //               <button id="button-registration">Регистрация</button> <button id="button-signIn">Вход</button>
  //             </div>
  //             ${renderFooterTemplate()}
  //     </div>
  //         `;
  // >>>>>>> book
}

export default AuthView;
