class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    this._errorClassList = Array.from(this._form.querySelectorAll(this._errorClass));

  }
  //Снятие класса ошибки
  removeСlassOnExit = () => {
    this._inputList.forEach((input) => {
      input.classList.remove(this._inputErrorClass);
    });
  }

  //Обнуление текста ошибок
  resetInputError = () => {
    this._errorClassList.forEach((error) => {
      error.textContent = ' ';
    });
  }
  //Включение submit
  enableButton = () => {
    this._buttonSubmit.disabled = false;
    this._buttonSubmit.classList.remove(this._inactiveButtonClass);
  }
  //Видимость ошибки
  _showErrorClass = (input, error) => {
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;

  }
  //Скрытие ошибки
  _hideErrorClass = (input, error) => {
    input.classList.remove(this._inputErrorClass);
    error.textContent = ' ';
  }
  //Проверка валидации полей
  _handleFormInput = (input) => {
    const inputId = input.id;
    const errorElement = this._form.querySelector(`#${inputId}-error`);

    if (input.validity.valid) {
      this._hideErrorClass(input, errorElement);

    } else {
      this._showErrorClass(input, errorElement);

    }
    this.toggleButton();
  }

  //Вешаем слушатели
  _addEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => this._handleFormInput(input));

    });

  }

  //Проверка submit
  toggleButton = () => {
    const isFormValid = this._form.checkValidity();

    this._buttonSubmit.disabled = !isFormValid;
    this._buttonSubmit.classList.toggle(this._inactiveButtonClass, !isFormValid);
  }
  //Валидация
  enableValidation() {
    this._addEventListeners();

  }
}

export default FormValidator;
