import Card from "./Card.js";
import Section from "./Section.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

import { initialCards ,validationConfig , cardContainerSelector, cardTemplate} from "./constants.js";

import '../pages/index.css';

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

const cardContainer = document.querySelector(cardContainerSelector);

//Отрисовка секции с картинками
const initialCardList = new Section({
  items : initialCards,
  renderer: (item) => {
    initialCardList.addItem(createCard(item, cardTemplate));
  }
}, cardContainerSelector);
initialCardList.renderItems();

//Создание карточки
function createCard(cardItem, template) {
  const card = new Card({
    data: cardItem,
    handleCardClick: (name, link) => {
      const popupImage = new PopupWithImage({name, link}, '#popup-card-view');
      popupImage.open();
      popupImage.setEventListeners();
    }
  },
     template);
  const cardElement = card.generateCard();
  return cardElement;
}
//Функция добавления карточки
function addFormSubmit () {

  const cardInfo = {};
  cardInfo.name = inputCard.value;
  cardInfo.link = inputUrl.value;
  initialCardList.addItem(createCard(cardInfo, '#template-card'));

}

//Форма добавления карточки
const addCardPopup = new PopupWithForm('#popup-add-card', addFormSubmit);
addCardPopup.setEventListeners();

//Открытие формы добавления
btnAddNewCard.addEventListener('click', () => {
  addCardPopup.open();
  addCardValidation.toggleButton();
});

/*Открытие профиля
btnProfileEdit.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  profileEditValidation.toggleButton();
  profileEditValidation.removeError();

});

//Сохранение профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfileEdit);

}

formProfileEdit.addEventListener('submit', handleFormSubmit);

*/
//Добавление карточки

//Валидация форм
  const addCardValidation = new FormValidator(validationConfig, formAddCard);
  addCardValidation.enableValidation();
  const profileEditValidation = new FormValidator(validationConfig, formProfileEdit);
  profileEditValidation.enableValidation();









