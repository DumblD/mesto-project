import Card from './Card.js'; // импорт класса Card
import FormValidator from './FormValidator.js'; // импорт класса FormValidator

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

const profileName = document.querySelector('.profile__name');
const profileSpecialty = document.querySelector('.profile__specialty');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

let popupOpened; // переменная для хранения открытых popup (добавляются при открытии)
const popups = Array.from(document.querySelectorAll('.popup'));
const popupEditForm = document.querySelector('#popupEditForm');
const popupAddForm = document.querySelector('#popupAddForm');
const buttonsClose = Array.from(document.querySelectorAll('.popup__close-button'));

const profileEditForm = document.forms.profileEditForm;
const nameInput = profileEditForm.querySelector('.popup__input_el_name');
const jobInput = profileEditForm.querySelector('.popup__input_el_specialty');

const placeAddForm = document.forms.placeAddForm;
const placeTitleInput = placeAddForm.querySelector('.popup__input_el_place-title');
const placeLinkInput = placeAddForm.querySelector('.popup__input_el_place-link');

const cardsContainer = document.querySelector('.places__container');

function formReset (formElement) { // функция очистки полей формы
  formElement.reset();
}

function closePopup() { // функция закрытия popup
  popupOpened.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscPress); // удаление слушателя для событий
}                                                              // клавиатуры при закрытии popup

const closePopupEscPress = (ev) => { // функция закрытия popup
  if (ev.key === "Escape") {         // при клике на клавишу Esc
    closePopup();
  }
};

export default function openPopup(popup) { // функция открытия popup
  popupOpened = popup; // добавляем, открываемый popup в переменную popupOpened -
                      // чтобы в коде не искать потом через document.querySelector(.popup__opened)
  popup.classList.add('popup_opened'); // класс, отвечающий за открытие popup
  document.addEventListener('keydown', closePopupEscPress); // закрыть popup по клику на Esc
}

function editProfile() { // функция получения данных профиля в input-ы формы редактирования информации
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecialty.textContent;
  const formValidator = new FormValidator (FormValidator.validationData, profileEditForm);
  formValidator.enableValidation();
  formValidator.resetErrors(popupEditForm); // сбрасываем ошибки валидации input-ов
  openPopup(popupEditForm); // открываем popup редактирования информации
}

function editNewCardData() { // функция открытия формы для добавления новой карточки
  formReset(placeAddForm); // очистка полей формы
  const formValidator = new FormValidator (FormValidator.validationData, placeAddForm);
  formValidator.enableValidation();
  formValidator.resetErrors(popupAddForm); // сбрасываем ошибки валидации input-ов
  openPopup(popupAddForm);
}

function addCardFromBox (boxMassive) { // функция добавления карточек-мест из массива данных (название, ссылка на картинку)
  boxMassive.forEach ((el) => {
    const card = new Card(el, '#card-template');
    cardsContainer.append(card.generateCard());
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
  const card = new Card(valuesToCreateCard, '#card-template');
  cardsContainer.prepend(card.generateCard()); // функция добавления новой карточки
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
  popup.addEventListener('mousedown', (ev) => { // добавить слушателя на каждый popup на странице
    if (ev.currentTarget === ev.target) { // для закрытия popup при клике по затемненой области (оверлэю)
      closePopup();
    }
  });
});
profileEditForm.addEventListener('submit', editProfileFormSubmit); // слушатель на подтверждение введенных данных формы для редактирования профиля
placeAddForm.addEventListener('submit', addPlaceFormSubmit); // слушатель на подтверждение введенных данных формы для создания новой карточки
