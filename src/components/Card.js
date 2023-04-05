export default class Card {
  constructor(cardsData, templateSelector, handleCardClick, {openPopupConfirmationDel}, userId, api) {
    this._myId = userId; // записываем свой Id. Передаём в конструктор, чтобы не запрашивать
                         // для каждой карточки по новой
    this._cardsData = cardsData;
    this._cardId = this._cardsData._id;
    this._ownerId = this._cardsData.owner._id;
    this._likesArray = this._cardsData.likes;
    this._likesAmount = this._cardsData.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupConfirmationDel = openPopupConfirmationDel;
    this._api = api;
    this._myLikeCount = 0; // чтобы не использовать повторно chekForOwnLikes() на 45 строке
  }

  _chekForOwnLikes() { // функция проверки на свои лайки
    return this._likesArray.some((el) => {
      return el._id === this._myId;
    })
  }

  _isOwner() { // функция проверки - своя ли карточка
    if (this._ownerId === this._myId) {
      return true;
    } else {
      return false;
    }
  }

  _getTemplate() { // функция получения разметки карточки из template-элемента html
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLikes() {
    if (this._myLikeCount === 0) {
      this._api.setLike(this._cardId)
      .then((cardData) => {
        this._likesArray = cardData.likes;
        this._likesAmount = cardData.likes.length;
        this._likeCounter.textContent = this._likesAmount;
      })
      .catch((err) => alert(err));
      this._toggleLikeButtonActiveClass();
      this._myLikeCount++;
    } else {
      this._api.deleteLike(this._cardId)
      .then((cardData) => {
        this._likesArray = cardData.likes;
        this._likesAmount = cardData.likes.length;
        if (this._likesAmount) {
          this._likeCounter.textContent = this._likesAmount;
        } else {
          this._likeCounter.textContent = '';
        }
      })
      .catch((err) => alert(err));
      this._toggleLikeButtonActiveClass();
      this._myLikeCount--;
    }
  }

  generateCard() { // функция создания и наполнения карточки данными
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__img');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._buttonLike = this._cardElement.querySelector('.card__like-button');
    this._likeCounter = this._cardElement.querySelector('.card__like-counter');
    this._buttonDel = this._cardElement.querySelector('.card__del-button');

    // если не своя карточка - удалить кнопку удаления карточки
    if (!this._isOwner()) {
      this._buttonDel.remove();
    }

    this._setEventListners(this._cardsData);

    // если есть свои лайки - передать лайку класс активного состояния
    if (this._chekForOwnLikes()) {
      this._toggleLikeButtonActiveClass();
      this._myLikeCount++;
    }

    // показать количество лайков
    if (this._likesAmount !== 0) {
      this._likeCounter.textContent = this._likesAmount;
    }
    this._cardImage.src = this._cardsData.link;
    this._cardImage.alt = this._cardsData.name.toLowerCase();
    this._cardTitle.textContent = this._cardsData.name;

    return this._cardElement;
  }

  deleteCard() { // функция удаления карточки
    this._api.deleteCard(this._cardId)
    .then(() => {
      this._buttonDel.closest('.card').remove();
    })
    .catch((err) => alert(err));
  }

  _toggleLikeButtonActiveClass = () => { // функция удаления/добавления активного класса для 'card__like-button'
    this._buttonLike.classList.toggle('card__like-button_active');
  }

  _setEventListners() { // функция добавления обработчиков элементам карточки
    this._buttonLike
      .addEventListener('click', () => {
        this._toggleLikes();
      })

    if (this._isOwner()) {
      this._buttonDel
        .addEventListener('click', () => {
          this._openPopupConfirmationDel();
        });
    }

    this._cardImage
      .addEventListener('click', () => {
        this._handleCardClick(this._cardsData);
      });
  }
}
