export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

//Получение карточек с сервера
getInitialCards() {
  return fetch(`${this._baseUrl}/cards`, {
    method: 'GET',
    headers: this._headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
  });

}

//Получение информации о пользователе
getUserInfoFromServer() {
  return fetch(`${this._baseUrl}/users/me`, {
    method: 'GET',
    headers: this._headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);

  });

}

//Редактирования информации профиля
setUserInfo(newName, newAbout) {
  return fetch(`${this._baseUrl}/users/me`, {
  method: 'PATCH',
  headers: this._headers,
  body: JSON.stringify({
    name: newName,
    about: newAbout
  })
})
.then((res) => {
  if (res.ok) {
    return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);

});

}
//Добавление новой карточки
addNewCard(cardName, cardLink) {
  return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);


  });

}
//Функция лайка
  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

dislikeCard(id) {
  return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    method: 'DELETE',
    headers: this._headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
  });
}
//Обновление аватара
updateAvatar(link) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: link,

    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);


  });

}

deleteCard(id) {
  return fetch(`${this._baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: this._headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}
}


