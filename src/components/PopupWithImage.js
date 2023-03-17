import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardView = this._popup.querySelector('.card-view');
    this._cardImage = this._cardView.querySelector('.card-view__photo');
    this._cardTitle = this._cardView.querySelector('.card-view__title');

  }

  open(data) {
    super.open();
    this._cardImage.src = data.link;
    this._cardImage.alt = data.name;
    this._cardTitle.textContent = data.name;
  }

}
