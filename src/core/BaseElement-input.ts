export default class InputControl<
  NodeType extends HTMLElement = HTMLInputElement
> {
  public node: NodeType;

  constructor(
    parentNode: HTMLElement | null,
    tagName = 'div',
    className = '',
    value = '',
    valuePlaceHolder = ''
  ) {
    const el = document.createElement(tagName);
    el.className = className;
    el.setAttribute('type', value);
    el.setAttribute('placeholder', valuePlaceHolder);
    el.setAttribute('required', 'true');
    if (parentNode) {
      parentNode.append(el);
    }
    this.node = el as NodeType;
  }

  public destroy(): void {
    this.node.remove();
  }
}
