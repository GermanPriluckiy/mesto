const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const popupContainer = document.querySelector('.popup__container');
const inputName = popupContainer.querySelector('#name');
const inputJob = popupContainer.querySelector('#job');
const editBtn = profile.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const closeBtn = popupContainer.querySelector('.profile-edit__close-btn');

function popupMenuOpen() {
  popup.classList.add('popup_opened');
  inputName.setAttribute('value', profileName.textContent);
  inputJob.setAttribute('value', profileJob.textContent);
}

function popupMenuClose() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupMenuClose();
}

editBtn.addEventListener('click', popupMenuOpen);
closeBtn.addEventListener('click', popupMenuClose);

popupContainer.addEventListener('submit', handleFormSubmit);

