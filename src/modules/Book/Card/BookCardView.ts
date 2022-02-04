import AppView from '../../../core/View';

class BookCardView extends AppView {
  group?: string;

  word?: string;

  page!: number;

  async drawCardPage(group: string, word: string, page: number) {
    this.clearApp();

    this.group = group;
    this.word = word;
    this.page = page;

    document.location.href = `${document.location.origin}/#book/group-${group}`;
    this.body!.innerHTML = this.getHtml();
  }

  // eslint-disable-next-line class-methods-use-this
  getHtml(): string {
    const ZeroCountCompensation = 1;
    return `
                      <h2>Группа слов #${this.group}</h2>
                      <button id="prev-word">prev word</button>
                      <p id="en-word">${this.word}</p>
                      <p id='count-word'>1/20</p>
                      <button id="next-word">next word</button>
                      <br><br><br><br>
                      <button id="prev-page">prev page</button>
                      <p id="num-page">${
                        this.page + ZeroCountCompensation
                      }/30</p>
                      <button id="next-page">next page</button>
    `;
  }

  clearApp() {
    const app = this.body?.querySelector('.app');
    if (!app) return;

    while (app?.firstChild) {
      app.removeChild(app.firstChild);
    }
  }
}

export default BookCardView;
