import React, { useState } from "react";
import { Link } from "react-router-dom";

////// Регистрируем пользователя
function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
  }

  return (
    <section className="registration page__centrate">
      <div className="registration__container">
        <h3 className="registration__title">Регистрация</h3>
        <form
          className="registration__form"
          name="registration-form-register"
          validate="true"
          onSubmit={handleSubmit}
        >
          <input
            value={email}
            onChange={handleChangeEmail}
            id="login-input"
            type="email"
            className="registration__input"
            name="login"
            minLength="2"
            maxLength="40"
            placeholder="Email"
            required
          />

          <input
            value={password}
            onChange={handleChangePassword}
            id="password-input"
            type="password"
            className="registration__input"
            name="password"
            minLength="4"
            maxLength="20"
            placeholder="Пароль"
            required
          />

          <button className="registration__submit-button" type="submit">
            Зарегистрироваться
          </button>
          <Link to="sign-in" className="registration__link">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Register;
