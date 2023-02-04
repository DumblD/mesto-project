const profileName = document.querySelector('.profile__name');
const profileSpecialty = document.querySelector('.profile__specialty');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEditForm = document.querySelector('#popupEditForm');
const popupAddForm = document.querySelector('#popupAddForm');
const popupImgScaled = document.querySelector('#popupImgScaled');
const buttonsClose = document.querySelectorAll('.popup__close-button');

const profileEditForm = document.querySelector('.popup__edit-profile-form');
const nameInput = profileEditForm.querySelector('.form__item_el_name');
const jobInput = profileEditForm.querySelector('.form__item_el_specialty');

const placeAddForm = document.querySelector('.popup__add-place-form');
const placeTitleInput = placeAddForm.querySelector('.form__item_el_placeTitle');
const placeLinkInput = placeAddForm.querySelector('.form__item_el_placeLink');

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

function openPopup(popup) { // функция открытия popup
  popup.classList.add('popup_opened'); // отвечает за открытие popup
}

function editProfile() { // функция получения данных профиля в input-ы формы редактирования информации
  openPopup(popupEditForm);
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecialty.textContent;
}

function editNewCardData() { // функция открытия формы для добавления новой карточки
  openPopup(popupAddForm);
}

function addCardFromBox (boxMassive) { // функция добавления карточек-мест из массива данных (название, ссылка на картинку)
  boxMassive.forEach(el => {
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
      cardImg.addEventListener('click', function () {
        scaledImg.src = el.link;
        scaledImg.alt = el.name.toLowerCase();
        scaledImgTitle.textContent = el.name;
        openPopup(popupImgScaled);
    });
      cardTitle.textContent = el.name;
      cardsContainer.append(cardElement);
  });
}

function addCard() { // функция добавления новой карточки с местом - добавляет пользователь
  const cardElement = cardTemplateElement.querySelector('.card').cloneNode(true);
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDelButton = cardElement.querySelector('.card__del-button');
  const cardImg = cardElement.querySelector('.card__img');
  const cardTitle = cardElement.querySelector('.card__title');
  const placeLinkInputValue = placeLinkInput.value; // сохраняем значения inputов сразу при создании карточки
  const placeTitleInputValue = placeTitleInput.value;
  cardLikeButton.addEventListener('click', function () {
    cardLikeButton.classList.toggle('card__like-button_active');
  });
  cardDelButton.addEventListener('click', function () {
    const cardItem = cardDelButton.closest('.card');
    cardItem.remove();
  });
  cardImg.src = placeLinkInputValue;
  cardImg.alt = placeTitleInputValue.toLowerCase();
  cardImg.addEventListener('click', function () {
    scaledImg.src = placeLinkInputValue;
    scaledImg.alt = placeTitleInputValue.toLowerCase();
    scaledImgTitle.textContent = placeTitleInputValue;
    openPopup(popupImgScaled);
  });
  cardTitle.textContent = placeTitleInputValue;
  cardsContainer.prepend(cardElement);
}

function closePopup(ev) { // функция закрытия popup
  const target = ev.target;
  const popupElement = target.closest('.popup');
  popupElement.classList.remove('popup_opened');
}

function editProfileFormSubmit (ev) { // функция отправки введенной пользователем информации профиля на страницу
  ev.preventDefault(); // отмена стандартной отправки формы
  profileName.textContent = nameInput.value;
  profileSpecialty.textContent = jobInput.value;
  closePopup(ev);
}

function addPlaceFormSubmit (ev) { // функция, вызываемая при подтверждении пользователем введенных данных для добавления новой карточки
  ev.preventDefault(); // отмена стандартной отправки формы
  addCard(); // функция добавления новой карточки
  ev.target.reset(); // очищаем поля ввода у формы добавления карточки перед закрытием
  closePopup(ev);
}

addCardFromBox(initialCards); // функция добавления карточек на страницу по данным из массива (название, ссылка на картинку)
profileEditButton.addEventListener('click', editProfile); // слушатель на кнопку редактировать профиль
profileAddButton.addEventListener('click', editNewCardData); // слушатель на кнопку "+" (добавить карточку)
buttonsClose.forEach ((el) => {
  el.addEventListener('click', closePopup); // слушатели на все кнопки закрытия popup-ов
})
profileEditForm.addEventListener('submit', editProfileFormSubmit); // слушатель на подтверждение введенных данных формы для редактирования профиля
placeAddForm.addEventListener('submit', addPlaceFormSubmit); // слушатель на подтверждение введенных данных формы для создания новой карточки
