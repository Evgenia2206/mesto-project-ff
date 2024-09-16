// Функция показа элемента ошибки
function showInputError(popupElement, inputElement, errorMessage, validationConfig) {
    const inputError = popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(validationConfig.errorClass);
  }
  
  // Функция скрытия элемента ошибки
  function hideInputError(popupElement, inputElement, validationConfig) {
    const inputError = popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    inputElement.classList.remove(validationConfig.errorClass);
    inputError.textContent = '';
  }
  
  // Функция проверки валидность поля
  function isValid(popupElement, inputElement, validationConfig) {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(popupElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      hideInputError(popupElement, inputElement, validationConfig);
    }
  };
  
  // Функция добавления проверки сразу всем полям формы
  const setEventListeners = (popupElement, validationConfig) => {
    const inputList = Array.from(popupElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = popupElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(popupElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };
  
  // Функция включения валидации всех форм
  export const enableValidation = (validationConfig) => {
    const popupList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    popupList.forEach((popupElement) => {
      setEventListeners(popupElement, validationConfig);
    });
  };
  
  // Функция проверки наличия невалидного поля
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  // Функция изменения состояния кнопки сабмита
  const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
          buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
          buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  };
  
  // Функция очистки ошибок валидации
  export function clearValidation(popupElement, validationConfig) {
    const inputList = Array.from(popupElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = popupElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
      hideInputError(popupElement, inputElement, validationConfig);
    });
    toggleButtonState(inputList, buttonElement, validationConfig);
  }
  

 