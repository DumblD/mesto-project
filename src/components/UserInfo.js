export default class UserInfo {
  constructor(profileDataSelectors, api) {
    this._name = document.querySelector(profileDataSelectors.nameSelector);
    this._specialty = document.querySelector(profileDataSelectors.specialtySelector);
    this._avatar = document.querySelector(profileDataSelectors.imgSelector);
    this._profileDataObj = new Object();
    this._api = api;
  }

  loadUserInfo() {
    return this._api.getUserInfo()
    .then((userInfo) => {
      this._name.textContent = userInfo.name;
      this._specialty.textContent = userInfo.about;
      this._avatar.style.backgroundImage = 'url('+ `${userInfo.avatar}` +')';
      this.userId = userInfo._id;
      this._userCohort = userInfo.cohort;
    })
  }

  getUserInfo() {
    this._profileDataObj.name = this._name.textContent;
    this._profileDataObj.specialty = this._specialty.textContent;
    return this._profileDataObj;
  }

  setUserInfo({name, specialty}) {
    return this._api.updateUserInfo(name, specialty)
    .then(() => {
      this._name.textContent = name;
      this._specialty.textContent = specialty;
    })
  }

  updateAvatar(avatarLink) {
    return this._api.updateUserAvatar(avatarLink)
    .then(() => {
      this._avatar.style.backgroundImage = "url(" + `${avatarLink}` + ")";
    })
  }
}
