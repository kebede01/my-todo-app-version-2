class FormValidator {
  constructor(settings) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formElement = document.querySelector(settings.formSelector);
  }

  _showInputError = (inputElement) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formElement.querySelector(errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElementId = `#${inputElement.id}-error`;

    const errorElement = this._formElement.querySelector(errorElementId);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this.disableButton();
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector),
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector,
    );

    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        console.log("Listening");
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log(this._formElement);
      this._formElement.reset();
      this.resetValidation();
    });
    this._setEventListeners();
  }
}
export default FormValidator;
