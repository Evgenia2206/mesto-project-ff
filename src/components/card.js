import { like, dislike } from './api.js';
const cardTemplate = document.querySelector('#card-template').content;

// Функция загрузки массива карточек
export function createCard(userId, cardData, deleteCardOpening, openImageModal, cardLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.addEventListener('click', () => openImageModal(cardData.link, cardData.name));
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const isLiked = cardData.likes.some((like) => like._id === userId);
  // Проверка, чей лайк стоит
  if (isLiked) { likeButton.classList.add("card__like-button_is-active"); }
  likeCounter.textContent = cardData.likes.length;
  likeButton.addEventListener('click', () => cardLike(cardData._id, likeButton, likeCounter));
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  // Блокировка удаления чужой карточки
  if (cardData.owner._id !== userId) {
    deleteButton.disabled = true;
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener('click', () => deleteCardOpening(cardData._id, cardElement));
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
