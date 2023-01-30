let profileName = document.querySelector('.profile__name');
let profileSpecialty = document.querySelector('.profile__specialty');
let ProfileEditButton = document.querySelector('.profile__edit-button');
let popupEditProfile = document.querySelector('.popup-edit-profile');
let ButtonClose_EditProfile = popupEditProfile.querySelector('.popup-edit-profile__close-button');
let form_EditProfile = document.querySelector('.popup__edit-profile-form');
let nameInput = form_EditProfile.querySelector('.form__item_el_name');
let jobInput = form_EditProfile.querySelector('.form__item_el_specialty');

let ProfileAddButton = document.querySelector('.profile__add-button');
let popupAddPlace = document.querySelector('.popup-add-place');
let ButtonClose_AddPlace = popupAddPlace.querySelector('.popup-add-place__close-button');
let form_AddPlace = document.querySelector('.popup__add-place-form');
let placeTitleInput = form_AddPlace.querySelector('.form__item_el_placeTitle');
let placeLinkInput = form_AddPlace.querySelector('.form__item_el_placeLink');

function editProfile() { // функция открытия и получения данных профиля в input-ы формы редактирования информации
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecialty.textContent;
  popupEditProfile.classList.add('popup_opened'); // отвечает за открытие popup
  setTimeout(function() {
    popupEditProfile.style.opacity = "1";
  }, 100);
}

function addPlace() { // функция открытия формы для добавления новой карточки с местом
  popupAddPlace.classList.add('popup_opened'); // отвечает за открытие popup
  setTimeout(function() {
    popupAddPlace.style.opacity = "1";
  }, 100);
}

function closePopup(popupName) { // функция закрытия формы редактирования профиля
  popupName.style.opacity = "0";
  setTimeout(function() {
    popupName.classList.remove('popup_opened');
  }, 500);
}

function editProfileFormSubmit (ev) { // функция отправки введенной пользователем информации профиля на страницу
  ev.preventDefault(); // отмена стандартной отправки формы
  profileName.textContent = nameInput.value;
  profileSpecialty.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function addPlaceFormSubmit (ev) { // функция отправки введенной пользователем информации профиля на страницу
  ev.preventDefault(); // отмена стандартной отправки формы
  closePopup(popupAddPlace);
}

ProfileEditButton.addEventListener('click', editProfile);
ProfileAddButton.addEventListener('click', addPlace);
ButtonClose_EditProfile.addEventListener('click', () => closePopup(popupEditProfile));
ButtonClose_AddPlace.addEventListener('click', () => closePopup(popupAddPlace));
form_EditProfile.addEventListener('submit', editProfileFormSubmit);
form_AddPlace.addEventListener('submit', addPlaceFormSubmit);
