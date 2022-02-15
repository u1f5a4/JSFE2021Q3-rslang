export default class InputControl<
  NodeType extends HTMLElement = HTMLInputElement
> {
  public node: NodeType;

  constructor(
    parentNode: HTMLElement | null,
    tagName = 'div',
    className = '',
    min = '',
    type = '',
    valuePlaceHolder = ''
  ) {
    const el = document.createElement(tagName);
    el.className = className;
    // el.setAttribute('type', value);
    el.setAttribute('placeholder', valuePlaceHolder);
    el.setAttribute('required', 'true');
    el.setAttribute('min', min);
    el.setAttribute('type', type);
    if (parentNode) {
      parentNode.append(el);
    }
    this.node = el as NodeType;
  }

  public destroy(): void {
    this.node.remove();
  }
}
