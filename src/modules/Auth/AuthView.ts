import './AuthStyle.scss';
import View from '../../core/View-auth';
import Control from '../../core/BaseElement';
import renderHeaderTemplate from '../../Components/Header/renderHeaderTemplate';
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
}

export default AuthView;
