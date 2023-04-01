export default class Card {
  constructor({data, handleCardClick, handleDeleteCard, handleLikeCard}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
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

  //Удаление карточки
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  //Удаление корзины
  _removeDeleteButton() {
    this._element.querySelector('.delete-btn').classList.add('delete-btn_status_inactive');
    this._element.querySelector('.delete-btn').removeEventListener('click', () => {
      this._handleDeleteCard(this._id);
    });

  }

  //Вешаем слушатели

  _addEventListeners() {

    this._element.querySelector('.delete-btn').addEventListener('click', () => {
      this._handleDeleteCard(this._id);
    });

     this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this._likeButton, this._id, this._likeValue);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);

    });

  }
  //Создание карточки
  generateCard() {
    this._element = this._getTemplate();
    this._likeValue = this._element.querySelector('.places__card-like-value');
    this._cardImage = this._element.querySelector('.places__card-photo');
    this._likeButton = this._element.querySelector('.like-btn');
    this._element.querySelector('.places__card-title').textContent = this._name;
    this._element.querySelector('.places__card-like-value').textContent = this._likes.length;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._addEventListeners();
    return this._element;

  }

  //Создание карточки без удаления
  generateCardWithoutDelete() {
    this._element = this._getTemplate();
    this._likeValue = this._element.querySelector('.places__card-like-value');
    this._cardImage = this._element.querySelector('.places__card-photo');
    this._likeButton = this._element.querySelector('.like-btn');
    this._element.querySelector('.places__card-title').textContent = this._name;
    this._element.querySelector('.places__card-like-value').textContent = this._likes.length;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._addEventListeners();
    this._removeDeleteButton();
    return this._element;

  }
}



