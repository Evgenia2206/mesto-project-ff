(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-23",headers:{authorization:"74821ecb-efe6-41b1-bdb6-68b280a71ee3","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Упс! Что-то пошло не так: ".concat(e.status))}function n(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}function r(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}var o=document.querySelector("#card-template").content;function c(e,t,n,r,c){var a=o.querySelector(".card").cloneNode(!0),u=a.querySelector(".card__image");u.src=t.link,u.alt=t.name,a.querySelector(".card__title").textContent=t.name,u.addEventListener("click",(function(){return r(t.link,t.name)}));var i=a.querySelector(".card__like-button"),l=a.querySelector(".card__like-counter"),s=t.likes.some((function(t){return t._id===e}));s&&i.classList.add("card__like-button_is-active"),l.textContent=t.likes.length,i.addEventListener("click",(function(){return c(t._id,i,l)}));var d=a.querySelector(".card__delete-button");return t.owner._id!==e?(d.disabled=!0,d.style.display="none"):d.addEventListener("click",(function(){return n(t._id,a)})),a}function a(e,t,o){(t.classList.contains("card__like-button_is-active")?r:n)(e).then((function(e){t.classList.toggle("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function u(e){e.classList.add("popup_is-opened"),e.addEventListener("click",l),document.addEventListener("keydown",s)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s)}function l(e){var t=e.currentTarget;e.target===t&&t.classList.remove("popup_is-opened")}function s(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function d(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),t.classList.remove(n.errorClass),r.textContent=""}var p=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){d(e,n,t)})),p(n,r,t)}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var y,m=document.querySelector(".places__list"),v=document.querySelector(".profile__edit-button"),h=document.querySelector(".profile__add-button"),S=document.querySelectorAll(".popup__close"),b=document.querySelector(".avatar__edit-button"),q=document.querySelector(".popup_type_edit"),g=document.querySelector(".popup_type_new-card"),E=document.querySelector(".popup_type_image"),L=document.querySelector(".popup_type_delete-card"),C=document.querySelector(".popup_type_avatar_edit"),k=q.querySelector(".popup__button"),A=g.querySelector(".popup__button"),x=C.querySelector(".popup__button"),U=E.querySelector(".popup__image"),T=E.querySelector(".popup__caption"),w=q.querySelector(".popup__input_type_name"),j=q.querySelector(".popup__input_type_description"),O=document.querySelector(".profile__title"),P=document.querySelector(".profile__description"),B=document.querySelector(".profile__image"),D=g.querySelector(".popup__form"),M=L.querySelector(".popup__form"),N=C.querySelector(".popup__form"),I=D.querySelector(".popup__input_type_card-name"),J=D.querySelector(".popup__input_type_url"),H=N.querySelector(".popup__input_type_avatar"),V={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},z={};function $(e,t){u(E),U.src=e,U.alt=t,T.textContent=t}function F(e,t){z={id:e,cardElement:t},u(L)}function G(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранить";t&&(e.textContent=t?n:r)}v.addEventListener("click",(function(){u(q),w.value=O.textContent,j.value=P.textContent,f(q,V)})),h.addEventListener("click",(function(){u(g),f(g,V)})),b.addEventListener("click",(function(){u(C),H.value="",f(C,V)})),q.addEventListener("submit",(function(n){var r,o;n.preventDefault(),G(k,!0),(r=w.value,o=j.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t)).then((function(e){O.textContent=e.name,P.textContent=e.about,i(q)})).catch((function(e){console.log("Произошла ошибка:",e)})).finally((function(){G(k,!1)}))})),D.addEventListener("submit",(function(n){var r,o;n.preventDefault(),G(A,!0),(r=I.value,o=J.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r,link:o})}).then(t)).then((function(e){var t=c(y,e,F,$,a);m.prepend(t),D.reset(),i(g)})).catch((function(e){console.log("Произошла ошибка:",e)})).finally((function(){G(A,!1)}))})),M.addEventListener("submit",(function(n){var r;n.preventDefault(),z.cardElement&&(r=z.id,fetch("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then(t)).then((function(){z.cardElement.remove(),i(L),z={}})).catch((function(e){console.log("Произошла ошибка:",e)}))})),N.addEventListener("submit",(function(n){n.preventDefault(),G(x,!0),function(n){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then(t)}(H.value).then((function(e){B.style="background-image: url('".concat(e.avatar,"')"),i(C)})).catch((function(e){console.log("Произошла ошибка:",e)})).finally((function(){G(x,!1)}))})),S.forEach((function(e){e.addEventListener("click",(function(e){e.stopPropagation(),i(e.target.closest(".popup"))}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),p(n,r,t)}))}))}(t,e)}))}(V),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],u=r[1];O.textContent=o.name,P.textContent=o.about,B.style="background-image: url('".concat(o.avatar,"')"),y=o._id,u.forEach((function(e){m.append(c(y,e,F,$,a))}))})).catch((function(e){console.log("Произошла ошибка:",e)}))})();