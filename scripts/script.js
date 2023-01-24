const initialCards = [
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

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const editBtn = profile.querySelector('.profile__edit-btn');
const addBtn = profile.querySelector('.add-btn');

const popupCardView = document.querySelector('#popup-card-view');
const cardView = popupCardView.querySelector('.card-view');
const viewCloseBtn = cardView.querySelector('.card-view__close-btn');
const cardViewPhoto = cardView.querySelector('.card-view__photo');
const cardViewTitle = cardView.querySelector('.card-view__title');

const popupProfileEdit = document.querySelector('#popup-profile-edit');
const profileEdit = popupProfileEdit.querySelector('.profile-edit');
const closeBtn = popupProfileEdit.querySelector('.profile-edit__close-btn');
const inputName = popupProfileEdit.querySelector('#name');
const inputJob = popupProfileEdit.querySelector('#job');

const popupAddCard = document.querySelector('#popup-add-card');
const addCard = popupAddCard.querySelector('.add-card');
const closeBtnCard = addCard.querySelector('.add-card__close-btn');
const inputCard = addCard.querySelector('#placeCard');
const inputUrl = addCard.querySelector('#placeUrl');
const createBtn = addCard.querySelector('.add-card__save-btn');

const places = document.querySelector('.places');

//Начальный рендеринг
const createCard = (cardInfo) => {
  const template = `
  <div class="places__card">
    <img class="places__card-photo">
    <div class="places__card-footer">
      <h2 class="places__card-title"></h2>
      <button class="like-btn" type="button"></button>
    </div>
    <button class="delete-btn" type="button"></button>
  </div>
 `;

  const container = document.createElement('div');
  container.innerHTML = template;
  container.querySelector('.places__card-title').textContent = cardInfo.name;
  container.querySelector('.places__card-photo').src = cardInfo.link;
  container.querySelector('.places__card-photo').alt = cardInfo.name;
  const card = container.firstElementChild;

  //Кнопка удаления
  const deleteBtn = container.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    card.remove();
  });

  //Кнопка лайк
  const likeBtn = container.querySelector('.like-btn');
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('like-btn_status_active');
  })

  //Просмотр фотографии
  const photoView = container.querySelector('.places__card-photo');
  photoView.addEventListener('click', (evt) => {
    popupMenuOpen(popupCardView);
    cardViewPhoto.src = cardInfo.link;
    cardViewTitle.textContent = cardInfo.name;

  });


  return container.firstElementChild;

};

const initialCard = (cardInfo) => {
  places.prepend(createCard(cardInfo));
}

initialCards.forEach( (item) => {
  initialCard(item);
});


//Открытие popup
function popupMenuOpen(item) {
  item.classList.add('popup_opened');

}

//Закрытие popup
function popupMenuClose(item) {
  item.classList.remove('popup_opened');
}

//Открытие формы редактирования
editBtn.addEventListener('click', () => {
  popupMenuOpen(popupProfileEdit);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

});

//Закрытие формы редактирования
closeBtn.addEventListener('click', () => {
  popupMenuClose(popupProfileEdit);

});

//Сохранение профиля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupMenuClose(popupProfileEdit);

}

profileEdit.addEventListener('submit', handleFormSubmit);

//Открытие формы добавления карточки
addBtn.addEventListener('click', () => {
  popupMenuOpen(popupAddCard);

});

//Закрытие формы добавления
closeBtnCard.addEventListener('click', () => {
  popupMenuClose(popupAddCard);

});

//Добавление карточки
function addFormSubmit (evt) {
  evt.preventDefault();
  const newCard = [];
  newCard.name = inputCard.value;
  newCard.link = inputUrl.value;
  initialCard(newCard);
  popupMenuClose(popupAddCard);
  inputCard.value = '';
  inputUrl.value = '';

}

addCard.addEventListener('submit', addFormSubmit);

/*Закрытие просмотра*/
viewCloseBtn.addEventListener('click', () => {
  popupMenuClose(popupCardView);
});













