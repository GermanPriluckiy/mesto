import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import { validationConfig , cardContainerSelector, cardTemplate, formProfileEdit, inputName, inputDescription,
  btnProfileEdit, btnAddNewCard, profileName, profileDescription, profileAvatar, formAddCard, formEditAvatar, profileAvatarContainer} from "../constants.js";

import './index.css';

//Создание класса API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'fb1dd89b-c9d8-42c1-9b31-0a9e63faa62a',
    'Content-Type': 'application/json'
  }
});

//Отрисовка секции с картинками

const initialCards = api.getInitialCards();
initialCards
.then(data => {
  const initialCardList = new Section({
    items : data.reverse(),
    renderer: (item) => {
      initialCardList.addItem(createCard(item, cardTemplate));
    }
  }, cardContainerSelector);
  initialCardList.renderItems();

});

//Класс popup просмотра
const popupImage = new PopupWithImage('#popup-card-view');
popupImage.setEventListeners();

//Создание карточки
function createCard(cardItem, template) {
  const card = new Card({
    data: cardItem,
    handleCardClick: () => {
      popupImage.open(cardItem);

    }
  },
     template);
  const cardElement = card.generateCard();
  return cardElement;

}
//Функция добавления карточки
function handleAddFormSubmit (cardInfo) {
  const name = cardInfo.cardPlaceInput;
  const link = cardInfo.cardUrlInput;
  initialCards.addItem(createCard({name, link}, '#template-card'));

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

const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

//Сохранение профиля
function handleEditFormSubmit(newUserInfo) {
  userInfo.setUserInfo(newUserInfo.nameInput, newUserInfo.descriptionInput);

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

  const editAvatarValidation = new FormValidator(validationConfig, formEditAvatar);
  editAvatarValidation.enableValidation();


//Форма обновления аватара
const editAvatarPopup = new PopupWithForm('#popup-edit-avatar', handleAddFormSubmit);
editAvatarPopup.setEventListeners();

console.log(editAvatarPopup);

//Открытие формы добавления
profileAvatarContainer.addEventListener('click', () => {
  editAvatarPopup.open();
  editAvatarValidation.toggleButton();
  editAvatarValidation.removeError();
});


//Информация о пользователе с сервера
const userInfoFromServer = api.getUserInfoFromServer();

userInfoFromServer
.then(data => {
  userInfo.setUserInfo(data.name, data.about);
  userInfo.setUserAvatar(data.avatar);

});






