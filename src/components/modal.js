export function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEscape);
};
  
export function openImageModal(link, name) {
    const typeImagePopup = document.querySelector('.popup_type_image');
    typeImagePopup.classList.add('popup_is-opened'); 
    typeImagePopup.querySelector('.popup__image').src = link;
    typeImagePopup.querySelector('.popup__caption').textContent = name;
    typeImagePopup.addEventListener('click', closeOnOverlay);
    document.addEventListener('keydown', closeOnEscape);
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
      document.querySelector('.popup_is-opened').classList.remove('popup_is-opened'); 
    }
      document.removeEventListener('keydown', closeOnEscape);
};