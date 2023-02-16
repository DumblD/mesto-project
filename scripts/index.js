const profileName = document.querySelector('.profile__name');
const profileSpecialty = document.querySelector('.profile__specialty');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

let popupOpened; // переменная для хранения открытых popup (добавляются при открытии)
const popups = Array.from(document.querySelectorAll('.popup'));
const popupEditForm = document.querySelector('#popupEditForm');
const popupAddForm = document.querySelector('#popupAddForm');
const popupImgScaled = document.querySelector('#popupImgScaled');
const buttonsClose = Array.from(document.querySelectorAll('.popup__close-button'));

const profileEditForm = document.forms.profileEditForm;
const nameInput = profileEditForm.querySelector('.popup__input_el_name');
const jobInput = profileEditForm.querySelector('.popup__input_el_specialty');

const placeAddForm = document.forms.placeAddForm;
const placeTitleInput = placeAddForm.querySelector('.popup__input_el_place-title');
const placeLinkInput = placeAddForm.querySelector('.popup__input_el_place-link');

const cardsContainer = document.querySelector('.places__container');
const cardTemplateElement = document.querySelector('#card-template').content;

const scaledImagesContainer = document.querySelector('.popup__scaled-images-container');
const scaledImg = scaledImagesContainer.querySelector('.scaled-images-container__img');
const scaledImgTitle = scaledImagesContainer.querySelector('.scaled-images-container__title');

function closePopup() { // функция закрытия popup
  popupOpened.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscPress); // удаление слушателя для событий
}                                                              // клавиатуры при закрытии popup

const closePopupEscPress = (ev) => { // функция закрытия popup
  if (ev.key === "Escape") {         // при клике на клавишу Esc
    closePopup();
  }
};

function openPopup(popup) { // функция открытия popup
  popupOpened = popup; // добавляем, открываемый popup в переменную popupOpened -
                      // чтобы в коде не искать потом через document.querySelector(.popup__opened)
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

function toggleLikeButtonActiveClass(ev) { // функция удаления/добавления активного класса для 'card__like-button'
  const target = ev.target;
  target.classList.toggle('card__like-button_active');
}

function deleteCard(ev) { // функция удаления карточки
  const target = ev.target;
  const cardItem = target.closest('.card');
  cardItem.remove();
}

function addScaledImgDataToPopup(img) { // функция добавления увеличенного изображения карточки
  // в popup для 'изображений с исходным соотношением сторон/размером'
  scaledImg.src = img.link;
  scaledImg.alt = img.name.toLowerCase();
  scaledImgTitle.textContent = img.name;
}

function createCard(el) {
  const cardElement = cardTemplateElement.querySelector('.card').cloneNode(true);
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDelButton = cardElement.querySelector('.card__del-button');
  const cardImg = cardElement.querySelector('.card__img');
  const cardTitle = cardElement.querySelector('.card__title');
  cardLikeButton.addEventListener('click', toggleLikeButtonActiveClass);
  cardDelButton.addEventListener('click', deleteCard);
  cardImg.src = el.link;
  cardImg.alt = el.name.toLowerCase();
  cardTitle.textContent = el.name;
  cardImg.addEventListener('click', () => {
    addScaledImgDataToPopup(el);
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
  closePopup();
}

function addPlaceFormSubmit (ev) { // функция, вызываемая при подтверждении пользователем введенных данных для добавления новой карточки
  ev.preventDefault(); // отмена стандартной отправки формы
  const valuesToCreateCard = new Object();
  valuesToCreateCard.name = placeTitleInput.value; // сохраняем значения inputов, введеных пользователем
  valuesToCreateCard.link = placeLinkInput.value;
  cardsContainer.prepend(createCard(valuesToCreateCard)); // функция добавления новой карточки
  ev.target.reset(); // очищаем поля ввода у формы добавления карточки перед закрытием
  closePopup();
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
      closePopup();
    }
  });
});
profileEditForm.addEventListener('submit', editProfileFormSubmit); // слушатель на подтверждение введенных данных формы для редактирования профиля
placeAddForm.addEventListener('submit', addPlaceFormSubmit); // слушатель на подтверждение введенных данных формы для создания новой карточки
