import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._scaledImg = this._popup.querySelector('.scaled-images-container__img');
    this._scaledImgTitle = this._popup.querySelector('.scaled-images-container__title');
  }
  open({link, name}) {
    this._scaledImg.src = link;
    this._scaledImg.alt = name.toLowerCase();
    this._scaledImgTitle.textContent = name;
    super.open();
  }
}
