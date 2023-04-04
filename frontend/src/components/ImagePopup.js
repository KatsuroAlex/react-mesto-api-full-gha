import React from "react";

function ImagePopup({
  onClose,
  card: {
    isOpen,
    element: { name, link },
  },
}) {
  return (
    <div
      className={`popup popup_type_picture ${isOpen ? "popup_opened" : false}`}
    >
      <div className="popup__container popup__container_type_picture">
        <button
          onClick={onClose}
          className="popup__close popup__close_type_picture"
          type="button"
        ></button>
        <img className="popup__image" src={link} alt={name} />
        <h2 className="popup__title popup__title_type_picture">{name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
