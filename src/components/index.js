// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../index.css';
import { initialCards } from './card.js';
import { createCard, deleteCard, cardLike, openImageModal } from './cards.js';
import { openModal, closeModal } from './modal.js';

const places = document.querySelector('.places__list');
const profileEditBtn = document.querySelector('.profile__edit-button'); 
const profileAddBtn = document.querySelector('.profile__add-button'); 
const popupCloseBtns= document.querySelectorAll('.popup__close, .popup__button'); 
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileAddPopup = document.querySelector('.popup_type_new-card');
const formElement = document.querySelector('.popup_type_edit'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const occupation = document.querySelector('.profile__description');
const cardAdding = document.getElementsByName('new-place')[0];
const placeInput = cardAdding.querySelector('.popup__input_type_card-name'); 
const imageInput = cardAdding.querySelector('.popup__input_type_url');

function profileSubmit(event) {
    event.preventDefault(); 
    const name = nameInput.value;
    const job = jobInput.value;
    profileName.textContent = name;
    occupation.textContent = job;
};

function newCardSubmit() {
  const place = placeInput.value;
  const image = imageInput.value;
  const newCard = createCard({name:place, link:image, alt:place}, deleteCard, openImageModal, cardLike);
  places.prepend(newCard);
};

profileEditBtn.addEventListener('click', function () {
    openModal(profileEditPopup); 
});
  
profileAddBtn.addEventListener('click', function () {
    openModal(profileAddPopup); 
});

formElement.addEventListener('submit', profileSubmit);

cardAdding.addEventListener('submit', function(event) {
  event.preventDefault();
  newCardSubmit();
  cardAdding.reset();
});

popupCloseBtns.forEach((button) => { 
  button.addEventListener('click', (event) => { 
    event.stopPropagation();
    closeModal(event.target.closest('.popup')); 
  })
});

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, openImageModal, cardLike);
    places.append(cardElement);
});




