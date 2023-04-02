export default class Card {
  constructor({ data, handleCardClick, handleDeleteCard, handleLikeCard }, templateSelector, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._templateSelector = templateSelector;

  }
  //Клонирование карточки по темплейту
  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.places__card')
      .cloneNode(true);

    return card;
  }
  //Получение id карточки

  getIdcard() {
    return this._id;
  }

  //Обработка like'ов

  //Проверка лайка
  isCardLike() {
    return this._likeButton.classList.contains('like-btn_status_active');
  }

  //Установка количества лайков
  setLikesValue(value) {
    this._cardLikeValue.textContent = value;
  }

  //Установка класса like
  likeCard() {
    this._likeButton.classList.add('like-btn_status_active');
  }

  //Снятие класса like
  dislikeCard() {
    this._likeButton.classList.remove('like-btn_status_active');
  }

  //Проверка like пользователя
  _isUserLikeCard() {
    for (let i = 0; i <= (this._likes.length - 1); i++) {
      if (this._likes[i]._id == this._userId) {
        this.likeCard();
      }
    }
  }

  //Удаление карточки
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  //Удаление корзины
  _removeDeleteButton() {
    this._deleteButton.remove();
    this._deleteButton = null;
  }

  //Вешаем слушатели
  _addEventListeners() {

    this._deleteButton.addEventListener('click', () => {
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
    this._deleteButton = this._element.querySelector('.delete-btn');
    this._element.querySelector('.places__card-title').textContent = this._name;
    this._cardLikeValue = this._element.querySelector('.places__card-like-value');
    this.setLikesValue(this._likes.length);
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._addEventListeners();

    if (!(this._ownerId == this._userId)) {
      this._removeDeleteButton();
    }

    this._isUserLikeCard();
    return this._element;

  }


}



