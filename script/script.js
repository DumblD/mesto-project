let profileName = document.querySelector('.profile__name');
let profileSpecialty = document.querySelector('.profile__specialty');
let ProfileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let ButtonClose = popup.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__edit-form');
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_specialty');

function editProfile() { // функция открытия и получения данных профиля в input-ы формы редактирования информации
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecialty.textContent;
  popup.classList.add('popup_opened'); // отвечает за открытие popup
}

function closePopup() { // функция закрытия формы редактирования профиля
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) { // функция отправки введенной пользователем информации профиля на страницу
  evt.preventDefault(); // отмена стандартной отправки формы

  profileName.textContent = nameInput.value;
  profileSpecialty.textContent = jobInput.value;
  closePopup()
}

ProfileEditButton.addEventListener('click', editProfile);
ButtonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
