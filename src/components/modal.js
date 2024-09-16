// Функция открытия модальных окон
export function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
    popupElement.addEventListener('click', closeOnOverlay);
    document.addEventListener('keydown', closeOnEscape);
};

// Функция закрытия модальных окон
export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOnEscape);
};

// Функция закрытия модальных окон по клику вне окна
export function closeOnOverlay({ currentTarget, target }) {
    const openedPopup = currentTarget
    const clickOnOverlay = target === openedPopup
    if (clickOnOverlay) {
      openedPopup.classList.remove('popup_is-opened');  
    }
};

// Функция закрытия модальных окон по нажатию клавиши Esc
function closeOnEscape(event) {
    const key = event.key;
    if (key === 'Escape') { 
      closeModal(document.querySelector('.popup_is-opened')); 
    }
};