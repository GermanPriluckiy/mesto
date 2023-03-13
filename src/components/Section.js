export default class Section {
  constructor({items, renderer}, containerSeceltor) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSeceltor);
  }

  renderItems() {
    this._renderedItems.forEach(element => {
      this._renderer(element);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

