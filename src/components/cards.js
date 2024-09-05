import { openModal } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const typeImagePopup = document.querySelector('.popup_type_image');
const popupImage = typeImagePopup.querySelector('.popup__image');

export function createCard(cardData, deleteCard, openImageModal, cardLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  deleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => openImageModal(cardData.link, cardData.name));
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

export function openImageModal(link, name) {
  openModal(typeImagePopup);  
  popupImage.src = link;
  popupImage.alt = name;
  typeImagePopup.querySelector('.popup__caption').textContent = name;
};