const validationData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function formReset (formElement) { // функция очистки полей формы
  formElement.reset();
}

function resetErrors(popupElement, configData) { // функция сброса ошибок валидации
  const formElement = popupElement.querySelector(configData.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(configData.inputSelector));
  inputList.forEach((inputElement) => {
    // очистка ошибок валидации
    hideErrorMessage(inputElement, formElement, configData);
    inputElement.classList.remove(configData.inputErrorClass);
  });
  // актуализация состояния кнопки сабмита
  toggleButton(formElement, configData);
}

function enableValidation(configData) {
  const formList = Array.from(document.forms);
  formList.forEach((form) => {
    toggleButton (form, configData);
    const inputList = Array.from(form.querySelectorAll(configData.inputSelector));
    inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        checkInputValidity (inputItem, form, configData)
        toggleButton (form, configData);
      });
    });
  });
}

function isInputValid(inputElement, configData) {
  if (!inputElement.validity.valid) {
    inputElement.classList.add(configData.inputErrorClass);
    return false;
  } else {
    inputElement.classList.remove(configData.inputErrorClass);
    return true;
  }
}

function checkInputValidity (inputElement, formElement, configData) {
  if(!isInputValid(inputElement, configData)) {
    showErrorMessage(inputElement, formElement, configData);
  } else {
    hideErrorMessage(inputElement, formElement, configData);
  }
}

function showErrorMessage(inputElement, formElement, configData) {
  const validationMessage = inputElement.validationMessage;
  const errorContainer = formElement.querySelector(`.${inputElement.id}-error`);
  errorContainer.textContent = validationMessage;
  errorContainer.classList.add(configData.errorClass);
}

function hideErrorMessage(inputElement, formElement, configData) {
  const errorContainer = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorContainer.classList.contains(configData.errorClass)) {
    errorContainer.classList.remove(configData.errorClass);
    errorContainer.textContent = '';
  }
}

function toggleButton (formElement, configData) {
  const isFormValid = formElement.checkValidity();
  const submitButton = formElement.querySelector(configData.submitButtonSelector);
  if (!isFormValid) {
    submitButton.classList.add(configData.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(configData.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

enableValidation(validationData);
