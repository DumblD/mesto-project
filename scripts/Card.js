import openPopup from "./index.js"; // импорт функции открытия popup

class Card {
  constructor(cardsData, templateSelector) {
    this._cardsData = cardsData;
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

    generateCard() { // функция создания и наполнения карточки данными
      this._cardElement = this._getTemplate();
      this._setEventListners(this._cardsData);

      const cardImg = this._cardElement.querySelector('.card__img');
      const cardTitle = this._cardElement.querySelector('.card__title');

      cardImg.src = this._cardsData.link;
      cardImg.alt = this._cardsData.name.toLowerCase();
      cardTitle.textContent = this._cardsData.name;

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

    _addScaledImgDataToPopup() { // функция добавления увеличенного изображения карточки
      // в popup для 'изображений с исходным соотношением сторон/размером'
      const scaledImg = document.querySelector('.scaled-images-container__img');
      const scaledImgTitle = document.querySelector('.scaled-images-container__title');

      scaledImg.src = this._cardsData.link;
      scaledImg.alt = this._cardsData.name.toLowerCase();
      scaledImgTitle.textContent = this._cardsData.name;
    }

    _setEventListners() { // функция добавления обработчиков элементам карточки
      const popupImgScaled = document.querySelector('#popupImgScaled');

      this._cardElement.querySelector('.card__like-button')
      .addEventListener('click', this._toggleLikeButtonActiveClass);

      this._cardElement.querySelector('.card__del-button')
      .addEventListener('click', this._deleteCard);

      this._cardElement.querySelector('.card__img')
      .addEventListener('click', () => {
        this._addScaledImgDataToPopup(this._cardsData);
        openPopup(popupImgScaled);
      });
    }
}

export default Card; // экспорт созданного класса Card
