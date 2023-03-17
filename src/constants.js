export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__error'
}

export const cardContainerSelector = '.places';
export const cardTemplate = '#template-card';

export const formProfileEdit = document.querySelector('#profile-edit');
export const inputName = formProfileEdit.querySelector('#input-name');
export const inputDescription = formProfileEdit.querySelector('#input-description');

export const profile = document.querySelector('.profile');
export const btnProfileEdit = profile.querySelector('.profile__edit-btn');
export const btnAddNewCard = profile.querySelector('.add-btn');

export const profileName = '.profile__name';
export const profileDescription = '.profile__description';

export const popupAddCard = document.querySelector('#popup-add-card');
export const formAddCard = popupAddCard.querySelector('#add-card');

export const inputCard = formAddCard.querySelector('#input-place');
export const inputUrl = formAddCard.querySelector('#input-url');


