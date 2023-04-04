import logo from "../images/logo.svg";
import React, { useState } from "react";
import { Link, Route } from "react-router-dom";

function Header({ email, onSignOut }) {
  const [isClicked, setIsClicked] = useState(false);

  //---ОБРАБОТЧИКИ---
  function handleClickMenu() {
    setIsClicked(!isClicked);
  }

  return (
    <header className="header page__centrate">
      <div
        className={`header__container ${
          isClicked ? "header__container_menu" : ""
        }`}
      >
        <img
          className={`header__logo ${isClicked ? "header__logo_menu" : ""} `}
          src={logo}
          alt="Логотип"
        />
        <Route path="/sign-in">
          <Link to="sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div
            className={`header__user-container ${
              isClicked ? "header__user-container_menu" : ""
            }`}
          >
            <p className="header__email">{email}</p>
            <button
              onClick={() => {
                onSignOut();
                handleClickMenu();
              }}
              className="header__link header__button"
            >
              Выйти
            </button>
          </div>
        </Route>
      </div>
    </header>
  );
}

export default Header;
