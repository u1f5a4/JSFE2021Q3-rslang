// eslint-disable-next-line import/no-cycle
import AppController from '../AppController';
import AppModel from '../AppModel';
import BookView from './BookView';

class BookController extends AppController {
  view: BookView;

  constructor(view: BookView, model: AppModel) {
    super(view, model);
    this.view = view;
    this.model = model;
  }

  async displayPage() {
    this.view.drawPage();
    await this.genWords();

    this.view.selectUnit?.addEventListener('change', this.genWords);
    this.view.selectPage?.addEventListener('change', this.genWords);
  }

  genWords = async () => {
    // TODO: переделать в обычную функцию, для этого нужно изменить контекст this
    const unit = Number(this.view.selectUnit!.value);
    const page = Number(this.view.selectPage!.value);

    const words = await this.model.getWords(unit, page);
    this.view.genWords(words);
  };
}

export default BookController;
