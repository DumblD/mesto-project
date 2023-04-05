import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import EditButton from '../components/EditButton.js';
import { validationData } from '../utils/constants.js';
import { profileDataSelectors } from '../utils/constants.js';

function renderLoading(isLoading, buttonSubmit) {
  if (isLoading) {
    buttonSubmit.textContent = `${buttonSubmit.textContent}…`;
  } else {
    buttonSubmit.textContent = `${buttonSubmit.textContent.slice(0,-1)}`;
  }
}

// функция добавления увеличенного изображения карточки
// в popup для 'изображений с исходным соотношением сторон/размером'
function handleCardClick(cardsData) {
  popupImgScaled.open(cardsData);
}

function createCardItem(inputValuesObj) {
  const card = new Card(inputValuesObj, '#card-template', handleCardClick, {openPopupConfirmationDel: () => {
    popupConfirmDelCard.open();
    popupConfirmDelCard.setSubmitAction(() => card.deleteCard());
  }}, userInfo.userId, api);
  return card.generateCard();
}

// создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62/cards',
  headers: {
    authorization: 'f8467b0b-f7fd-4121-966e-12a5314122ec',
    'Content-Type': 'application/json'
  }
});

// создание экземпляра класса UserInfo
const userInfo = new UserInfo(profileDataSelectors, api);
userInfo.loadUserInfo()
.catch((err) => alert(err));

//создание экземпляра класса Section
const cardList = new Section({renderer: (item) => {
  const card = createCardItem(item);
  cardList.addItem(card);
}
}, '.places__container');

// создание popup-ов; добавление обработчиков popup-ам и их элементам
const popupImgScaled = new PopupWithImage('#popupImgScaled');
popupImgScaled.setEventListeners();

const popupEditForm = new PopupWithForm('#popupEditForm', {handleFormSubmit: (inputValues, buttonSubmit) => {
  renderLoading(true, buttonSubmit);
  userInfo.setUserInfo(inputValues)
  .finally(() => {
    renderLoading(false, buttonSubmit);
    popupEditForm.close();
  })
  .catch((err) => alert(err));
}
});
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm('#popupAddForm', {handleFormSubmit: (inputValues, buttonSubmit) => {
  const {placeTitle: name, placeLink: link} = inputValues;
  const valuesToCreateCard = {owner: {}};
  valuesToCreateCard.name = name;
  valuesToCreateCard.link = link;
  renderLoading(true, buttonSubmit);
  const newCard = api.addNewCard(valuesToCreateCard);
  newCard.then((cardsData) => {
    valuesToCreateCard._id = cardsData._id;
    valuesToCreateCard.owner._id = cardsData.owner._id;
    valuesToCreateCard.likes = cardsData.likes;
    cardList.addItem(createCardItem(valuesToCreateCard)); // рендерим карточку с помощью экземпляра класса Section
  })
  .finally(() => {
    renderLoading(false, buttonSubmit);
    popupAddForm.close();
  })
  .catch((err) => alert(err));
}
});
popupAddForm.setEventListeners();

const popupUpdateAvatar = new PopupWithForm('#popupUpdateAvatar', {handleFormSubmit: (inputValues, buttonSubmit) => {
  const {avatarLink} = inputValues;
  renderLoading(true, buttonSubmit);
  userInfo.updateAvatar(avatarLink)
  .finally(() => {
    renderLoading(false, buttonSubmit);
    popupUpdateAvatar.close();
  })
  .catch((err) => alert(err));
}
});
popupUpdateAvatar.setEventListeners();

const popupConfirmDelCard = new PopupWithConfirmation('#popupConfirmDelCard');
popupConfirmDelCard.setEventListeners();

// создание экземпляров классов FormValidator для каждой из форм на странице
// включение валидации каждой из форм на странице, используя публичную функцию enableValidation() класса FormValidator
const profileEditFormValidator = new FormValidator (validationData, popupEditForm.getFormElement());
profileEditFormValidator.enableValidation();
const placeAddFormValidator = new FormValidator (validationData, popupAddForm.getFormElement());
placeAddFormValidator.enableValidation();
const avatarUpdateFormValidator = new FormValidator (validationData, popupUpdateAvatar.getFormElement());
avatarUpdateFormValidator.enableValidation();

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

const profileImgEditButton = new EditButton ('.profile__img-edit-button', {handleEditButtonClick: () => {
  avatarUpdateFormValidator.resetValidationErrors(); // сбрасываем ошибки валидации input-ов
  popupUpdateAvatar.open();
}
});
profileImgEditButton.setEventListeners();

// добавление карточек на страницу при первой загрузке
const initialCards = api.getInitialCards();
initialCards
.then((data) => {
  data.reverse();
  cardList.renderItems({ items: data });
})
.catch((err) => alert(err));
