import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      onClose={onClose}
      isOpen={isOpen}
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_avatar_link"
        id="avatar-link"
        required
      />
      <span
        id="avatar-link-error"
        className="avatar-link-error popup__input-error popup__input-error_centrate"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
