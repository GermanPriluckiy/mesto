import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import { initialCards ,validationConfig , cardContainerSelector, cardTemplate, formProfileEdit, inputName, inputDescription,
  btnProfileEdit, btnAddNewCard, profileName, profileDescription, formAddCard, inputCard, inputUrl } from "../constants.js";

import './index.css';

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
function handleAddFormSubmit () {

  const cardInfo = {};
  cardInfo.name = inputCard.value;
  cardInfo.link = inputUrl.value;
  initialCardList.addItem(createCard(cardInfo, '#template-card'));

}

//Форма добавления карточки
const addCardPopup = new PopupWithForm('#popup-add-card', handleAddFormSubmit);
addCardPopup.setEventListeners();

//Открытие формы добавления
btnAddNewCard.addEventListener('click', () => {
  addCardPopup.open();
  addCardValidation.toggleButton();
  addCardValidation.removeError();
});
//Форма редактирования и класс информации пользователя
const editProfilePopup = new PopupWithForm('#popup-profile-edit', handleEditFormSubmit);
editProfilePopup.setEventListeners();
const userInfo = new UserInfo(profileName, profileDescription);

//Сохранение профиля
function handleEditFormSubmit() {
  userInfo.setUserInfo(inputName.value, inputDescription.value);

}

//Открытие формы редактирования
btnProfileEdit.addEventListener('click', () => {
  editProfilePopup.open();
  const userInformation = userInfo.getUserInfo();
  profileEditValidation.removeError();
  inputDescription.value = userInformation.profileDescription;
  inputName.value = userInformation.profileName;
  profileEditValidation.toggleButton();
});

//Валидация форм
  const addCardValidation = new FormValidator(validationConfig, formAddCard);
  addCardValidation.enableValidation();
  const profileEditValidation = new FormValidator(validationConfig, formProfileEdit);
  profileEditValidation.enableValidation();









