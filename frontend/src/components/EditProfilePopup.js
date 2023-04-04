import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  //---ОБРАБОТЧИКИ---
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        value={name || ""}
        onChange={handleChangeName}
        id="name-input"
        type="text"
        placeholder="Имя"
        className="popup__input popup__input_field_name"
        name="name"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        id="name-input-error"
        className="name-input-error popup__input-error"
      ></span>
      <input
        value={description || ""}
        onChange={handleChangeDescription}
        id="info-input"
        type="text"
        placeholder="Информация"
        className="popup__input popup__input_field_info"
        name="about"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        id="info-input-error"
        className="info-input-error popup__input-error popup__input-error_centrate"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
