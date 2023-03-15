import Popup from "./Popup.js";
import { cardView } from "../constants.js";

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;

  }

  open() {
    super.open();
    cardView.querySelector('.card-view__photo').src = this._link;
    cardView.querySelector('.card-view__photo').alt = this._name;
    cardView.querySelector('.card-view__title').textContent = this._name;
  }

}
