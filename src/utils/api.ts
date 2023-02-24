import { getCookie } from "./utils";
import { TIngredientsResponse, TOrderData, TDefaulResponse, TUser, TRefreshTokenResponse } from "./types";

const API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function getIngredientsFromServer() {
  const res = await fetch(`${API_URL}/ingredients`);
  return checkResponse<TIngredientsResponse>(res);
};

export const putAnOrder = async (id: Array<string>) => {
  const res = await fetch(`${API_URL}/orders`, {
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
  });
  return checkResponse<TOrderData>(res);
};

export async function requestForgotPassword(email: string) {
  const res = await fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email
    }),
  });
  return checkResponse<TDefaulResponse>(res);
};

export async function createUser(email: string, password: string, name: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
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
  });
  return checkResponse<TUser>(res);
}

export async function logInItoAccount(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
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
  });
  return checkResponse<TUser>(res);
}

export async function logOutFromAccount() {
  const res = await fetch(`${API_URL}/auth/logout`, {
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
  });
  return checkResponse<TDefaulResponse>(res);
}

export async function requestResetPassword(password: string, token: string) {
  const res = await fetch(`${API_URL}/password-reset/reset`, {
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
  });
  return checkResponse<TDefaulResponse>(res);
}

export async function getUserRequest() {
  const res = await fetch(`${API_URL}/auth/user`, {
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
  });
  return checkResponse<TUser>(res);
}

export async function updateUserRequest(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/user`, {
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
  });
  return checkResponse<TUser>(res);
}

export async function updateTokenRequest() {
  const res = await fetch(`${API_URL}/auth/token`, {
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
  });
  return checkResponse<TRefreshTokenResponse>(res);
};
