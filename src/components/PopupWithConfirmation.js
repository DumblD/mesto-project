import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement =  this._popup.querySelector('.popup__form');
  }

  setSubmitAction(submitFunction) {
    this._formSubmitAction = submitFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this._formSubmitAction();
    });
  }
}
