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

const cardsContainer = document.querySelector('.places__container');
const templateElement = document.querySelector('#card-template').content;

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

function openPopup() { // функция открытия popup
  popupElement.classList.add('popup_opened'); // отвечает за открытие popup
  setTimeout(function() {
    popupElement.style.opacity = "1"; // плавное открытие popup через opacity
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

function editNewCardData() { // функция открытия формы для добавления новой карточки
  if (profileEditForm.classList.contains('form_opened')) {
    profileEditForm.classList.remove('form_opened');
    placeAddForm.classList.add('form_opened');
  } else {
    placeAddForm.classList.add('form_opened');
  }
  openPopup()
}

function addCardFromBox (boxMassive) { // функция добавления карточек-мест из массива данных (название, ссылка на картинку)
  boxMassive.forEach(el => {
      const cardElement = templateElement.querySelector('.card').cloneNode(true);
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
      cardsContainer.append(cardElement);
  });
}

function addCard() { // функция добавления новой карточки с местом - добавляет пользователь
  const cardElement = templateElement.querySelector('.card').cloneNode(true);
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
  cardImg.src = placeLinkInput.value;
  cardImg.alt = placeTitleInput.value.toLowerCase();
  cardTitle.textContent = placeTitleInput.value;
  cardsContainer.prepend(cardElement);
}

function closePopup() { // функция закрытия popup
  popupElement.style.opacity = "0"; // плавное закрытие popup через opacity
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

function addPlaceFormSubmit (ev) { // функция, вызываемая подтверждении пользователем введенных данных для добавления новой карточки
  ev.preventDefault(); // отмена стандартной отправки формы
  addCard(); // функция добавления новой карточки
  placeTitleInput.value = ''; // очистка полей формы перед закрытием popup
  placeLinkInput.value = '';
  closePopup();
}

addCardFromBox(initialCards); // функция добавления карточек на страницу по данным из массива (название, ссылка на картинку)
profileEditButton.addEventListener('click', editProfile); // слушатель на кнопку редактировать профиль
profileAddButton.addEventListener('click', editNewCardData); // слушатель на кнопку "+" (добавить карточку)
buttonClose.addEventListener('click', closePopup); // слушатель на кнопку закрытия popup
profileEditForm.addEventListener('submit', editProfileFormSubmit); // слушатель на подтверждение введенных данных формы для редактирования профиля
placeAddForm.addEventListener('submit', addPlaceFormSubmit); // слушатель на подтверждение введенных данных формы для создания новой карточки
