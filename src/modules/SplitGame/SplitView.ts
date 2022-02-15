import View from '../../core/View-auth';
import renderPageDescTemplate from '../../сomponents/PageDesc/_renderPageDescTemplate';

export default class SplitView extends View {
  titlePage = 'Сплит';

  subtitlePage = 'Выбери уровень сложности';

  constructor() {
    super('div', '');
    this.node.innerHTML = `${renderPageDescTemplate(
      this.titlePage,
      this.subtitlePage
    )}`;
  }
}
