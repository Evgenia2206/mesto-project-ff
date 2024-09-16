// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, cardLike } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';

// Контейнер с карточками
const places = document.querySelector('.places__list');

// Кнопка открытия модального окна с личной информацией
const profileEditBtn = document.querySelector('.profile__edit-button'); 

// Кнопка открытия модального окна создания новой карточки
const profileAddBtn = document.querySelector('.profile__add-button'); 

// Кнопки закрытия модальных окон по крестику
const popupCloseBtns= document.querySelectorAll('.popup__close'); 

// Модальное окно с личной информацией
const profileEditPopup = document.querySelector('.popup_type_edit');

// Модальное окно создания новой карточки
const profileAddPopup = document.querySelector('.popup_type_new-card');

// Модальное окно с картинкой
const typeImagePopup = document.querySelector('.popup_type_image');

// Сама картинка в модальном окне с картинкой
const popupImage = typeImagePopup.querySelector('.popup__image');

// Подпись к картинке в модальном окне с картинкой
const popupCaption = typeImagePopup.querySelector('.popup__caption');

// Поле ввода имени в модальном окне с личной информацией
const nameInput = profileEditPopup.querySelector('.popup__input_type_name'); 

// Поле ввода рода деятельности в модальном окне с личной информацией
const jobInput = profileEditPopup.querySelector('.popup__input_type_description');

// Информация об имени пользователя, отображаемая на странице
const profileName = document.querySelector('.profile__title');

// Информация о роде деятельности, отображаемая на странице
const occupation = document.querySelector('.profile__description');

// ФОРМА для ввода данных модального окна с картинкой
const cardAdding = document.getElementsByName('new-place')[0];

// Поле ввода для названия места в форме для ввода данных модального окна с картинкой
const placeInput = cardAdding.querySelector('.popup__input_type_card-name'); 

// Поле ввода для ссылки на картинку в форме для ввода данных модального окна с картинкой
const imageInput = cardAdding.querySelector('.popup__input_type_url');

// Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функция открытия модального окна с картинкой
export function openImageModal(link, name) {
  openModal(typeImagePopup);  
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
};

// Функция редактирования личной информации в профиле
function profileSubmit(event) { 
    event.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;
    profileName.textContent = name;
    occupation.textContent = job;
    closeModal(profileEditPopup);
};

// Функция добавления новой карточки
function newCardSubmit(event) {
  event.preventDefault();
  const place = placeInput.value;
  const image = imageInput.value;
  const newCard = createCard({name:place, link:image, alt:place}, deleteCard, openImageModal, cardLike);
  places.prepend(newCard);
  cardAdding.reset();
  closeModal(profileAddPopup);
};

// Открытие модального окна с личной информацией
profileEditBtn.addEventListener('click', function () {
    openModal(profileEditPopup); 
    nameInput.value = profileName.textContent;
    jobInput.value = occupation.textContent;
    clearValidation(profileEditPopup, validationConfig);
});

// Открытие модального окна добавления новой карточки
profileAddBtn.addEventListener('click', function () {
    openModal(profileAddPopup); 
    clearValidation(profileAddPopup, validationConfig);
});

// Редактирование личной информации в профиле
profileEditPopup.addEventListener('submit', profileSubmit); 

// Добавление новой карточки
cardAdding.addEventListener('submit', newCardSubmit);

// Закрытие модальных окон при клике по крестику
popupCloseBtns.forEach((button) => { 
  button.addEventListener('click', (event) => { 
    event.stopPropagation();
    closeModal(event.target.closest('.popup')); 
  })
});

// Добавление массива карточек на страницу
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, openImageModal, cardLike);
    places.append(cardElement);
});

// Вызов функции включения валидации всех форм
enableValidation(validationConfig); 