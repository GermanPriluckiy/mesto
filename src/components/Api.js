export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }



//Получение карточек с сервера
getInitialCards() {
  return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });

}

//Получение информации о пользователе
getUserInfoFromServer() {
  return fetch('https://nomoreparties.co/v1/cohort-62/users/me', {
    headers: this._headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
      }
      else {
      return Promise.reject(`Ошибка: ${res.status}`);
      }

  })
  .catch((err) => {
    console.log(err);
  });

}
}



