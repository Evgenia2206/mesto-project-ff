export function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
    popupElement.addEventListener('click', closeOnOverlay);
    document.addEventListener('keydown', closeOnEscape);
};

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOnEscape);
};

export function closeOnOverlay({ currentTarget, target }) {
    const openedPopup = currentTarget
    const clickOnOverlay = target === openedPopup
    if (clickOnOverlay) {
      openedPopup.classList.remove('popup_is-opened');  
    }
};
  
function closeOnEscape(event) {
    const key = event.key;
    if (key === 'Escape') { 
      closeModal(document.querySelector('.popup_is-opened')); 
    }
};