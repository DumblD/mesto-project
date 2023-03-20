export default class EditButton {
  constructor(editButtonSelector, {handleEditButtonClick}) {
    this._editButton = document.querySelector(editButtonSelector);
    this._handleEditButtonClick = handleEditButtonClick;
  }
  setEventListeners() {
    this._editButton.addEventListener('click', this._handleEditButtonClick);
  }
}
