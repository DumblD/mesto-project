import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._formElement =  this._popup.querySelector('.popup__form');
    this._inputElements = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = this._inputElements.map((input) => {
      return input.value;
    });
    return inputValues;
  }

  _setInputValues({name, specialty}) {
    this._inputElements[0].value = name;
    this._inputElements[1].value = specialty;
  }

  _resetForm() {
    this._formElement.reset();
  }

  _getFormElement() {
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
    this._formElement.addEventListener('submit', (ev) => {this._handleFormSubmit(ev)});
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._escClose);
    this._resetForm();
  }
}
