class FormValidator {

  static validationData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

  constructor() {
    this._configData = FormValidator.validationData;
  }

  formReset (formElement) { // функция очистки полей формы
    formElement.reset();
  }

  _showErrorMessage(inputElement, formElement) { // функция отображения сообщений об ошибках для input-элементов
    const validationMessage = inputElement.validationMessage;
    const errorContainer = formElement.querySelector(`.${inputElement.id}-error`);
    errorContainer.textContent = validationMessage;
    errorContainer.classList.add(this._configData.errorClass);
  }


  _hideErrorMessage(inputElement, formElement) { // функция скрытия сообщений об ошибках для input-элементов
    const errorContainer = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorContainer.classList.contains(this._configData.errorClass)) {
      errorContainer.classList.remove(this._configData.errorClass);
      errorContainer.textContent = '';
    }
  }

  toggleButton (formElement) { // функция активации/деактивации кнопки отправки формы
    const isFormValid = formElement.checkValidity();
    const submitButton = formElement.querySelector(this._configData.submitButtonSelector);
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
      this._hideErrorMessage(inputElement, formElement);
      inputElement.classList.remove(this._configData.inputErrorClass);
    });
    // актуализация состояния кнопки сабмита
    this.toggleButton(formElement);
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

  _checkInputValidity (inputElement, formElement) { // функция показа/скрытия сообщений об ошибках для input-элементов
                                                    // при проверке input-элементов на валидность
    if(!this._isInputValid(inputElement)) {
      this._showErrorMessage(inputElement, formElement);
    } else {
      this._hideErrorMessage(inputElement, formElement);
    }
  }

  enableValidation() { // функция, активирующая валидацию input-элементов во всех формах на странице
    const formList = Array.from(document.forms);
    formList.forEach((form) => {
      this.toggleButton (form);
      const inputList = Array.from(form.querySelectorAll(this._configData.inputSelector));
      inputList.forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
          this._checkInputValidity (inputItem, form)
          this.toggleButton (form);
        });
      });
    });
  }

}

const formValidator = new FormValidator(); // создание экземпляра класса FormValidator
formValidator.enableValidation(); // активация валидации input-элементов во всех формах на странице

export default formValidator; // экспорт созданного экземпляра класса FormValidator
