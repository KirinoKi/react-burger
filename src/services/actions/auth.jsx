import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED, UPDATE_TOKEN_REQUEST, UPDATE_TOKEN_SUCCESS, UPDATE_TOKEN_FAILED
} from "./types";
import {
  createUser, logInItoAccount, logOutFromAccount, requestForgotPassword, requestResetPassword, getUserRequest,
  updateUserRequest, updateTokenRequest
} from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/utils";

//Регистрация
function registerUserOnServerSuccess(res) {
  return {
    type: REGISTER_SUCCESS,
    payload: res.user
  }
}

function registerUserOnServerFailed(err) {
  return {
    type: REGISTER_FAILED,
    payload: `Произошла Ошибка регистрации пользователя: ${err.message}`
  }
}

export function register(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    createUser(email, password, name)
      .then(res => {
        const authToken = res.accessToken.split('Bearer ')[1];
        setCookie('token', authToken);
        localStorage.setItem('token', res.refreshToken);
        if (res && res.success) {
          dispatch(registerUserOnServerSuccess(res));
        } else {
          dispatch(registerUserOnServerFailed());
        }
      })
      .catch(err => {
        dispatch(registerUserOnServerFailed(err));
      })
  };
}

//Авторизация
function loginOnServerSuccess(res) {
  return {
    type: LOGIN_SUCCESS,
    payload: res.user
  }
}

function loginOnServerFailed(err) {
  return {
    type: LOGIN_FAILED,
    payload: `Произошла Ошибка авторизации: ${err.message}`
  }
}

export function login(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    logInItoAccount(email, password)
      .then(res => {
        const authToken = res.accessToken.split('Bearer ')[1];
        setCookie('token', authToken);
        localStorage.setItem('token', res.refreshToken);
        if (res && res.success) {
          dispatch(loginOnServerSuccess(res));
        } else {
          dispatch(loginOnServerFailed());
        }
      })
      .catch(err => {
        dispatch(loginOnServerFailed(err));
      })
  };
}

//Выход из системы
function userLogoutFailed(err) {
  return {
    type: LOGOUT_FAILED,
    payload: `Произошла Ошибка выхода из системы: ${err.message}`
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    logOutFromAccount()
      .then(res => {
        deleteCookie('token');
        localStorage.removeItem('token');
        if (res && res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
            payload: null
          });
        } else {
          dispatch(userLogoutFailed());
        }
      })
      .catch(err => {
        dispatch(userLogoutFailed(err));
      })
  };
}

//Забыли пароль
export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });
    requestForgotPassword(email)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS
          });
        } else {
          dispatch({
            type: FORGOT_PASSWORD_FAILED
          });
        }
      })
      .catch(err => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
          payload: `Произошла Ошибка при запросе забытого пароля: ${err.message}`
        });
      })
  };
}

//Сброс пароля
export function resetPassword(password, token) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    requestResetPassword(password, token)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS
          });
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED
          });
        }
      })
      .catch(err => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
          payload: `Произошла Ошибка сброса пароля: ${err.message}`
        });
      })
  };
}

//Получение данных о пользователе
function getUserFromServer(res) {
  return {
    type: GET_USER_SUCCESS,
    payload: res.user
  }
}

function getUserFromServerFailed(err) {
  return {
    type: GET_USER_FAILED,
    payload: `Произошла Ошибка получения данных о пользователе: ${err.message}`
  }
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    getUserRequest()
      .then(res => {
        if (res && res.success) {
          dispatch(getUserFromServer(res));
        } else {
          dispatch(getUserFromServerFailed());
        }
      })
      .catch(err => {
        dispatch(getUserFromServerFailed(err));
      })
  };
}

//Обновление данных о пользователе
function updateUserOnServer(res) {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: res.user
  }
}

function updateUserOnFailed(err) {
  return {
    type: UPDATE_USER_FAILED,
    payload: `Произошла Ошибка обновления данных о пользователе: ${err.message}`
  }
}

export function updateUser(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    updateUserRequest(name, email, password)
      .then(res => {
        if (res && res.success) {
          dispatch(updateUserOnServer(res));
        } else {
          dispatch(updateUserOnFailed());
        }
      })
      .catch(err => {
        dispatch(updateUserOnFailed(err));
      })
  };
}

//Обновление токена
export function refreshToken() {
  return function (dispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });
    updateTokenRequest()
      .then(res => {
        const authToken = res.accessToken.split('Bearer ')[1];
        setCookie('token', authToken);
        localStorage.setItem('token', res.refreshToken);
        if (res && res.success) {
          dispatch({
            type: UPDATE_TOKEN_SUCCESS
          });
        } else {
          dispatch({
            type: UPDATE_TOKEN_FAILED
          });
        }
      })
      .catch(err => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
          payload: `Произошла Ошибка обновления токена: ${err.message}`
        });
      })
  };
}
