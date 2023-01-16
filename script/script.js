let profileName = document.querySelector('.profile__name');
let profileSpecialty = document.querySelector('.profile__specialty');
let ProfileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let ButtonClose = popup.querySelector('.form__close-button');
let formElement = document.querySelector('.form__edit-form');
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_specialty');

function editProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecialty.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileSpecialty.textContent = jobInput.value;
  closePopup()
}

ProfileEditButton.addEventListener('click', editProfile);
ButtonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
