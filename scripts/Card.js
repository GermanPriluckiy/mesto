class Card {
  constructor (data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
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
  //Открытие popup просмотра
  _handleOpenPopup = () => {
    document.querySelector('#popup-card-view').classList.toggle('popup_opened');
    this._fillCard(this._name, this._link);

  }
  //Заполнение popup просмотра
  _fillCard(name, link) {
    const cardView = document.querySelector('.card-view')
    cardView.querySelector('.card-view__photo').src = link;
    cardView.querySelector('.card-view__photo').alt = name;
    cardView.querySelector('.card-view__title').textContent = name;

  }

  //Функция удаления карточки
  _removeCard = () => {
    this._element.remove();

  }
  //Функция лайка карточки
  _likeCard = () => {
    this._element.querySelector('.like-btn').classList.toggle('like-btn_status_active');

  }
  //Вешаем слушатели

  _addEventListeners() {

    this._element.querySelector('.delete-btn').addEventListener('click', this._removeCard);
    this._element.querySelector('.like-btn').addEventListener('click', this._likeCard);
    this._element.querySelector('.places__card-photo').addEventListener('click', this._handleOpenPopup);

  }
  //Создание карточки
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.places__card-title').textContent = this._name;
    this._element.querySelector('.places__card-photo').src = this._link;
    this._element.querySelector('.places__card-photo').alt = this._name;

    this._addEventListeners();

    return this._element;
  }

}

export default Card;

