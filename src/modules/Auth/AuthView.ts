import './AuthStyle.scss';
import View from '../../core/View-auth';
import Control from '../../core/BaseElement';

import FormHeader from './components/form-header';
import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import renderPageDescTemplate from '../../components/PageDesc/_renderPageDescTemplate';

class AuthView extends View {
  public onClick!: () => void;

  private imageBlock: Control<HTMLElement>;

  public authContainer: Control<HTMLElement>;

  public formContainer: FormHeader;

  titlePage = 'Добро пожаловать';

  subtitlePage =
    'Получай дополнительные возможности приложения для более успешного изучения слов';

  titleBlock: Control<HTMLElement>;

  constructor() {
    super('div', 'auth');
    this.node.innerHTML = `${renderHeaderTemplate()}`;
    this.imageBlock = new Control(this.node, 'div', 'auth__image', '');
    this.authContainer = new Control(
      this.imageBlock.node,
      'div',
      'auth__container',
      ''
    );
    this.titleBlock = new Control(
      this.authContainer.node,
      'div',
      'auth__title',
      ''
    );
    this.titleBlock.node.innerHTML = `${renderPageDescTemplate(
      this.titlePage,
      this.subtitlePage
    )}`;

    this.formContainer = new FormHeader(this.authContainer.node);
  }
}

export default AuthView;
