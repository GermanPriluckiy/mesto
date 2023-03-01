import Card from "./Card.js";

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const btnProfileEdit = profile.querySelector('.profile__edit-btn');
const btnAddNewCard = profile.querySelector('.add-btn');

const popupProfileEdit = document.querySelector('#popup-profile-edit');
const profileEdit = popupProfileEdit.querySelector('#profile-edit');
const inputName = popupProfileEdit.querySelector('#input-name');
const inputJob = popupProfileEdit.querySelector('#input-job');
const btnSaveEdit = profileEdit.querySelector('#edit-button-save');

const popupAddCard = document.querySelector('#popup-add-card');
const formPopupCard = popupAddCard.querySelector('#add-card');
const inputCard = formPopupCard.querySelector('#input-place');
const inputUrl = formPopupCard.querySelector('#input-url');
const buttonAddCard = popupAddCard.querySelector('#add-card-button-save');

const places = document.querySelector('.places');
const popupList = Array.from(document.querySelectorAll('.popup'));

//Начальный рендеринг
initialCards.forEach( (item) => {
  const card = new Card(item, '#template-card');
  const cardElement = card.generateCard();
  places.prepend(cardElement);
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

}

//Открытие профиля
btnProfileEdit.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  btnSaveEdit.disabled = false;
  btnSaveEdit.classList.remove('popup__button_disabled');

});

//Сохранение профиля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfileEdit);

}

profileEdit.addEventListener('submit', handleFormSubmit);

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
  //const isFormValid = formPopupCard.checkValidity();
  inputCard.value = '';
  inputUrl.value = '';

  /*buttonAddCard.disabled = !isFormValid;
  buttonAddCard.classList.toggle('popup__button_disabled', !isFormValid);*/

});


//Добавление карточки
function addFormSubmit (evt) {
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

formPopupCard.addEventListener('submit', addFormSubmit);

//Закрытие окон через крестик и нажатие overlay
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup);
      }

      if (evt.target.classList.contains('popup__button-close')) {
        closePopup(popup);
      }

       if (evt.target.classList.contains('card-view__close-btn')) {
      closePopup(popup);
      }
  });
});










