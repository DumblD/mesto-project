export default class Card {
  constructor(cardsData, templateSelector, handleCardClick) {
    this._cardsData = cardsData;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
      this._cardImage = this._cardElement.querySelector('.card__img');
      this._cardTitle = this._cardElement.querySelector('.card__title');

      this._setEventListners(this._cardsData);

      this._cardImage.src = this._cardsData.link;
      this._cardImage.alt = this._cardsData.name.toLowerCase();
      this._cardTitle.textContent = this._cardsData.name;

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

    _setEventListners() { // функция добавления обработчиков элементам карточки
      this._cardElement.querySelector('.card__like-button')
      .addEventListener('click', this._toggleLikeButtonActiveClass);

      this._cardElement.querySelector('.card__del-button')
      .addEventListener('click', this._deleteCard);

      this._cardElement.querySelector('.card__img')
      .addEventListener('click', () => {
        this._handleCardClick(this._cardsData);
      });
    }
}
