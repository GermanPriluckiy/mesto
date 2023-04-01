import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup{
  constructor(popupSelector, submitForm){
    super(popupSelector);
    this._submitForm = submitForm;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');

  }

  open(cardid, cardElement) {
    super.open()
    this._cardId = cardid;
    this._cardElement = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._cardId, this._cardElement);

    });

  }

}
