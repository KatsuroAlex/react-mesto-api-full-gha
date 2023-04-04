// export const BASE_URL = "https://auth.nomoreparties.co";
import { BASE_URL } from "./Url";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
};

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then(res => {
      if (res.ok) {
        return res.json;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};


// export const authorize = (password, email) => {
//   return fetch(`${BASE_URL}/signin`, {
//     credentials: 'include',
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({password, email})
//   })
//   .then(handleResponse)
//   .then((data) => {
//     if (data.token) {
//       localStorage.setItem('jwt', data.token)
//       return data.token
//     }
//   })
// }


export const logout = (token) => {
  return fetch(`${BASE_URL}/logout`,{
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    // .then((data) => data);


//   // .then(res => {
//   //   if (res.ok) {
//   //     return res.json();
//   //   }
//   //   return Promise.reject(`Ошибка: ${res.status}`);
//   // })
};
