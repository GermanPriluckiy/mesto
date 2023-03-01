class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }

  _handleFormInput = (evt) => {
    const input = evt.target;
    const inputId = input.id;
    const errorElement = this._form.querySelector(`#${inputId}-error`);

    if (input.validity.valid) {
      input.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
    } else {
      input.classList.add(this._inputErrorClass);
      errorElement.textContent = input.validationMessage;
    }

  }

  _addEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));

    inputList.forEach((input) => {
      input.addEventListener('input', this._handleFormInput);
    });

    this._form.addEventListener('input', this._toggleButton);
  }

  _toggleButton = () => {
    const buttonSubmit = this._form.querySelector(this._submitButtonSelector);

    const isFormValid = this._form.checkValidity();

    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classList.toggle(this._inactiveButtonClass, !isFormValid);
  }

  enableValidation() {

    this._addEventListeners();
    this._toggleButton();

  }
}



export default FormValidator;
