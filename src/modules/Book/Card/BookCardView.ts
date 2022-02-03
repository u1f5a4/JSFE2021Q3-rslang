import AppView from '../../AppView';
// import { Word } from '../../AppModel';

class BookCardView extends AppView {
  async drawCardPage(group: string, word: string, page: number) {
    const ZeroCountCompensation = 1;

    this.clearApp();

    document.location.href = `${document.location.origin}/#book/group-${group}`;

    const app = document.querySelector('.app');
    app!.innerHTML += `<h2>Группа слов #${group}</h2>`;

    app!.innerHTML += `<button id="prev-word">prev word</button>
                      <p id="en-word">${word}</p>
                      <p id='count-word'>1/20</p>
                      <button id="next-word">next word</button>`;

    app!.innerHTML += `<br><br><br><br>
                      <button id="prev-page">prev page</button>
                      <p id="num-page">${page + ZeroCountCompensation}/30</p>
                      <button id="next-page">next page</button>`;
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
