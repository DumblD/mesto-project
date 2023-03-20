export default class UserInfo {
  constructor(profileNameSelector, profileSpecialtySelector) {
    this._name = document.querySelector(profileNameSelector);
    this._specialty = document.querySelector(profileSpecialtySelector);
    this._profileDataObj = new Object();
  }
  getUserInfo() {
    this._profileDataObj.name = this._name.textContent;
    this._profileDataObj.specialty = this._specialty.textContent;
    return this._profileDataObj;
  }
  setUserInfo([name, specialty]) {
    this._name.textContent = name;
    this._specialty.textContent = specialty;
  }
}
