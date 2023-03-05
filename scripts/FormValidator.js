class FormValidator {

  static validationData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

  constructor(validationData, formElement) {
    this._configData = validationData;
    this._formElement = formElement;
  }

  _showErrorMessage(inputElement) { // функция отображения сообщений об ошибках для input-элементов
    const validationMessage = inputElement.validationMessage;
    const errorContainer = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorContainer.textContent = validationMessage;
    errorContainer.classList.add(this._configData.errorClass);
  }


  _hideErrorMessage(inputElement) { // функция скрытия сообщений об ошибках для input-элементов
    const errorContainer = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (errorContainer.classList.contains(this._configData.errorClass)) {
      errorContainer.classList.remove(this._configData.errorClass);
      errorContainer.textContent = '';
    }
  }

  _toggleButton () { // функция активации/деактивации кнопки отправки формы
    const isFormValid = this._formElement.checkValidity();
    const submitButton = this._formElement.querySelector(this._configData.submitButtonSelector);
    if (!isFormValid) {
      submitButton.classList.add(this._configData.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._configData.inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  resetErrors(popupElement) { // функция сброса ошибок валидации
    const formElement = popupElement.querySelector(this._configData.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(this._configData.inputSelector));
    inputList.forEach((inputElement) => {
      // очистка ошибок валидации
      this._hideErrorMessage(inputElement);
      inputElement.classList.remove(this._configData.inputErrorClass);
    });
    // актуализация состояния кнопки сабмита
    this._toggleButton();
  }

  _isInputValid(inputElement) { // функция проверки валидности заполнения input-элементов
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._configData.inputErrorClass);
      return false;
    } else {
      inputElement.classList.remove(this._configData.inputErrorClass);
      return true;
    }
  }

  _checkInputValidity (inputElement) { // функция показа/скрытия сообщений об ошибках для input-элементов
                                                    // при проверке input-элементов на валидность
    if(!this._isInputValid(inputElement)) {
      this._showErrorMessage(inputElement);
    } else {
      this._hideErrorMessage(inputElement);
    }
  }

  enableValidation() { // функция, активирующая валидацию input-элементов во всех формах на странице
    this._toggleButton();
    const inputList = Array.from(this._formElement.querySelectorAll(this._configData.inputSelector));
    inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidity(inputItem);
        this._toggleButton();
      });
    });
  }
}

export default FormValidator; // экспорт созданного класса FormValidator
