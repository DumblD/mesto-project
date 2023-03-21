export default class FormValidator {
  constructor(validationData, formElement) {
    this._configData = validationData;
    this._formElement = formElement;
    // сохраняем кнопку Submit переданной формы
    this._submitButton = this._formElement.querySelector(this._configData.submitButtonSelector);
    // сохраняем все input-элементы переданной формы
    this._formInputList = Array.from(this._formElement.querySelectorAll(this._configData.inputSelector));
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
    if (!isFormValid) {
      this._submitButton.classList.add(this._configData.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._configData.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  resetValidationErrors() { // функция сброса ошибок валидации
    this._formInputList.forEach((inputElement) => {
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

  _setEventListeners () { // функция, устанавливающая на каждый input переданной формы
                         // обработчики на проверку валидности этих input-элементов
    this._formInputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidity(inputItem);
        this._toggleButton();
      });
    });
  }

  enableValidation() { // функция, активирующая валидацию input-элементов во всех формах на странице
    this._toggleButton();
    this._setEventListeners();
  }
}
