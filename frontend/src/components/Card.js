// import React from "react";
import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  // const currentUser = React.useContext(CurrentUserContext);
  const currentUser = useContext(CurrentUserContext);

  // Кнопка удаления
  // Определяем, являемся ли мы владельцем текущей карточки
  console.log(currentUser);
  const isOwn = card.owner._id === currentUser._id;
  // const isOwn = card.owner === currentUser._id;
  console.log(isOwn);
  console.log(currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__delete-card ${
    isOwn ? "element__delete-card_visible" : "element__delete-card_hidden"
  }`;

  // Кнопка лайка
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  return (
    <li className="element">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <img
        className="element__photo"
        src={card.link}
        onClick={handleClick}
        alt={card.name}
      />
      <div className="element__title">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__group">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="element__sum">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
