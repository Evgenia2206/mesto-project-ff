import '../index.css';
import { createCard, cardLike } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserData, getInitialCards, editUserData, addNewCard, removeMyCard, changeAvatar } from './api.js';

// Контейнер с карточками
const places = document.querySelector('.places__list');

// Кнопка открытия модального окна с личной информацией
const profileEditBtn = document.querySelector('.profile__edit-button'); 

// Кнопка открытия модального окна создания новой карточки
const profileAddBtn = document.querySelector('.profile__add-button'); 

// Кнопки закрытия модальных окон по крестику
const popupCloseBtns = document.querySelectorAll('.popup__close'); 

// Кнопка открытия модального окна изменения аватара
const avatarEditBtn = document.querySelector('.avatar__edit-button'); 

// Модальное окно с личной информацией
const profileEditPopup = document.querySelector('.popup_type_edit');

// Модальное окно создания новой карточки
const profileAddPopup = document.querySelector('.popup_type_new-card');

// Модальное окно с картинкой
const typeImagePopup = document.querySelector('.popup_type_image');

// Модальное окно удаления карточки
const deleteCardPopup = document.querySelector('.popup_type_delete-card');

// Модальное окно изменения аватара
const avatarEditPopup = document.querySelector('.popup_type_avatar_edit');

// Кнопка сабмита модального окна с личной информацией
const profileSubmitBtn = profileEditPopup.querySelector('.popup__button');

// Кнопка сабмита модального окна создания новой карточки
const cardSubmitBtn = profileAddPopup.querySelector('.popup__button');

// Кнопка сабмита модального окна изменения аватара
const avatarSubmitBtn = avatarEditPopup.querySelector('.popup__button');

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
const cardAdding = profileAddPopup.querySelector('.popup__form');

// ФОРМА для удаления карточки
const cardDeleting = deleteCardPopup.querySelector('.popup__form');

// ФОРМА для ввода данных модального окна изменения аватара
const avatarEditing = avatarEditPopup.querySelector('.popup__form');

// Поле ввода для названия места в форме для ввода данных модального окна с картинкой
const placeInput = cardAdding.querySelector('.popup__input_type_card-name'); 

// Поле ввода для ссылки на картинку в форме для ввода данных модального окна с картинкой
const imageInput = cardAdding.querySelector('.popup__input_type_url');

// Поле ввода для ссылки на аватар в форме для ввода данных модального окна изменения аватара
const avatarInput = avatarEditing.querySelector('.popup__input_type_avatar');

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
    renderLoading(profileSubmitBtn, true)
    editUserData(nameInput.value, jobInput.value)
      .then((userData) => { 
        profileName.textContent = userData.name;
        occupation.textContent = userData.about;
        closeModal(profileEditPopup);
      })
      .catch((error) => {
        console.log("Произошла ошибка:", error);
      })
      .finally(() => {
        renderLoading(profileSubmitBtn, false)
      })
    
};

// Функция изменения аватара
function avatarSubmit(event) { 
  event.preventDefault();
  renderLoading(avatarSubmitBtn, true)
  changeAvatar(avatarInput.value)
    .then((userData) => { 
      avatar.style = `background-image: url('${userData.avatar}')`;
      closeModal(avatarEditPopup);
    })
    .catch((error) => {
      console.log("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoading(avatarSubmitBtn, false)
    })  
};

// Функция добавления новой карточки
function newCardSubmit(event) {
  event.preventDefault();
  renderLoading(cardSubmitBtn, true)
  addNewCard(placeInput.value, imageInput.value)
    .then((cardData) => {
      const newCard = createCard(profileId, cardData, deleteCardOpening, openImageModal, cardLike);
      places.prepend(newCard);
      cardAdding.reset();
      closeModal(profileAddPopup);
    })
    .catch((error) => {
      console.log("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoading(cardSubmitBtn, false)
    }) 
};

// Открытие модального окна удаления карточки
export function deleteCardOpening(cardId, cardElement) {
  cardToRemove = {
    id: cardId,
    cardElement
  }
  openModal(deleteCardPopup);
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
    .catch((error) => {
      console.log("Произошла ошибка:", error);
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

// Открытие модального окна изменения аватара
avatarEditBtn.addEventListener('click', function () {
    openModal(avatarEditPopup); 
    avatarInput.value = '';
    clearValidation(avatarEditPopup, validationConfig);
});

// Редактирование личной информации в профиле
profileEditPopup.addEventListener('submit', profileSubmit); 

// Добавление новой карточки
cardAdding.addEventListener('submit', newCardSubmit);

// Удаление карточки
cardDeleting.addEventListener('submit', deleteCardSubmit);


// Изменение аватара
avatarEditing.addEventListener('submit', avatarSubmit);

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
  .catch((error) => {
    console.log("Произошла ошибка:", error);
  });

  // Функция, показывающая пользователю процесс загрузки
  function renderLoading(button, load, loadText = 'Сохранение...', defaultText = 'Сохранить') {
    if (load) {
      button.textContent = load ? loadText : defaultText;   
    }
  }  