export default class Section {
  constructor({ renderer }, containerSeceltor) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSeceltor);
  }

  renderItems(items, myId) {
    items.forEach(element => {
      this._renderer(element, myId);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

