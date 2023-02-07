const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
}

//Функция валидации
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    addInputListeners(formElement, config);
    toggleButton(formElement, config);
    formElement.addEventListener('input', () => {
      toggleButton(formElement, config);
    });
  });
}

//Валидация ввода

function handleFormInput(evt, config) {
  const input = evt.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;

  }
}


//Вешаем слушатели на все input'ы
function addInputListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', (evt) => {
      handleFormInput(evt, config)
    });
  });
}

//Блокирование Сохранения

function toggleButton (formElement, config) {
  const buttonSubmit = formElement.querySelector(config.submitButtonSelector);
  const isFormValid = formElement.checkValidity();

  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid);


  }

enableValidation(validationConfig);


