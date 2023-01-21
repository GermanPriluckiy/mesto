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
const likeBtn = document.querySelectorAll('.like-btn');
const likeArray =  Array.from(likeBtn);

//Открытие редактирования
function popupMenuOpen() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

editBtn.addEventListener('click', popupMenuOpen);

//Закрытие редактирования
function popupMenuClose() {
  popup.classList.remove('popup_opened');
}

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
likeArray.forEach( (item) => {
  item.addEventListener('click', (evt) => {
    evt.target.classList.toggle('like-btn_status_active');
  });
});








