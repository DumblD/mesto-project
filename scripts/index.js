const profileName = document.querySelector('.profile__name');
const profileSpecialty = document.querySelector('.profile__specialty');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupElement = document.querySelector('.popup');
const buttonClose = popupElement.querySelector('.popup__close-button');

const profileEditForm = document.querySelector('.popup__edit-profile-form');
const nameInput = profileEditForm.querySelector('.form__item_el_name');
const jobInput = profileEditForm.querySelector('.form__item_el_specialty');

const placeAddForm = document.querySelector('.popup__add-place-form');
const placeTitleInput = placeAddForm.querySelector('.form__item_el_placeTitle');
const placeLinkInput = placeAddForm.querySelector('.form__item_el_placeLink');

function openPopup() { // функция открытия popup
  popupElement.classList.add('popup_opened'); // отвечает за открытие popup
  setTimeout(function() {
    popupElement.style.opacity = "1";
  }, 100);
}

function editProfile() { // функция получения данных профиля в input-ы формы редактирования информации
  if (placeAddForm.classList.contains('form_opened')) {
    placeAddForm.classList.remove('form_opened');
    profileEditForm.classList.add('form_opened');
  } else {
    profileEditForm.classList.add('form_opened');
  }
  openPopup()
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecialty.textContent;
}

function addPlace() { // функция добавления новой карточки с местом
  if (profileEditForm.classList.contains('form_opened')) {
    profileEditForm.classList.remove('form_opened');
    placeAddForm.classList.add('form_opened');
  } else {
    placeAddForm.classList.add('form_opened');
  }
  openPopup()
}

function closePopup() { // функция закрытия popup
  popupElement.style.opacity = "0";
  setTimeout(function() {
    popupElement.classList.remove('popup_opened');
  }, 500);
}

function editProfileFormSubmit (ev) { // функция отправки введенной пользователем информации профиля на страницу
  ev.preventDefault(); // отмена стандартной отправки формы
  profileName.textContent = nameInput.value;
  profileSpecialty.textContent = jobInput.value;
  closePopup();
}

function addPlaceFormSubmit (ev) { // функция отправки введенной пользователем информации профиля на страницу
  ev.preventDefault(); // отмена стандартной отправки формы
  closePopup();
}

profileEditButton.addEventListener('click', editProfile);
profileAddButton.addEventListener('click', addPlace);
buttonClose.addEventListener('click', closePopup);
profileEditForm.addEventListener('submit', editProfileFormSubmit);
placeAddForm.addEventListener('submit', addPlaceFormSubmit);
