import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._formElement =  this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._formElement.querySelector('.popup__button');
    this._inputElements = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._handleFormSubmit = handleFormSubmit;
  }

  _resetForm() {
    this._formElement.reset();
  }

  // для popup-ов с формами расширяем метод close()
  // для сброса значений форм при закрытии
  close() {
    super.close();
    this._resetForm();
  }

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
    super.setEventListeners();
    this._formElement.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._buttonSubmit);
    });
  }
}
