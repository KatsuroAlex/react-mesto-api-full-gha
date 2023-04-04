import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleInputName(e) {
    setName(e.target.value);
  }

  function handleInputLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      onClose={onClose}
      isOpen={isOpen}
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={handleInputName}
        id="cards-name"
        type="text"
        placeholder="Название"
        className="popup__input popup__input_card_name"
        name="name"
        minLength="2"
        maxLength="30"
        required
      />
      <span
        id="cards-name-error"
        className="cards-name-error popup__input-error"
      ></span>
      <input
        value={link}
        onChange={handleInputLink}
        id="cards-link"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_card_link"
        name="link"
        required
      />
      <span
        id="cards-link-error"
        className="cards-link-error popup__input-error popup__input-error_centrate"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
