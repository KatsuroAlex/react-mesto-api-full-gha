import React, { useState } from "react";

//// Авторизируем пользователя
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin(password, email);
  }

  return (
    <section className="registration page__centrate">
      <div className="registration__container">
        <h3 className="registration__title">Вход</h3>
        <form
          className="registration__form"
          name="registration-form-login"
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
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
