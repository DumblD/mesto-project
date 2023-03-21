import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._formElement =  this._popup.querySelector('.popup__form');
    this._inputElements = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._handleFormSubmit = handleFormSubmit;
  }

  _resetForm() {
    this._formElement.reset();
  }

    // для popup-ов с формами расширяем метод close()
  // для сброса значений форм при закрытии
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._escClose);
    this._resetForm();
  }

  _handleEscClose(ev) { // функция закрытия popup
    if (ev.key === "Escape") { // при клике на клавишу Esc
      this.close();  // для popup-ов с формами расширяем метод _handleEscClose()
    }                // для сброса значений форм при закрытии
  };    // используем не родительский close()

  _getInputValues() {
    const inputValues = new Object();
    this._inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(values) {
    this._inputElements.forEach((input) => {
      input.value = values[input.name];
    });
  }

  getFormElement() {
    return this._formElement;
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', (ev) => { // добавить слушателя на каждый popup на странице
      if (ev.currentTarget === ev.target) { // для закрытия popup при клике по затемненой области (оверлэю)
        this.close();
      }
    });
    this._formElement.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
