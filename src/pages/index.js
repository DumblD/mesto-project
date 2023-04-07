import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import renderLoading from '../utils/constants.js';
import { validationData } from '../utils/constants.js';
import { profileDataSelectors } from '../utils/constants.js';
import { profileEditButton, profileAddButton, profileImgEditButton } from '../utils/constants.js';

function createCardItem(inputValuesObj) {
  const card = new Card(inputValuesObj,
    '#card-template',
    {
      handleCardImgClick: (cardsData) => {
        popupImgScaled.open(cardsData);
      },
      openPopupConfirmationDel: (buttonDelCard) => {
        popupConfirmDelCard.open();
        popupConfirmDelCard.setSubmitAction(() => card.deleteCard(buttonDelCard));
      },
      handleToggleLikes: () => {
        if (card.myLikeCount === 0 || !Boolean(card.myLikeCount)) {
          api.setLike(card.cardId)
            .then((cardData) => {
              card.likesArray = cardData.likes;
              card.likesAmount = cardData.likes.length;
              card.likeCounter.textContent = card.likesAmount;
              card.myLikeCount++;
              card.toggleLikeButtonActiveClass();
            })
            .catch((err) => alert(err));
        } else {
          api.deleteLike(card.cardId)
            .then((cardData) => {
              card.likesArray = cardData.likes;
              card.likesAmount = cardData.likes.length;
              if (card.likesAmount) {
                card.likeCounter.textContent = card.likesAmount;
              } else {
                card.likeCounter.textContent = '';
              }
              card.myLikeCount--;
              card.toggleLikeButtonActiveClass();
            })
            .catch((err) => alert(err));
        }
      },
      handleDeleteCard: (buttonDelCard) => {
        api.deleteCard(card.cardId)
          .then(() => {
            buttonDelCard.closest('.card').remove();
          })
          .then(() => {
            popupConfirmDelCard.close();
          })
          .catch((err) => alert(err));
      }
    },
    userInfo.userId);
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
const userInfo = new UserInfo(
  profileDataSelectors,
  {
    handleSetUserInfo: ({ name, specialty }) => {
      // поскольку проверка форм уже осуществляется на стороне клиента -
      // проверяем пришли ли значения с сервера
      if ((userInfo.profileName.textContent && userInfo.profileSpecialty.textContent)) {
        return api.updateUserInfo(name, specialty)
          .then(() => {
            userInfo.profileName.textContent = name;
            userInfo.profileSpecialty.textContent = specialty;
          })
      } else {
        return Promise.reject("Ошибка получения данных с сервера. Редактирование информации не возможно");
      }
    },
    handleupdateAvatar: (avatarLink) => {
      // поскольку проверка форм уже осуществляется на стороне клиента -
      // проверяем пришли ли значения с сервера
      if ((userInfo.profileAvatar.style.backgroundImage)) {
        return api.updateUserAvatar(avatarLink)
          .then(() => {
            userInfo.profileAvatar.style.backgroundImage = "url(" + `${avatarLink}` + ")";
          })
      } else {
        return Promise.reject("Ошибка получения данных с сервера. Редактирование информации не возможно");
      }
    }
  }
);

//создание экземпляра класса Section
const cardList = new Section({
  renderer: (item) => {
    const card = createCardItem(item);
    cardList.addItem(card);
  }
}, '.places__container');

// создание popup-ов; добавление обработчиков popup-ам и их элементам
const popupImgScaled = new PopupWithImage('#popupImgScaled');
popupImgScaled.setEventListeners();

const popupEditForm = new PopupWithForm('#popupEditForm', {
  handleFormSubmit: (inputValues, buttonSubmit) => {
    renderLoading(true, buttonSubmit);
    userInfo.setUserInfo(inputValues)
      .then(() => {
        popupEditForm.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        renderLoading(false, buttonSubmit);
      });
  }
});
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm('#popupAddForm', {
  handleFormSubmit: (inputValues, buttonSubmit) => {
    const { placeTitle: name, placeLink: link } = inputValues;
    const valuesToCreateCard = { owner: {} };
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
      .then(() => {
        popupAddForm.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        renderLoading(false, buttonSubmit);
      });
  }
});
popupAddForm.setEventListeners();

const popupUpdateAvatar = new PopupWithForm('#popupUpdateAvatar', {
  handleFormSubmit: (inputValues, buttonSubmit) => {
    const { avatarLink } = inputValues;
    renderLoading(true, buttonSubmit);
    userInfo.updateAvatar(avatarLink)
      .then(() => {
        popupUpdateAvatar.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        renderLoading(false, buttonSubmit);
      });
  }
});
popupUpdateAvatar.setEventListeners();

const popupConfirmDelCard = new PopupWithConfirmation('#popupConfirmDelCard');
popupConfirmDelCard.setEventListeners();

// создание экземпляров классов FormValidator для каждой из форм на странице
// включение валидации каждой из форм на странице, используя публичную функцию enableValidation() класса FormValidator
const profileEditFormValidator = new FormValidator(validationData, popupEditForm.getFormElement());
profileEditFormValidator.enableValidation();
const placeAddFormValidator = new FormValidator(validationData, popupAddForm.getFormElement());
placeAddFormValidator.enableValidation();
const avatarUpdateFormValidator = new FormValidator(validationData, popupUpdateAvatar.getFormElement());
avatarUpdateFormValidator.enableValidation();

// обработчики для кнопок редактирования информации
function profileEditButtonAction() {
  popupEditForm.setInputValues(userInfo.getUserInfo()); // добавляем userInfo в значения инпутов формы
  profileEditFormValidator.resetValidationErrors(); // сбрасываем ошибки валидации input-ов
  popupEditForm.open(); // открываем popup редактирования информации
}
function profileAddButtonAction() {
  placeAddFormValidator.resetValidationErrors(); // сбрасываем ошибки валидации input-ов
  popupAddForm.open();
}
function profileImgEditButtonAction() {
  avatarUpdateFormValidator.resetValidationErrors(); // сбрасываем ошибки валидации input-ов
  popupUpdateAvatar.open();
}
// вешаем обработчики на кнопки редактирования информации
profileEditButton.addEventListener('click', profileEditButtonAction);
profileAddButton.addEventListener('click', profileAddButtonAction);
profileImgEditButton.addEventListener('click', profileImgEditButtonAction);

const profileData = api.getUserInfo();
profileData
  .then(({ name, about, avatar, _id }) => {
    userInfo.profileName.textContent = name;
    userInfo.profileSpecialty.textContent = about;
    userInfo.profileAvatar.style.backgroundImage = 'url(' + `${avatar}` + ')';
    userInfo.userId = _id;
  })
  .catch((err) => alert(err));

// добавление карточек на страницу при первой загрузке
Promise.all([profileData])
  .then(() => {
    const initialCards = api.getInitialCards();
    initialCards
      .then((data) => {
        data.reverse();
        cardList.renderItems({ items: data });
      })
      .catch((err) => alert(err));
  })
  .catch((err) => { // снимаем обработчики у кнопок редактирования профиля,
    //если информация о пользователе не была загружена с сервера
    profileEditButton.removeEventListener('click', profileEditButtonAction);
    profileAddButton.removeEventListener('click', profileAddButtonAction);
    profileImgEditButton.removeEventListener('click', profileImgEditButtonAction);
    alert(err);
  });
