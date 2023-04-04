import React from "react";
import Accept_button from "../images/Accept_button.png";
import Error_button from "../images/Error_button.png";

///// Попап успешной/не успешной регистрации
function InfoTooltip({ onClose, result: { isOpen, ok } }) {
  return (
    <section
      className={`popup popup_type_reg-result ${
        isOpen ? "popup_opened" : false
      }`}
    >
      <div className="popup__container popup__container_type_reg-result">
        <img
          className="popup__image popup__image_type_reg-result"
          src={ok ? Accept_button : Error_button}
          alt="Результат действия"
        />
        <h2 className={`popup__title popup__title_type_reg-result`}>
          {ok
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
        />
      </div>
    </section>
  );
}

export default InfoTooltip;
