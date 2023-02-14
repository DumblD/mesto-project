const validationData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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
  errorContainer.classList.remove(configData.errorClass);
  errorContainer.textContent = '';
}

function toggleButton (formElement, configData) {
  isFormValid = formElement.checkValidity();
  const submitButton = formElement.querySelector(configData.submitButtonSelector);
  if (!isFormValid) {
    submitButton.classList.add(configData.inactiveButtonClass);
  } else {
    submitButton.classList.remove(configData.inactiveButtonClass);
  }
}

enableValidation(validationData);
