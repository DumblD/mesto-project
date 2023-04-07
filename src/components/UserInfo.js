export default class UserInfo {
  constructor({nameSelector, specialtySelector, imgSelector}, {handleSetUserInfo, handleupdateAvatar}) {
    this.profileName = document.querySelector(nameSelector);
    this.profileSpecialty = document.querySelector(specialtySelector);
    this.profileAvatar = document.querySelector(imgSelector);
    this.setUserInfo = handleSetUserInfo;
    this.updateAvatar = handleupdateAvatar;
    this._userInfo = new Object();
  }

  getUserInfo() {
    this._userInfo.name = this.profileName.textContent;
    this._userInfo.specialty = this.profileSpecialty.textContent;
    return this._userInfo;
  }
}
