import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  onClose,
  isOpen,
  onSubmit,
  buttonTitle,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : false}`}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
        ></button>
        <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
        <form
          onSubmit={onSubmit}
          className={`popup__form popup__form_type_${name}`}
          name={`${name}-form`}
          // noValidate
          validate="true"
        >
          {children}
          <button
            className={`popup__submit-button popup__submit-button_type_${name}`}
            type="submit"
          >
            {buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
