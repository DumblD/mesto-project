export default class UserInfo {
  constructor({nameSelector, specialtySelector, imgSelector}) {
    this.profileName = document.querySelector(nameSelector);
    this.profileSpecialty = document.querySelector(specialtySelector);
    this.profileAvatar = document.querySelector(imgSelector);
    this._userInfo = new Object();
  }

  getUserInfo() {
    this._userInfo.name = this.profileName.textContent;
    this._userInfo.specialty = this.profileSpecialty.textContent;
    return this._userInfo;
  }

  setUserInfo({ name, about }) {
    this.profileName.textContent = name;
    this.profileSpecialty.textContent = about;
  }
}
