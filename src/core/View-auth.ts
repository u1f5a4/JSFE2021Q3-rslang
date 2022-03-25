class View<NodeType extends HTMLElement = HTMLElement> {
  body = document.querySelector('body');

  node: NodeType;

  constructor(public tag: string, public className: string) {
    const el = document.createElement(tag);
    el.classList.add(className);
    this.node = el as NodeType;
  }

  drawPage() {
    this.body!.appendChild(this.node);
    this.body?.insertAdjacentHTML('beforeend', '');
  }

  public destroy(): void {
    this.node.remove();
  }
}

export default View;
