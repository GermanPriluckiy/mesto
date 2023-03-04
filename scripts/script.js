import Card from "./Card.js";
import initialCards from "./initial.js";
import FormValidator from "./FormValidator.js";
import validationConfig from "./validationConf.js";


const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const btnProfileEdit = profile.querySelector('.profile__edit-btn');
const btnAddNewCard = profile.querySelector('.add-btn');

const popupAddCard = document.querySelector('#popup-add-card');
const formAddCard = popupAddCard.querySelector('#add-card');
const popupProfileEdit = document.querySelector('#popup-profile-edit');
const formProfileEdit = popupProfileEdit.querySelector('#profile-edit');
const inputName = popupProfileEdit.querySelector('#input-name');
const inputJob = popupProfileEdit.querySelector('#input-job');

const inputCard = formAddCard.querySelector('#input-place');
const inputUrl = formAddCard.querySelector('#input-url');
const popupCardView = document.querySelector('#popup-card-view');
const cardView = document.querySelector('.card-view');

const places = document.querySelector('.places');
const popupList = Array.from(document.querySelectorAll('.popup'));

//Начальный рендеринг
function createCard(cardItem, template) {
  const card = new Card(cardItem, template, handleOpenPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  places.prepend(createCard(item, '#template-card'));
});



//Открытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);

}

//Закрытие popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  profileEditValidation.resetInputError();
  profileEditValidation.removeСlassOnExit();

}
//Открытие просмотра картинки
function handleOpenPopup(name, link) {
  cardView.querySelector('.card-view__photo').src = link;
  cardView.querySelector('.card-view__photo').alt = name;
  cardView.querySelector('.card-view__title').textContent = name;
  openPopup(popupCardView);
}

//Открытие профиля
btnProfileEdit.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  profileEditValidation.enableButton();

});

//Сохранение профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfileEdit);

}

formProfileEdit.addEventListener('submit', handleFormSubmit);

//Закрытие клавишей
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
}


//Открытие формы добавления карточки
btnAddNewCard.addEventListener('click', (evt) => {
  openPopup(popupAddCard);
  addCardValidation.toggleButton();
});


//Добавление карточки
function addFormSubmit(evt) {
  evt.preventDefault();
  const cardInfo = [];
  cardInfo.name = inputCard.value;
  cardInfo.link = inputUrl.value;
  const newCard = new Card(cardInfo, '#template-card');
  const newCardElement = newCard.generateCard();
  places.prepend(newCardElement);
  closePopup(popupAddCard);
  inputCard.value = '';
  inputUrl.value = '';

}

formAddCard.addEventListener('submit', addFormSubmit);

//Закрытие окон через крестик и нажатие overlay
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});

//Валидация форм
  const addCardValidation = new FormValidator(validationConfig, formAddCard);
  addCardValidation.enableValidation();
  const profileEditValidation = new FormValidator(validationConfig, formProfileEdit);
  profileEditValidation.enableValidation();









