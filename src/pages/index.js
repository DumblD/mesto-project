import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import EditButton from '../components/EditButton.js';
import {validationData} from '../utils/constants.js'
import {initialCards} from '../utils/initialCards.js'

//создание экземпляра класса Section
const cardList = new Section({renderer: (item) => {
  const card = new Card(item, '#card-template', handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}
}, '.places__container');

// создание экземпляра класса UserInfo
const userInfo = new UserInfo('.profile__name', '.profile__specialty');

// создание popup-ов; добавление обработчиков popup-ам и их элементам
const popupImgScaled = new PopupWithImage('#popupImgScaled');
popupImgScaled.setEventListeners();

const popupEditForm = new PopupWithForm('#popupEditForm', {handleFormSubmit: (ev, inputValues) => {
  ev.preventDefault();
  userInfo.setUserInfo(inputValues);
  popupEditForm.close();
}
});
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm('#popupAddForm', {handleFormSubmit: (ev, inputValues) => {
  ev.preventDefault();
  const {placeTitle: name, placeLink: link} = inputValues;
  const valuesToCreateCard = new Object();
  valuesToCreateCard.name = name;
  valuesToCreateCard.link = link;
  const dataToCreateCard = new Array();
  dataToCreateCard.push(valuesToCreateCard);
  cardList.renderItems({items: dataToCreateCard}); // рендерим карточку с помощью класса Section
  popupAddForm.close();
}
});
popupAddForm.setEventListeners();

// создание экземпляров классов FormValidator для каждой из форм на странице
// включение валидации каждой из форм на странице, используя публичную функцию enableValidation() класса FormValidator
const profileEditFormValidator = new FormValidator (validationData, popupEditForm.getFormElement());
profileEditFormValidator.enableValidation();
const placeAddFormValidator = new FormValidator (validationData, popupAddForm.getFormElement());
placeAddFormValidator.enableValidation();

// создаем экземпляры класса кнопок редактирования информации; добавляем обработчики на кнопки
const profileEditButton = new EditButton ('.profile__edit-button', {handleEditButtonClick: () => {
  popupEditForm.setInputValues(userInfo.getUserInfo()); // добавляем userInfo в значения инпутов формы
  profileEditFormValidator.resetValidationErrors(); // сбрасываем ошибки валидации input-ов
  popupEditForm.open(); // открываем popup редактирования информации
}
});
profileEditButton.setEventListeners();

const profileAddButton = new EditButton ('.profile__add-button', {handleEditButtonClick: () => {
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
cardList.renderItems({items: initialCards});
