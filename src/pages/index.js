import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithDelete from "../components/PopupWithDelete.js";

import { validationConfig , cardContainerSelector, cardTemplate, cardTemplateWithoutDelete, formProfileEdit, inputName, inputDescription,
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
      if(item.owner._id == '6740cceb6c0f0e5813047155') {
        initialCardList.addItem(createCard(item, cardTemplate, api, popupDeleteCard));
      }
      else {
      initialCardList.addItem(createCard(item, cardTemplateWithoutDelete, api, popupDeleteCard));
      }
    }
  }, cardContainerSelector);
  initialCardList.renderItems();

})
.catch((err) => {
  console.log(err);
});

//Функция создания карточки
function createCard(cardItem, template) {
  const card = new Card({
    data: cardItem,
    handleCardClick: () => {
      popupImage.open(cardItem);

    }
  },
     template,
     api,
     popupDeleteCard);
  const cardElement = card.generateCard();
  return cardElement;

}

//Функция добавления карточки
function handleAddFormSubmit (cardInfo) {
  const name = cardInfo.cardPlaceInput;
  const link = cardInfo.cardUrlInput;
  api.addNewCard(name, link)
  .then(data => {
    document.querySelector(cardContainerSelector).prepend(createCard(data, cardTemplate, api));

  })
  .catch((err) => {
    console.log(err);
  })
  .finally( () => {
    addCardPopup.renderLoadingFalse('Создать');
  });

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

//Класс popup просмотра
const popupImage = new PopupWithImage('#popup-card-view');
popupImage.setEventListeners();


//Удаление карточки
function deleteCardFormSubmit(cardId, cardElement) {
  api.deleteCard(cardId)
  .then(data => {
    console.log(data);
    cardElement.remove();
    cardElement = null;

  })
  .catch((err) => {
    console.log(err);
  });

}
//Форма удаления карточки
const popupDeleteCard = new PopupWithDelete('#popup-delete-card', deleteCardFormSubmit);
popupDeleteCard.setEventListeners();


//Форма редактирования и класс информации пользователя
const editProfilePopup = new PopupWithForm('#popup-profile-edit', handleEditFormSubmit);

editProfilePopup.setEventListeners();

const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

//Функция сохранения профиля
function handleEditFormSubmit(newUserInfo) {
  api.setUserInfo(newUserInfo.nameInput, newUserInfo.descriptionInput)
  .then(data => {
    userInfo.setUserInfo(data.name, data.about)

  })
  .catch((err) => {
    console.log(err);
  })
  .finally( () => {
    editProfilePopup.renderLoadingFalse('Сохранить');
  });

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

//Функция обновления аватара
function handleAvatarFormSubmit(link) {
  api.updateAvatar(link.avatarUrlInput)
  .then(data => {
    userInfo.setUserAvatar(data.avatar);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally( () => {
    editAvatarPopup.renderLoadingFalse('Сохранить');
  });

}
//Форма обновления аватара
const editAvatarPopup = new PopupWithForm('#popup-edit-avatar', handleAvatarFormSubmit);
editAvatarPopup.setEventListeners();

//Открытие формы обновления аватара
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
  userInfo.setUserId(data._id);

})
.catch((err) => {
  console.log(err);
});






