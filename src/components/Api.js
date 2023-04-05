export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkServerResponseState(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => this._checkServerResponseState(res));
  }

  addNewCard(data) {
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then((res) => this._checkServerResponseState(res));
  }

  deleteCard(cardId) {
    return fetch(this._url + `/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => this._checkServerResponseState(res));
  }

  getUserInfo() {
    return fetch(this._url.slice(0,-5) + "users/me", {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => this._checkServerResponseState(res));
  }

  updateUserInfo(name, about) {
    return fetch(this._url.slice(0,-5) + "users/me", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => this._checkServerResponseState(res));
  }

  updateUserAvatar(avatarLink) {
    return fetch(this._url.slice(0,-5) + "users/me/avatar", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then((res) => this._checkServerResponseState(res));
  }

  setLike(cardId) {
    return fetch(this._url + `/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((res) => this._checkServerResponseState(res));
  }

  deleteLike(cardId) {
    return fetch(this._url + `/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => this._checkServerResponseState(res));
  }

}
