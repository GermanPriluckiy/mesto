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
const closeBtn = popupContainer.querySelector('.profile-edit__close-btn');
const places = document.querySelector('.places');

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

  const deleteBtn = container.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    card.remove();
  });

  return container.firstElementChild;

};

const addCard = (cardInfo) => {
  places.prepend(createCard(cardInfo));
}

initialCards.forEach( (item) => {
  addCard(item);
});


//Открытие popup
function popupMenuOpen() {
  popup.classList.add('popup_opened');

}
//Открытие формы редактирования
editBtn.addEventListener('click', () => {
  popupMenuOpen();
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

//Закрытие popup
function popupMenuClose() {
  popup.classList.remove('popup_opened');
}

//Закрытие формы редактирования
closeBtn.addEventListener('click', popupMenuClose);

//Сохранение профиля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupMenuClose();
}

popupContainer.addEventListener('submit', handleFormSubmit);

//Реализация кнопки like
const likeBtn = document.querySelectorAll('.like-btn');
const likeArray =  Array.from(likeBtn);

likeArray.forEach( (item) => {
  item.addEventListener('click', (evt) => {
    evt.target.classList.toggle('like-btn_status_active');
  });
});









