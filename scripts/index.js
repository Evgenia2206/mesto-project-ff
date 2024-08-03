// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const places = document.querySelector('.places__list');

initialCards.forEach(function (element) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__title').textContent = element.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', function() {
        const cardElementDel = deleteButton.closest('.card');
        cardElementDel.remove();
    });

    places.append(cardElement)
});

