import openPopup from "./index.js";

class Card {
  constructor(templateSelector) {
    this._templateSelector = templateSelector;
  }

    _getTemplate() { // функция получения разметки карточки из template-элемента html
      const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

      return cardElement;
    }

    generateCard(cardsData) { // функция создания и наполнения карточки данными
      this._cardElement = this._getTemplate();
      this._setEventListners(cardsData);

      const cardImg = this._cardElement.querySelector('.card__img');
      const cardTitle = this._cardElement.querySelector('.card__title');

      cardImg.src = cardsData.link;
      cardImg.alt = cardsData.name.toLowerCase();
      cardTitle.textContent = cardsData.name;

      return this._cardElement;
    }

    _toggleLikeButtonActiveClass(ev) { // функция удаления/добавления активного класса для 'card__like-button'
      const target = ev.target;
      target.classList.toggle('card__like-button_active');
    }

    _deleteCard(ev) { // функция удаления карточки
      const target = ev.target;
      target.closest('.card').remove();
    }

    _addScaledImgDataToPopup(cardsData) { // функция добавления увеличенного изображения карточки
      // в popup для 'изображений с исходным соотношением сторон/размером'
      const scaledImg = document.querySelector('.scaled-images-container__img');
      const scaledImgTitle = document.querySelector('.scaled-images-container__title');

      scaledImg.src = cardsData.link;
      scaledImg.alt = cardsData.name.toLowerCase();
      scaledImgTitle.textContent = cardsData.name;
    }

    _setEventListners(cardsData) { // функция добавления обработчиков элементам карточки
      const popupImgScaled = document.querySelector('#popupImgScaled');

      this._cardElement.querySelector('.card__like-button')
      .addEventListener('click', this._toggleLikeButtonActiveClass);

      this._cardElement.querySelector('.card__del-button')
      .addEventListener('click', this._deleteCard);

      this._cardElement.querySelector('.card__img')
      .addEventListener('click', () => {
        this._addScaledImgDataToPopup(cardsData);
        openPopup(popupImgScaled);
      });
    }
}

const card = new Card('#card-template'); // создание экземпляра класса Card

export default card; // экспорт созданного экземпляра класса Card
