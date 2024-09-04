// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../index.css';
import { initialCards } from './cards.js';
import { createCard } from './cards.js';
import { deleteCard } from './cards.js';
import { cardLike } from './cards.js';
import { openModal } from './modal.js';
import { openImageModal } from './modal.js';
import { closeOnOverlay } from './modal.js';

const places = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, openImageModal, cardLike);
    places.append(cardElement);
});

const profileEditBtn = document.querySelector('.profile__edit-button'); 
const profileAddBtn = document.querySelector('.profile__add-button'); 
const popupCloseBtn = document.querySelectorAll('.popup__close, .popup__button'); 

profileEditBtn.addEventListener('click', function () {
    const profileEditPopup = document.querySelector('.popup_type_edit');
    openModal(profileEditPopup); 
    profileEditPopup.addEventListener('click', closeOnOverlay);
});
  
profileAddBtn.addEventListener('click', function () {
    const profileAddPopup = document.querySelector('.popup_type_new-card');
    openModal(profileAddPopup); 
    profileAddPopup.addEventListener('click', closeOnOverlay);
}); 

popupCloseBtn.forEach((button) => { 
  button.addEventListener('click', (event) => { 
    event.stopPropagation();
    event.target.closest('.popup').classList.remove('popup_is-opened'); 
  })
});

const formElement = document.querySelector('.popup_type_edit'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description');

function handleFormSubmit(event) {
    event.preventDefault(); 
    const name = nameInput.value;
    const job = jobInput.value;
    document.querySelector('.profile__title').textContent = name;
    document.querySelector('.profile__description').textContent = job;
};

formElement.addEventListener('submit', handleFormSubmit); 

const cardAdding = document.getElementsByName('new-place')[0];
const placeInput = document.querySelector('.popup__input_type_card-name'); 
const imageInput = document.querySelector('.popup__input_type_url');

function newCardSubmit() {
    const newCard = document.querySelector('.places__item').cloneNode(true);
    const place = placeInput.value;
    const image = imageInput.value;
    newCard.querySelector('.card__title').textContent = place;
    newCard.querySelector('.card__image').src = image;
    newCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    newCard.querySelector('.card__image').addEventListener('click', () => openImageModal(image, place));
    newCard.querySelector('.card__like-button').addEventListener('click', cardLike);
    places.prepend(newCard);
};

cardAdding.addEventListener('submit', function(event) {
  event.preventDefault();
  newCardSubmit();
  cardAdding.reset();
});
