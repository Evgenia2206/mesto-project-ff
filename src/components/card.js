import { like, dislike } from './api.js';
const cardTemplate = document.querySelector('#card-template').content;

// Функция загрузки массива карточек
export function createCard(userId, cardData, deleteCardOpening, openImageModal, cardLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  deleteButton.addEventListener('click', () => deleteCardOpening(cardData._id, cardElement));
  cardImage.addEventListener('click', () => openImageModal(cardData.link, cardData.name));
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const isLiked = cardData.likes.some((like) => like._id === userId);
  // Проверка, чей лайк стоит
  if (isLiked) { likeButton.classList.add("card__like-button_is-active"); }
  likeCounter.textContent = cardData.likes.length;
  likeButton.addEventListener('click', () => cardLike(cardData._id, likeButton, likeCounter));
  // Блокировка удаления чужой карточки
  if (cardData.owner._id !== userId) {
    deleteButton.disabled = true;
    deleteButton.style.display = "none";
  }
  return cardElement;
};

// Функция изменения статуса лайка карточки
export function cardLike(cardId, likeBtn, counter) {
  const setLike = (likeBtn.classList.contains('card__like-button_is-active') ? dislike : like
  );
  setLike(cardId)
    .then((res) => {
      likeBtn.classList.toggle('card__like-button_is-active');
      counter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

/*export const handleLikeIconClick = (cardID, likeButton, likesCount) => { // ожидаем те три аргумента: id, элемент кнопки и количество лайков
  const isLiked = likeButton.classList.contains("card__like-button_is-active"); // проверяем, содержит ли кнопка по которой кликнули класс активности, то есть что сердечко лайкнуто
  changeLikeCardStatus(cardID, !isLiked) // вызываем функцию лайка/дизлайка из api.js. В моем случае я объеденил в одну функцию, где в зависимости от isLiked выбираю метод DELETE или PUT. Вы можете сделать if else прямо здесь и вызывать функции лайка/дизлайка.
    .then((cardData) => {
      likeButton.classList.toggle("card__like-button_is-active"); // обновляем состояние лайкнутости на нашей кнопке
      likesCount.textContent = cardData.likes.length; // обновляем счетчик лайков
    })
    .catch((err) => console.log(`Ошибка изменения статуса лайка: ${err}`)); // обработчик ошибки
};*/