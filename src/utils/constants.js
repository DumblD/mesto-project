export const validationData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const profileDataSelectors = {
  nameSelector: '.profile__name',
  specialtySelector: '.profile__specialty',
  imgSelector: '.profile__img'
};

export default function renderLoading(isLoading, buttonSubmit) {
  if (isLoading) {
    buttonSubmit.textContent = `${buttonSubmit.textContent}…`;
  } else {
    buttonSubmit.textContent = `${buttonSubmit.textContent.slice(0,-1)}`;
  }
}

export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileImgEditButton = document.querySelector('.profile__img-edit-button');
