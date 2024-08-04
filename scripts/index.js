// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const places = document.querySelector('.places__list');

function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    deleteButton.addEventListener("click", deleteCard);
    return cardElement;
};

function deleteCard (event) {
    event.target.closest(".card").remove(); 
};

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    places.append(cardElement);
});