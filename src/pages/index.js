import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import EditButton from '../components/EditButton.js';

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

// создание экземпляра класса UserInfo
const userInfo = new UserInfo('.profile__name', '.profile__specialty');

// создание popup-ов; добавление обработчиков popup-ам и их элементам
const popupImgScaled = new PopupWithImage('#popupImgScaled');
popupImgScaled.setEventListeners();

const popupEditForm = new PopupWithForm('#popupEditForm', {handleFormSubmit: (ev) => {
  ev.preventDefault();
  userInfo.setUserInfo(popupEditForm._getInputValues());
  popupEditForm.close();
}
});
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm('#popupAddForm', {handleFormSubmit: (ev) => {
  ev.preventDefault();
  const [name, link] = popupAddForm._getInputValues(); // сохраняем значения inputов, введеных пользователем
  const valuesToCreateCard = new Object();
  valuesToCreateCard.name = name;
  valuesToCreateCard.link = link;
  const dataToCreateCard = new Array();
  dataToCreateCard.push(valuesToCreateCard);
  const newCard = new Section({items: dataToCreateCard, renderer: (item) => {
    const card = new Card(item, '#card-template', handleCardClick);
    const cardElement = card.generateCard();
    newCard.addItem(cardElement);
  }
  }, '.places__container');
  newCard.renderItems(); // рендерим карточку с помощью класса Section
  popupAddForm._resetForm(); // очищаем поля ввода у формы добавления карточки перед закрытием
  popupAddForm.close();
}
});
popupAddForm.setEventListeners();

// создание экземпляров классов FormValidator для каждой из форм на странице
// включение валидации каждой из форм на странице, используя публичную функцию enableValidation() класса FormValidator
const profileEditFormValidator = new FormValidator (FormValidator.validationData, popupEditForm._getFormElement());
profileEditFormValidator.enableValidation();
const placeAddFormValidator = new FormValidator (FormValidator.validationData, popupAddForm._getFormElement());
placeAddFormValidator.enableValidation();

// создаем экземпляры класса кнопок редактирования информации; добавляем обработчики на кнопки
const profileEditButton = new EditButton ('.profile__edit-button', {handleEditButtonClick: () => {
  popupEditForm._setInputValues(userInfo.getUserInfo()); // добавляем userInfo в значения инпутов формы
  profileEditFormValidator.resetValidationErrors(); // сбрасываем ошибки валидации input-ов
  popupEditForm.open(); // открываем popup редактирования информации
}
});
profileEditButton.setEventListeners();

const profileAddButton = new EditButton ('.profile__add-button', {handleEditButtonClick: () => {
  popupAddForm._resetForm(); // очистка полей формы
  placeAddFormValidator.resetValidationErrors(); // сбрасываем ошибки валидации input-ов
  popupAddForm.open();
}
});
profileAddButton.setEventListeners();

// функция добавления увеличенного изображения карточки
// в popup для 'изображений с исходным соотношением сторон/размером'
export default function handleCardClick(cardsData) {
  popupImgScaled.open(cardsData);
}

// добавление карточек на страницу при первой загрузке с помощью
// класса Section и его методов
const cardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, '#card-template', handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}
}, '.places__container');

cardList.renderItems();
