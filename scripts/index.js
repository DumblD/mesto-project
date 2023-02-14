const profileName = document.querySelector('.profile__name');
const profileSpecialty = document.querySelector('.profile__specialty');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popups = Array.from(document.querySelectorAll('.popup'));
const popupEditForm = choosePopup(popups, 'popupEditForm');
const popupAddForm = choosePopup(popups, 'popupAddForm');
const popupImgScaled = choosePopup(popups, 'popupImgScaled');
const buttonsClose = Array.from(document.querySelectorAll('.popup__close-button'));

const profileEditForm = document.forms.profileEditForm;
const nameInput = profileEditForm.querySelector('.popup__input_el_name');
const jobInput = profileEditForm.querySelector('.popup__input_el_specialty');

const placeAddForm = document.forms.placeAddForm;
const placeTitleInput = placeAddForm.querySelector('.popup__input_el_placeTitle');
const placeLinkInput = placeAddForm.querySelector('.popup__input_el_placeLink');

const cardsContainer = document.querySelector('.places__container');
const cardTemplateElement = document.querySelector('#card-template').content;

const scaledImagesContainer = document.querySelector('.popup__scaled-images-container');
const scaledImg = scaledImagesContainer.querySelector('.scaled-images-container__img');
const scaledImgTitle = scaledImagesContainer.querySelector('.scaled-images-container__title');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function choosePopup(popupsArray, popupId) {
  let popupSearched;
  popupsArray.forEach((popup) => {
    if (popup.id === popupId) {
      popupSearched = popup;
    }
  })
  return popupSearched;
}

function findOpenedPopup () { // функция, возвращающая открытый popup
  let popupOpened;
  popups.forEach((popup) => {
    if (popup.classList.contains('popup_opened')){
      popupOpened = popup;
    }
  });
  return popupOpened;
}

function closePopup(ev) { // функция закрытия popup
  if (ev.type != 'keydown') {
    const target = ev.target;
    const popupElement = target.closest('.popup');
    popupElement.classList.remove('popup_opened');
  } else {
    const popupElement = findOpenedPopup();
    popupElement.classList.remove('popup_opened');
  }
  document.removeEventListener('keydown', closePopupEscPress); // удаление слушателя для событий
}                                                              // клавиатуры при закрытии popup

const closePopupEscPress = (ev) => { // функция закрытия popup
  if (ev.key === "Escape") {         // при клике на клавишу Esc
    closePopup(ev);
  }
};

function openPopup(popup) { // функция открытия popup
  popup.classList.add('popup_opened'); // класс, отвечающий за открытие popup
  document.addEventListener('keydown', closePopupEscPress); // закрыть popup по клику на Esc
}

function editProfile() { // функция получения данных профиля в input-ы формы редактирования информации
  openPopup(popupEditForm);
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecialty.textContent;
}

function editNewCardData() { // функция открытия формы для добавления новой карточки
  openPopup(popupAddForm);
}

function createCard(el) {
  const cardElement = cardTemplateElement.querySelector('.card').cloneNode(true);
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDelButton = cardElement.querySelector('.card__del-button');
  const cardImg = cardElement.querySelector('.card__img');
  const cardTitle = cardElement.querySelector('.card__title');
  cardLikeButton.addEventListener('click', function () {
    cardLikeButton.classList.toggle('card__like-button_active');
  });
  cardDelButton.addEventListener('click', function () {
    const cardItem = cardDelButton.closest('.card');
    cardItem.remove();
  });
  cardImg.src = el.link;
  cardImg.alt = el.name.toLowerCase();
  cardTitle.textContent = el.name;
  cardImg.addEventListener('click', function () {
    scaledImg.src = el.link;
    scaledImg.alt = el.name.toLowerCase();
    scaledImgTitle.textContent = el.name;
    openPopup(popupImgScaled);
  });
  return cardElement
}

function addCardFromBox (boxMassive) { // функция добавления карточек-мест из массива данных (название, ссылка на картинку)
  boxMassive.forEach ((el) => {
    cardsContainer.append(createCard(el));
  });
}

function editProfileFormSubmit (ev) { // функция отправки введенной пользователем информации профиля на страницу
  ev.preventDefault(); // отмена стандартной отправки формы
  profileName.textContent = nameInput.value;
  profileSpecialty.textContent = jobInput.value;
  closePopup(ev);
}

function addPlaceFormSubmit (ev) { // функция, вызываемая при подтверждении пользователем введенных данных для добавления новой карточки
  ev.preventDefault(); // отмена стандартной отправки формы
  const valuesToCreateCard = new Object();
  valuesToCreateCard.name = placeTitleInput.value; // сохраняем значения inputов, введеных пользователем
  valuesToCreateCard.link = placeLinkInput.value;
  cardsContainer.prepend(createCard(valuesToCreateCard)); // функция добавления новой карточки
  ev.target.reset(); // очищаем поля ввода у формы добавления карточки перед закрытием
  closePopup(ev);
}

addCardFromBox(initialCards); // функция добавления карточек на страницу по данным из массива (название, ссылка на картинку)
profileEditButton.addEventListener('click', editProfile); // слушатель на кнопку редактировать профиль
profileAddButton.addEventListener('click', editNewCardData); // слушатель на кнопку "+" (добавить карточку)
buttonsClose.forEach ((el) => {
  el.addEventListener('click', closePopup); // слушатели на все кнопки закрытия popup-ов
});
popups.forEach ((popup) => {
  popup.addEventListener('click', (ev) => { // добавить слушателя на каждый popup на странице
    if (ev.currentTarget === ev.target) { // для закрытия popup при клике по затемненой области (оверлэю)
      closePopup(ev);
    }
  });
});
profileEditForm.addEventListener('submit', editProfileFormSubmit); // слушатель на подтверждение введенных данных формы для редактирования профиля
placeAddForm.addEventListener('submit', addPlaceFormSubmit); // слушатель на подтверждение введенных данных формы для создания новой карточки
