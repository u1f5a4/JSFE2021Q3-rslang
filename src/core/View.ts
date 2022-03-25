class AppView {
  body = document.querySelector('body');

  titlemain = 'RS Lang – ';

  titlePage = 'abstract view';

  drawPage() {
    document.title = this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  // eslint-disable-next-line class-methods-use-this
  getHtml(): string {
    return ``;
  }

  static clear() {
    const body = document.querySelector('body');
    while (body?.firstChild) {
      body.removeChild(body.firstChild);
    }
  }

  static createElement(tag: string, className: string): HTMLElement {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    return elem;
  }
}

export default AppView;
