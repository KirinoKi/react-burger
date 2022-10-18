import { getCookie } from "./utils";

const API_URL = "https://norma.nomoreparties.space/api";

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredientsFromServer() {
  return fetch(`${API_URL}/ingredients`).then(checkReponse);
}

export function putAnOrder(id) {
  return fetch(`${API_URL}/orders`, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      ingredients: id
    }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(checkReponse)
}

export function requestForgotPassword(email) {
  return fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email
    }),
  })
    .then(checkReponse)
}

export function createUser(email, password, name) {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(checkReponse)
}

export function logInItoAccount(email, password) {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(checkReponse)
}

export function logOutFromAccount() {
  return fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem('token')
    }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(checkReponse)
}

export function requestResetPassword(password, token) {
  return fetch(`${API_URL}/password-reset/reset`, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token
    }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(checkReponse)
}

export function getUserRequest() {
  return fetch(`${API_URL}/auth/user`, {
    method: "GET",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(checkReponse)
}

export function updateUserRequest(name, email, password) {
  return fetch(`${API_URL}/auth/user`, {
    method: "PATCH",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(checkReponse)
}

export function updateTokenRequest() {
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      token: localStorage.getItem('token')
    }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(checkReponse)
}
