export default class Card {
  constructor({data, handleCardClick}, templateSelector, api, popupDeleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._api = api;
    this._popupDeleteCard = popupDeleteCard;

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
    this._popupDeleteCard.open(this._id, this._element);

  }
  //Функция лайка карточки
  _likeCard = () =>  {
    if (this._likeButton.classList.contains('like-btn_status_active')) {
      this._api.dislikeCard(this._id)
      .then(data => {
        this._element.querySelector('.places__card-like-value').textContent = data.likes.length;
        this._likeButton.classList.remove('like-btn_status_active');

      })
      .catch((err) => {
        console.log(err);
      });
    }
    else {
    this._api.likeCard(this._id)
    .then(data => {
      this._element.querySelector('.places__card-like-value').textContent = data.likes.length;
      this._likeButton.classList.add('like-btn_status_active');

    })
    .catch((err) => {
      console.log(err);
    });
  }

  }

  //Вешаем слушатели

  _addEventListeners() {

    this._element.querySelector('.delete-btn').addEventListener('click', this._removeCard);
    this._likeButton.addEventListener('click', this._likeCard);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
      console.log(this._id);
    });

  }
  //Создание карточки
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.places__card-photo');
    this._likeButton = this._element.querySelector('.like-btn');
    this._element.querySelector('.places__card-title').textContent = this._name;
    this._element.querySelector('.places__card-like-value').textContent = this._likes.length;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._addEventListeners();
    return this._element;
  }

}



