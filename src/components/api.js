// Данные авторизации
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
    headers: {
      authorization: '74821ecb-efe6-41b1-bdb6-68b280a71ee3',
      'Content-Type': 'application/json',
    },
  };

// Получение ответа
function getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Упс! Что-то пошло не так: ${res.status}`);
    }
  };

// Загрузка информации о пользователе с сервера
export function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(getResponse)
};

// Загрузка карточек с сервера
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
};

// Редактирование профиля
export function editUserData(userName, userAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    })
  })
    .then(getResponse);
};

// Добавление новой карточки
export function addNewCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    })
  })
    .then(getResponse);
};

// Удаление собственной карточки
export function removeMyCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(getResponse)
}

// Постановка лайка
export function like(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(getResponse);
};

// Снятие лайка
export function dislike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(getResponse);
};