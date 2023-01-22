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
const popupContainer = document.querySelector('.popup__container');
const inputName = popupContainer.querySelector('#name');
const inputJob = popupContainer.querySelector('#job');
const editBtn = profile.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const profileEdit = popup.querySelector('.profile-edit');
const addCard = popup.querySelector('.add-card');
const addBtn = profile.querySelector('.add-btn');
const closeBtn = popupContainer.querySelector('.profile-edit__close-btn');
const closeBtnCard = popupContainer.querySelector('.add-card__close-btn');
const places = document.querySelector('.places');
const inputCard = popupContainer.querySelector('#placeCard');
const inputUrl = popupContainer.querySelector('#placeUrl');
const createBtn = popupContainer.querySelector('.add-card__save-btn');

//Начальный рендеринг
const createCard = (cardInfo) => {
  const template = `
  <div class="places__card">
    <div class="places__card-photo"></div>
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
  container.querySelector('.places__card-photo').style.backgroundImage = `url(${cardInfo.link})`;
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

  return container.firstElementChild;

};

const initialCard = (cardInfo) => {
  places.prepend(createCard(cardInfo));
}

initialCards.forEach( (item) => {
  initialCard(item);
});


//Открытие popup
function popupMenuOpen() {
  popup.classList.add('popup_opened');

}

//Закрытие popup
function popupMenuClose() {
  popup.classList.remove('popup_opened');
}

//Открытие формы редактирования
editBtn.addEventListener('click', () => {
  popupMenuOpen();
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  profileEdit.classList.add('profile-edit_opened');

});

//Закрытие формы редактирования
closeBtn.addEventListener('click', () => {
  popupMenuClose();
  profileEdit.classList.remove('profile-edit_opened');
});

//Сохранение профиля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupMenuClose();
  profileEdit.classList.remove('profile-edit_opened');
}

popupContainer.addEventListener('submit', handleFormSubmit);

//Открытие формы добавления карточки
addBtn.addEventListener('click', () => {
  popupMenuOpen();
  addCard.classList.add('add-card_opened');
});

//Закрытие формы добавления
closeBtnCard.addEventListener('click', () => {
  popupMenuClose();
  addCard.classList.remove('add-card_opened');
});

//Добавление карточки
createBtn.addEventListener('click', () => {
  const newCard = [];
  newCard.name = inputCard.value;
  newCard.link = inputUrl.value;
  initialCard(newCard);
  popupMenuClose();
  addCard.classList.remove('add-card_opened');
  inputCard.value = '';
  inputUrl.value = '';

})















