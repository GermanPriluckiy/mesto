import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithDelete from "../components/PopupWithDelete.js";

import {
  validationConfig, cardContainerSelector, cardTemplate, formProfileEdit, inputName, inputDescription,
  btnProfileEdit, btnAddNewCard, profileName, profileDescription, profileAvatar, formAddCard, formEditAvatar, profileAvatarContainer
} from "../constants.js";

import './index.css';

//Создание класса API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'fb1dd89b-c9d8-42c1-9b31-0a9e63faa62a',
    'Content-Type': 'application/json'
  }
});

//мой айдишник '6740cceb6c0f0e5813047155'

//Создание класса Section
const initialCardList = new Section({
  renderer: (item) => {
      const userId = userInfo.getUserId();
      initialCardList.addItem(createCard(item, cardTemplate, userId));
    }

}, cardContainerSelector);

//Получение начальных данных
Promise.all([
  api.getUserInfoFromServer(),
  api.getInitialCards()

])
  .then((values) => {

    userInfo.setUserInfo(values[0].name, values[0].about);
    userInfo.setUserAvatar(values[0].avatar);
    userInfo.setUserId(values[0]._id);
    initialCardList.renderItems(values[1]);


  })

  .catch((err) => {
    console.log(err);
  })


//Функция создания карточки
function createCard(cardItem, template, userId) {
  const card = new Card({
    data: cardItem,
    //Просмотр карточки
    handleCardClick: () => {
      popupImage.open(cardItem);

    },
    //Удаление карточки
    handleDeleteCard: () => {
      popupDeleteCard.open(card.getIdcard(), card);

    },
    //Like карточки
    handleLikeCard: () => {
      if (card.isCardLike()) {
        api.dislikeCard(card.getIdcard())
          .then(data => {
            card.setLikesValue(data.likes.length);
            card.dislikeCard();

          })
          .catch((err) => {
            console.log(err);
          });
      }
      else {
        api.likeCard(card.getIdcard())
          .then(data => {
            card.setLikesValue(data.likes.length);
            card.likeCard();

          })
          .catch((err) => {
            console.log(err);
          });
      }

    }
  },
    template,
    userId
  );

    const cardElement = card.generateCard();
    return cardElement;

}

//Функция добавления карточки
function handleAddFormSubmit(cardInfo) {
  const name = cardInfo.cardPlaceInput;
  const link = cardInfo.cardUrlInput;
  api.addNewCard(name, link)
    .then(data => {
      const userId = userInfo.getUserId();
      initialCardList.addItem(createCard(data, cardTemplate, userId));
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
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
      cardElement.removeCard();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {

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
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
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
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
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









