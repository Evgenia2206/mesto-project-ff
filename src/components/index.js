import '../index.css';
import { createCard, cardLike } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserData, getInitialCards, editUserData, addNewCard, removeMyCard } from './api.js';

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

// Модальное окно удаления карточки
const deleteCardPopup = document.querySelector('.popup_type_delete-card');

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

// Фотография профиля
const avatar = document.querySelector('.profile__image');

// ФОРМА для ввода данных модального окна с картинкой
const cardAdding = document.getElementsByName('new-place')[0];

// ФОРМА для удаления карточки
const cardDeleting = document.getElementsByName('delete-card')[0];

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

let profileId;
let cardToRemove = {};

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
    editUserData(nameInput.value, jobInput.value)
      .then((userData) => { 
    profileName.textContent = userData.name;
    occupation.textContent = userData.about;
    closeModal(profileEditPopup);
      })
      .catch((error) => {
        console.log("Произошла ошибка:", error);
      })
};

// Функция добавления новой карточки
function newCardSubmit(event) {
  event.preventDefault();
  addNewCard(placeInput.value, imageInput.value)
    .then((cardData) => {
  const newCard = createCard(profileId, cardData, deleteCardOpening, openImageModal, cardLike);
  places.prepend(newCard);
    })
    .catch((error) => {
      console.log("Произошла ошибка:", error);
    })
  cardAdding.reset();
  closeModal(profileAddPopup);
};

// Открытие модального окна удаления карточки
export function deleteCardOpening(cardId, cardElement) {
  cardToRemove = {
    id: cardId,
    cardElement
  }
  openModal(deleteCardPopup);
  cardDeleting.addEventListener('submit', deleteCardSubmit);
};

// Обработка сабмита в модальном окне удаления карточки
const deleteCardSubmit = (event) => {
  event.preventDefault();
  if (!cardToRemove.cardElement) return;
  removeMyCard(cardToRemove.id)
    .then(() => {
      cardToRemove.cardElement.remove();
      closeModal(deleteCardPopup);
      cardToRemove = {};
    })
    .catch((err) => {
      console.log(err);
    })
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

// Вызов функции включения валидации всех форм
enableValidation(validationConfig); 

// Загрузка данных пользователя и карточек
Promise.all([getUserData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    profileName.textContent = userData.name;
    occupation.textContent = userData.about;
    avatar.style = `background-image: url('${userData.avatar}')`;
    profileId = userData._id;
    initialCards.forEach((cardItem) => {
      places.append(createCard(profileId, cardItem, deleteCardOpening, openImageModal, cardLike));
    });
  })
  .catch((err) => {
    console.log(err);
  });