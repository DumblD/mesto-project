export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close-button');
    this._escClose = (ev) => {this._handleEscClose(ev)};
  }

  _handleEscClose(ev) { // функция закрытия popup
    if (ev.key === "Escape") { // при клике на клавишу Esc
      this.close();
    }
  };

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', (ev) => {
      if (ev.currentTarget === ev.target) { // для закрытия popup при клике по затемненой области (оверлэю)
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._escClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._escClose);
  }
}
