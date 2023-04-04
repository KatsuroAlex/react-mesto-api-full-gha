import { BASE_URL } from "./Url";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._avatarUrl = `${this._baseUrl}/users/me/avatar`;
    this._likesUrl = `${this._baseUrl}/cards/cardId/likes`;
    // this._headers = headers;
    this._token = headers['authorization'];
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  //////// загружаем данные пользователя с сервера
  getProfileData() {
    return fetch(this._userUrl, {
      method: "GET",
      // headers: this._headers,
      headers: {
        authorization: this._token,
      },
      credentials: 'include',
    }).then((res) => this._getResponseData(res));
  }

  //////// сохраняем данные пользователя (профиль) на сервере
  setUserInfo({ name, about }) {
    return fetch(this._userUrl, {
      method: "PATCH",
      // headers: this._headers,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._getResponseData(res));
  }


  ////////// сохраняем аватар пользователя (профиль) на сервере
  setUserAvatar(src) {
    return fetch(`${this._userUrl}/avatar`, {
      method: "PATCH",
      // headers: this._headers,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        avatar: src,
      }),
    }).then((res) => this._getResponseData(res));
  }


  //////// загружаем карточки с сервера
  getInitialCards() {
    return fetch(this._cardsUrl, {
      // headers: this._headers,
      headers: {
        authorization: this._token,
      },
      credentials: 'include',
    }).then((res) => this._getResponseData(res));
  }

    //////// добавляем новую карточку на сервер
    postNewCard({ name, link }) {
      return fetch(this._cardsUrl, {
        method: "POST",
        // headers: this._headers,
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      }).then((res) => this._getResponseData(res));
    }

  ///////удаление карточки пользователя с сервера
  deleteCard(id) {
    console.log(id);
    return fetch(`${this._cardsUrl}/${id}`, {
      method: "DELETE",
      // headers: this._headers,
      headers: {
        authorization: this._token,
      },
      credentials: 'include',
    }).then((res) => this._getResponseData(res));
  }

  //////////установка лайка карточке
  changeLikeCardStatus(cardId, isNotLiked) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: isNotLiked ? "PUT" : "DELETE",
      // headers: this._headers,
      headers: {
        authorization: this._token,
      },
      credentials: 'include',
    }).then((res) => this._getResponseData(res));
  }

}

// const api = new Api({
//   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
//   headers: {
//     authorization: "0cd386ae-1830-42e7-aefa-1c5dfe1b78a1",
//     "Content-Type": "application/json",
//   },
// });
    // authorization: `Bearer ${localStorage.getItem('token')}`,



const api = new Api({
  baseUrl: BASE_URL,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
