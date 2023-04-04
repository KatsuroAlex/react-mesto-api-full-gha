import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/auth.js";

function App() {
  const history = useHistory();
  const [isInfoTooltip, setInfoTooltip] = useState({isOpen: false, ok: false});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const [isEditProfilePopupOpen, setEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditAcceptPopupOpen, setEditAcceptPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    element: {},
  });


  //   useEffect(() => {
  //   tokenCheck()
  // }, [])

  // function tokenCheck() {
  //   const token = localStorage.getItem("token");
  //   auth.getContent(token)
  //     .then((res) => {
  //       if(res) {
  //         setLoggedIn(true)
  //         setEmail(res.email)
  //         history.push('/')
  //       }
  //     })
  //     .catch((err) => console.log(err))
  // }



  // useEffect(() => {
  //   if(loggedIn){   
  //     api.getProfileData()
  //       .then((res) => {
  //       handleLoggedIn();
  //       setCurrentUser(res);
  //     }) 
  //     .catch((err) => console.log(err));
    
  //     api.getInitialCards()
  //       .then((data) => {
  //         setCards(data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [loggedIn]);


  //при загрузке если получаем пользователя то перенаправляем его
  useEffect(() => {
    api.getProfileData()
      .then(data => {
        handleLoggedIn();
        setEmail(data.email);
        setCurrentUser(data);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
  }, [history, loggedIn]);



  //при загрузке страницы получаем данные карточек
  useEffect(() => {
    if(loggedIn){
      api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [loggedIn]);

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, element: card });
  }

  function handleInfoTooltip(res) {
    setInfoTooltip({ ...isInfoTooltip, isOpen: true, ok: res });
  }

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function closeAllPopups() {
    setEditProfileClick(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditAcceptPopupOpen(false);
    setSelectedCard({ isOpen: false, element: {} });
    setInfoTooltip(false);
  }

  // обновляем пользователя
  function handleUpdateUser(newUserData) {
    api
      .setUserInfo(newUserData)
        .then((data) => {
          console.log(data);
          setCurrentUser(data);
          closeAllPopups();
        })
      .catch((err) => {
        console.log(err);
      });
  }

  // Обновляем аватар
  function handleUpdateAvatar(newAvatarLink) {
    api
      .setUserAvatar(newAvatarLink)
      .then((data) => {
        console.log(data);
        console.log(currentUser)
        setCurrentUser({...currentUser, avatar: data.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  // добавляем новую карточку
  function handleAddPlaceSubmit(cardData) {
    api
      .postNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    console.log(currentUser._id);
    // const isLiked = card.likes.some((i) => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ////////Запрос на регистрирацию пользователя
  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((data) => {
        if (data) {
          handleInfoTooltip(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip(false);
      });
  }

  //////Запрос на вход пользователя
  // function handleLogin(password, email) {
  //   auth
  //     .login(password, email)
  //     .then((data) => {
  //       if (data.token) {
  //         setEmail(email);
  //         handleLoggedIn();
  //         localStorage.setItem("token", data.token);
  //         history.push("/");
  //       }
  //     })
  //     .catch((err) => {
  //       handleInfoTooltip(false);
  //       console.log(err);
  //     });
  // }

  function handleLogin (password, email) {
    auth.login(password, email)
      .then(res => {
        setEmail(email);
        handleLoggedIn();
        history.push('/');
      })
      .catch(err => {
        handleInfoTooltip(false);
        console.log(err);
      })
  }

  // /////Проверка токена
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     auth.getContent(token).then((data) => {
  //       if (data) {
  //         // setEmail(data.email);
  //         handleLoggedIn();
  //         setEmail(data.email);
  //         history.push("/");
  //       }
  //     });
  //   }
  // }, [history]);

  //////////Обработка выхода пользователя
  function handleSignOut() {
    // localStorage.removeItem("token");
    auth.logout()
      .then(res => {
        setLoggedIn(false);
        setEmail('');
        history.push('/sign-in');
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleSignOut} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            currentUser={currentUser}
            cards={cards}
            onEditProfile={() => setEditProfileClick(true)}
            onEditAvatar={() => setEditAvatarPopupOpen(true)}
            onAddPlace={() => setAddPlacePopupOpen(true)}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip onClose={closeAllPopups} result={isInfoTooltip} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="accept"
          title="Вы уверены?"
          onClose={closeAllPopups}
          isOpen={isEditAcceptPopupOpen}
          buttonTitle="Да"
        ></PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
