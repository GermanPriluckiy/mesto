const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const popupContainer = document.querySelector('.popup__container');
const saveBtn = popupContainer.querySelector('.popup__save-btn');
const inputName = popupContainer.querySelector('.popup__input-name');
const inputJob = popupContainer.querySelector('.popup__input-job');
const editBtn = profile.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const closeBtn = popupContainer.querySelector('.popup__close-btn');

function popupMenuOpen() {
  popup.classList.remove('popup_closed');
  inputName.setAttribute('value', profileName.textContent);
  inputJob.setAttribute('value', profileJob.textContent);
}

function popupMenuClose() {
  popup.classList.add('popup_closed');
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

