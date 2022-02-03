import { Word } from '../AppModel';
import AppView from '../AppView';
import './BookStyle.scss';

class BookView extends AppView {
  text: string;

  selectUnit?: HTMLSelectElement;

  selectPage?: HTMLSelectElement;

  words?: HTMLElement;

  constructor() {
    super();
    this.text = 'book view';
  }

  drawPage() {
    const p = AppView.createElement('p', 'paragraph');
    p.textContent = this.text;

    const form = this.genForm();
    this.words = AppView.createElement('div', 'app');

    this.body?.append(p, form, this.words);
  }

  genForm() {
    // TODO: придумать название для магического числа
    // это число компенсирует отображение номерации, запросы начинаются с нуля
    // TODO: доделать форму по образцу
    // образец:
    // <label for="unit-select"> Выбрать Unit:</label>
    // <select name="unit" id="unit-select">
    //   <option value="1">1 - 6</option>
    // </select>
    // <label for="number-page-select">Выбрать страницу:</label>
    // <select name="number-page" id="number-page-select">
    //   <option value="1">1 - 30</option>
    // </select>

    const labelUnit = AppView.createElement(
      'label',
      'label'
    ) as HTMLLabelElement;
    labelUnit.textContent = 'Выбрать Unit';

    this.selectUnit = AppView.createElement(
      'select',
      'select'
    ) as HTMLSelectElement;
    for (let index = 0; index < 6; index += 1) {
      const option = AppView.createElement(
        'option',
        'option'
      ) as HTMLOptionElement;
      option.value = String(index);
      option.textContent = String(index + 1); // магическое число
      this.selectUnit.append(option);
    }

    const labelPage = AppView.createElement(
      'label',
      'label'
    ) as HTMLLabelElement;
    labelPage.textContent = 'Выбрать страницу';

    this.selectPage = AppView.createElement(
      'select',
      'select'
    ) as HTMLSelectElement;
    for (let index = 0; index < 30; index += 1) {
      const option = AppView.createElement(
        'option',
        'option'
      ) as HTMLOptionElement;
      option.value = String(index);
      option.textContent = String(index + 1); // магическое число
      this.selectPage.append(option);
    }

    const div = AppView.createElement('div', 'div');
    div.append(labelUnit, this.selectUnit, labelPage, this.selectPage);

    return div;
  }

  genWords(array: Word[]) {
    this.clearApp();

    array.forEach((element) => {
      const p = AppView.createElement('p', 'paragraph');
      p.textContent = element.word;
      this.words?.append(p);
    });
  }

  clearApp() {
    const app = this.body?.querySelector('.app');
    if (!app) return;

    while (app?.firstChild) {
      app.removeChild(app.firstChild);
    }
  }
}

export default BookView;
