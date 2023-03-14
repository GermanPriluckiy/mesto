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

  }
  //Снятие класса ошибки
  removeError = () => {
    this._inputList.forEach((input) => {
      this._hideErrorClass(input);
    });
  }

  //Видимость ошибки
  _showErrorClass = (input, errorMessage) => {
    const inputId = input.id;
    const errorElement = this._form.querySelector(`#${inputId}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;

  }
  //Скрытие ошибки
  _hideErrorClass = (input) => {
    const inputId = input.id;
    const errorElement = this._form.querySelector(`#${inputId}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = ' ';
  }
  //Проверка валидации полей
  _handleFormInput = (input) => {

    if (input.validity.valid) {
      this._hideErrorClass(input);

    } else {
      this._showErrorClass(input, input.validationMessage);

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
