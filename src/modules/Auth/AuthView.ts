import './AuthStyle.scss';
import View from '../../core/View-auth';
import Control from '../../core/BaseElement';
import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import FormHeader from './components/form-header';
import renderPageDescTemplate from '../../components/PageDesc/_renderPageDescTemplate';

class AuthView extends View {
  public onClick!: () => void;

  private imageBlock: Control<HTMLElement>;

  public authContainer: Control<HTMLElement>;

  public formContainer: FormHeader;

  titlePage = 'Присоединяйся!';

  subtitlePage =
    'Получай дополнительные возможности приложения для более успешного изучения слов';

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
    this.imageBlock.node.innerHTML = `${renderPageDescTemplate(
      this.titlePage,
      this.subtitlePage
    )}`;

    this.formContainer = new FormHeader(this.authContainer.node);
  }
}

export default AuthView;
