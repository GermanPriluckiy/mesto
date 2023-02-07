const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const btnProfileEdit = profile.querySelector('.profile__edit-btn');
const btnAddNewCard = profile.querySelector('.add-btn');

const popupCardView = document.querySelector('#popup-card-view');
const cardView = popupCardView.querySelector('.card-view');
const btnViewClose = cardView.querySelector('.card-view__close-btn');
const cardViewPhoto = cardView.querySelector('.card-view__photo');
const cardViewTitle = cardView.querySelector('.card-view__title');

const popupProfileEdit = document.querySelector('#popup-profile-edit');
const profileEdit = popupProfileEdit.querySelector('#profile-edit');
const btnCloseProfileEdit = popupProfileEdit.querySelector('#edit-button-close');
const inputName = popupProfileEdit.querySelector('#input-name');
const inputJob = popupProfileEdit.querySelector('#input-job');
const btnSaveEdit = profileEdit.querySelector('#edit-button-save');

const popupAddCard = document.querySelector('#popup-add-card');
const formPopupCard = popupAddCard.querySelector('#add-card');
const btnCloseCard = formPopupCard.querySelector('#add-card-button-close');
const inputCard = formPopupCard.querySelector('#input-place');
const inputUrl = formPopupCard.querySelector('#input-url');

const places = document.querySelector('.places');
const popupList = Array.from(document.querySelectorAll('.popup'));

//Закрытие popup кликом на overlay
popupList.forEach( (popupElement) => {

  popupElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popupElement);
    }
  });
});

//Закрытие popup клавишей Escape
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
});


//Начальный рендеринг
const createCard = (cardInfo) => {
  const templateCard = document.querySelector('#template-card').content;
  const card = templateCard.querySelector('.places__card').cloneNode(true);

  card.querySelector('.places__card-title').textContent = cardInfo.name;
  card.querySelector('.places__card-photo').src = cardInfo.link;
  card.querySelector('.places__card-photo').alt = cardInfo.name;


  //Кнопка удаления
  const deleteBtn = card.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    card.remove();
  });

  //Кнопка лайк
  const likeBtn = card.querySelector('.like-btn');
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('like-btn_status_active');
  })

  //Просмотр фотографии
  const photoView = card.querySelector('.places__card-photo');
  photoView.addEventListener('click', (evt) => {
    openPopup(popupCardView);
    cardViewPhoto.src = cardInfo.link;
    cardViewTitle.textContent = cardInfo.name;
    cardViewPhoto.alt = cardInfo.name;

  });


  return card;

};

const renderCard = (cardInfo) => {
  places.prepend(createCard(cardInfo));
}

initialCards.forEach( (item) => {
  renderCard(item);
});


//Открытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');

}

//Закрытие popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Открытие формы редактирования
btnProfileEdit.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  btnSaveEdit.disabled = false;
  btnSaveEdit.classList.remove('popup__button_disabled');

});

//Закрытие формы редактирования
btnCloseProfileEdit.addEventListener('click', () => {
  closePopup(popupProfileEdit);

});

//Сохранение профиля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfileEdit);

}

profileEdit.addEventListener('submit', handleFormSubmit);

//Открытие формы добавления карточки
btnAddNewCard.addEventListener('click', () => {
  openPopup(popupAddCard);

});

//Закрытие формы добавления
btnCloseCard.addEventListener('click', () => {
  closePopup(popupAddCard);
  inputCard.value = '';
  inputUrl.value = '';

});

//Добавление карточки
function addFormSubmit (evt) {
  evt.preventDefault();
  const newCard = [];
  newCard.name = inputCard.value;
  newCard.link = inputUrl.value;
  renderCard(newCard);
  closePopup(popupAddCard);
  inputCard.value = '';
  inputUrl.value = '';

}

formPopupCard.addEventListener('submit', addFormSubmit);

/*Закрытие просмотра*/
btnViewClose.addEventListener('click', () => {
  closePopup(popupCardView);
});













