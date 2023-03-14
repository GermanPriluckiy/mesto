export default class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;

  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.places__card')
      .cloneNode(true);

    return card;
  }

  //Функция удаления карточки
  _removeCard = () => {
    this._element.remove();
    this._element = null;

  }
  //Функция лайка карточки
  _likeCard = () => {
    this._likeButton.classList.toggle('like-btn_status_active');

  }
  //Вешаем слушатели

  _addEventListeners() {

    this._element.querySelector('.delete-btn').addEventListener('click', this._removeCard);
    this._likeButton.addEventListener('click', this._likeCard);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

  }
  //Создание карточки
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.places__card-photo');
    this._likeButton = this._element.querySelector('.like-btn');
    this._element.querySelector('.places__card-title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._addEventListeners();

    return this._element;
  }

}



