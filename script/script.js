let profileName = document.querySelector('.profile__name');
let profileSpecialty = document.querySelector('.profile__specialty');
let editProfileButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.form__close-icon');
let formElement = document.querySelector('.form__edit-form');
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_specialty');

function editProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecialty.textContent;
  popup.classList.add('popup_opened');
}
editProfileButton.addEventListener('click', editProfile);

function closePopup() {
  nameInput.value = '';
  jobInput.value = '';
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let specialty = jobInput.value;

  profileName.textContent = `${name}`;
  profileSpecialty.textContent = `${specialty}`;
}

formElement.addEventListener('submit', handleFormSubmit);
