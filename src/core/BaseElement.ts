export default class Control<NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor(
    parentNode: HTMLElement | null,
    tagName = 'div',
    className = '',
    content = ''
  ) {
    const el = document.createElement(tagName);
    el.className = className;
    el.textContent = content;
    if (parentNode) {
      parentNode.append(el);
    }
    this.node = el as NodeType;
  }

  public drawPage(): NodeType {
    return this.node;
  }

  public destroy(): void {
    this.node.remove();
  }
}
