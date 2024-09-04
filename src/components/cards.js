export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }    
];

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, deleteCard, openImageModal, cardLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  deleteButton.addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', () => openImageModal(cardData.link, cardData.name));
  cardElement.querySelector('.card__like-button').addEventListener('click', cardLike);
  return cardElement;
};

export function deleteCard (event) {
  event.target.closest('.card').remove(); 
};

export function cardLike(event) {
  if (event.target.classList.contains('card__like-button')) {
    event.stopPropagation();
    event.target.classList.toggle('card__like-button_is-active');
  }
};