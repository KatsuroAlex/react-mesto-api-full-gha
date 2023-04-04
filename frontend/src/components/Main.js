import React, {useContext} from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__edit-group">
          <img
            className="profile__avatar"
            name="avatar"
            src={currentUser.avatar}
            alt="Портрет Кусто"
          />
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditAvatar}
          ></button>
        </div>

        <div className="profile__info">
          <div className="profile__list">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__rectangle-button"
              onClick={onEditProfile}
              type="button"
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        >
          +
        </button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((item) => (
            <Card
              card={item}
              key={item._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
          ;
        </ul>
      </section>
    </main>
  );
}

export default Main;
