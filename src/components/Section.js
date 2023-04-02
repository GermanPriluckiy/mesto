export default class Section {
  constructor({ renderer }, containerSeceltor) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSeceltor);
  }

  renderItems(items) {
    items.forEach(element => {
      this._renderer(element);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

