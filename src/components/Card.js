export default class Card {
  constructor(
    cardsData,
    templateSelector,
    {
      handleCardImgClick,
      openPopupConfirmationDel,
      handleToggleLikes,
      handleDeleteCard
    },
    userId
  ) {
    this._myId = userId; // записываем свой Id. Передаём в конструктор, чтобы не запрашивать
                         // для каждой карточки по новой
    this._cardsData = cardsData;
    this.cardId = this._cardsData._id;
    this._ownerId = this._cardsData.owner._id;
    this.likesArray = this._cardsData.likes;
    this.likesAmount = this._cardsData.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardImgClick = handleCardImgClick;
    this._openPopupConfirmationDel = openPopupConfirmationDel;
    this._toggleLikes = handleToggleLikes;
    this.deleteCard = handleDeleteCard;
    this.myLikeCount = 0; // чтобы не использовать повторно chekForOwnLikes() на 45 строке
  }

  _chekForOwnLikes() { // функция проверки на свои лайки
    return this.likesArray.some((el) => {
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

  generateCard() { // функция создания и наполнения карточки данными
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__img');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._buttonLike = this._cardElement.querySelector('.card__like-button');
    this._buttonDel = this._cardElement.querySelector('.card__del-button');
    this.likeCounter = this._cardElement.querySelector('.card__like-counter');

    // если не своя карточка - удалить кнопку удаления карточки
    if (!this._isOwner()) {
      this._buttonDel.remove();
    }

    this._setEventListners(this._cardsData);

    // если есть свои лайки - передать лайку класс активного состояния
    if (this._chekForOwnLikes()) {
      this.toggleLikeButtonActiveClass();
      this.myLikeCount++;
    }

    // показать количество лайков
    if (this.likesAmount !== 0) {
      this.likeCounter.textContent = this.likesAmount;
    }
    this._cardImage.src = this._cardsData.link;
    this._cardImage.alt = this._cardsData.name.toLowerCase();
    this._cardTitle.textContent = this._cardsData.name;

    return this._cardElement;
  }

  toggleLikeButtonActiveClass = () => { // функция удаления/добавления активного класса для 'card__like-button'
    this._buttonLike.classList.toggle('card__like-button_active');
  }

  _setEventListners() { // функция добавления обработчиков элементам карточки
    this._buttonLike
      .addEventListener('click', () => {
        this._toggleLikes();
      })

    if (this._isOwner()) {
      this._buttonDel
        .addEventListener('click', (ev) => {
          const buttonDelCard = ev.target;
          this._openPopupConfirmationDel(buttonDelCard);
        });
    }

    this._cardImage
      .addEventListener('click', () => {
        this._handleCardImgClick(this._cardsData);
      });
  }
}
