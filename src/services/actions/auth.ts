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
import { TUser } from "../../utils/types";
import { AppThunk } from "../../utils/types";

export type TAuthActions =
  IRegisterUserOnServerSuccessAction
  | IRegisterUserOnServerFailedAction
  | ILoginOnServerSuccessAction
  | ILoginOnServerFailedAction
  | IUserLogoutFailedAction
  | IGetUserFromServerAction
  | IGetUserFromServerFailedAction
  | IUpdateUserOnServerAction
  | IUpdateUserFailedAction
  | IRegisterUserOnServerRequestAction
  | ILoginOnServerRequestAction
  | IUserLogoutRequestAction
  | IUserLogoutSuccessAction
  | IForgotPasswordRequestAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | IGetUserRequestAction
  | IUpdateUserRequestAction
  | IUpdateTokenRequestAction
  | IUpdateTokenSuccessAction
  | IUpdateTokenFailedAction
  | IRegisterUserOnServerWithouPayloadFailedAction
  | ILoginOnServerWithouPayloadFailedAction
  | IUserLogoutWithoutPayloadFailedAction
  | IGetUserFromServerWithoutPayloadFailedAction
  | IUpdateUserWihoutPayloadFailedAction;

//Регистрация
interface IRegisterUserOnServerRequestAction {
  readonly type: typeof REGISTER_REQUEST;
};

interface IRegisterUserOnServerSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: TUser['user'];
};

const registerUserOnServerSuccess = (res: TUser): IRegisterUserOnServerSuccessAction => {
  return {
    type: REGISTER_SUCCESS,
    payload: res.user
  }
};

interface IRegisterUserOnServerFailedAction {
  readonly type: typeof REGISTER_FAILED;
  readonly payload: string;
};

const registerUserOnServerFailed = (err: { message: string }): IRegisterUserOnServerFailedAction => {
  return {
    type: REGISTER_FAILED,
    payload: `Произошла Ошибка регистрации пользователя: ${err.message}`
  }
};

interface IRegisterUserOnServerWithouPayloadFailedAction {
  readonly type: typeof REGISTER_FAILED;
};

const registerUserOnServerWithouPayloadFailed = (): IRegisterUserOnServerWithouPayloadFailedAction => {
  return {
    type: REGISTER_FAILED,
  }
};

export const register = (email: string, password: string, name: string): AppThunk<Promise<unknown>> => (dispatch) => {
  dispatch({
    type: REGISTER_REQUEST
  });
  return createUser(email, password, name)
    .then(res => {
      const authToken = res.accessToken.split('Bearer ')[1];
      setCookie('token', authToken);
      localStorage.setItem('token', res.refreshToken);
      if (res && res.success) {
        dispatch(registerUserOnServerSuccess(res));
      } else {
        dispatch(registerUserOnServerWithouPayloadFailed());
      }
    })
    .catch(err => {
      dispatch(registerUserOnServerFailed(err));
    })
};


//Авторизация
interface ILoginOnServerRequestAction {
  readonly type: typeof LOGIN_REQUEST;
};

interface ILoginOnServerSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: TUser['user'];
};

const loginOnServerSuccess = (res: TUser): ILoginOnServerSuccessAction => {
  return {
    type: LOGIN_SUCCESS,
    payload: res.user
  }
};

interface ILoginOnServerFailedAction {
  readonly type: typeof LOGIN_FAILED;
  readonly payload: string;
};

const loginOnServerFailed = (err: { message: string }): ILoginOnServerFailedAction => {
  return {
    type: LOGIN_FAILED,
    payload: `Произошла Ошибка авторизации: ${err.message}`
  }
};

interface ILoginOnServerWithouPayloadFailedAction {
  readonly type: typeof LOGIN_FAILED;
};

const loginOnServerWithouPayloadFailed = (): ILoginOnServerWithouPayloadFailedAction => {
  return {
    type: LOGIN_FAILED
  }
};

export const login = (email: string, password: string): AppThunk<Promise<unknown>> => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST
  });
  return logInItoAccount(email, password)
    .then(res => {
      const authToken = res.accessToken.split('Bearer ')[1];
      setCookie('token', authToken);
      localStorage.setItem('token', res.refreshToken);
      if (res && res.success) {
        dispatch(loginOnServerSuccess(res));
      } else {
        dispatch(loginOnServerWithouPayloadFailed());
      }
    })
    .catch(err => {
      dispatch(loginOnServerFailed(err));
    })
};


//Выход из системы
interface IUserLogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
};

interface IUserLogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly payload: TUser['user'] | null;
};

interface IUserLogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
  readonly payload: string;
};

const userLogoutFailed = (err: { message: string }): IUserLogoutFailedAction => {
  return {
    type: LOGOUT_FAILED,
    payload: `Произошла Ошибка выхода из системы: ${err.message}`
  }
};

interface IUserLogoutWithoutPayloadFailedAction {
  readonly type: typeof LOGOUT_FAILED;
};

const userLogoutWithoutPayloadFailed = (): IUserLogoutWithoutPayloadFailedAction => {
  return {
    type: LOGOUT_FAILED
  }
};

export const logout = (): AppThunk<Promise<unknown>> => (dispatch) => {
  dispatch({
    type: LOGOUT_REQUEST
  });
  return logOutFromAccount()
    .then(res => {
      deleteCookie('token');
      localStorage.removeItem('token');
      if (res && res.success) {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: null
        });
      } else {
        dispatch(userLogoutWithoutPayloadFailed());
      }
    })
    .catch(err => {
      dispatch(userLogoutFailed(err));
    })
};


//Забыли пароль
interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
};

interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
};

interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
};

export const forgotPassword = (email: string): AppThunk<Promise<unknown>> => (dispatch) => {
  dispatch({
    type: FORGOT_PASSWORD_REQUEST
  });
  return requestForgotPassword(email)
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

//Сброс пароля
interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};

interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
};

interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
};

export const resetPassword = (password: string, token: string): AppThunk<Promise<unknown>> => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD_REQUEST
  });
  return requestResetPassword(password, token)
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

//Получение данных о пользователе
interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
};

interface IGetUserFromServerAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: TUser['user'];
  readonly name: string;
  readonly email: string;
};

const getUserFromServer = (res: TUser): IGetUserFromServerAction => {
  return {
    type: GET_USER_SUCCESS,
    payload: res.user,
    name: res.user.name,
    email: res.user.email
  }
};

interface IGetUserFromServerFailedAction {
  readonly type: typeof GET_USER_FAILED;
  readonly payload: string;
};

const getUserFromServerFailed = (err: { message: string }): IGetUserFromServerFailedAction => {
  return {
    type: GET_USER_FAILED,
    payload: `Произошла Ошибка получения данных о пользователе: ${err.message}`
  }
};

interface IGetUserFromServerWithoutPayloadFailedAction {
  readonly type: typeof GET_USER_FAILED;
};

const getUserFromServerWithoutPayloadFailed = (): IGetUserFromServerWithoutPayloadFailedAction => {
  return {
    type: GET_USER_FAILED
  }
};

export const getUser = (): AppThunk<Promise<unknown>> => (dispatch) => {
  dispatch({
    type: GET_USER_REQUEST
  });
  return getUserRequest()
    .then(res => {
      if (res && res.success) {
        dispatch(getUserFromServer(res));
      } else {
        dispatch(getUserFromServerWithoutPayloadFailed());
      }
    })
    .catch(err => {
      dispatch(getUserFromServerFailed(err));
    })
};

//Обновление данных о пользователе
interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
};

interface IUpdateUserOnServerAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: TUser['user'];
};

const updateUserOnServer = (res: TUser): IUpdateUserOnServerAction => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: res.user
  }
};

interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly payload: string;
};

const updateUserFailed = (err: { message: string }): IUpdateUserFailedAction => {
  return {
    type: UPDATE_USER_FAILED,
    payload: `Произошла Ошибка обновления данных о пользователе: ${err.message}`
  }
};

interface IUpdateUserWihoutPayloadFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
};

const updateUserWihoutPayloadFailed = (): IUpdateUserWihoutPayloadFailedAction => {
  return {
    type: UPDATE_USER_FAILED
  }
};

export const updateUser = (name: string, email: string, password: string): AppThunk<Promise<unknown>> => (dispatch) => {
  dispatch({
    type: UPDATE_USER_REQUEST
  });
  return updateUserRequest(name, email, password)
    .then(res => {
      if (res && res.success) {
        dispatch(updateUserOnServer(res));
      } else {
        dispatch(updateUserWihoutPayloadFailed());
      }
    })
    .catch(err => {
      dispatch(updateUserFailed(err));
    })
};

//Обновление токена
interface IUpdateTokenRequestAction {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
};

interface IUpdateTokenSuccessAction {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
};

interface IUpdateTokenFailedAction {
  readonly type: typeof UPDATE_TOKEN_FAILED;
};

export const refreshToken = (): AppThunk<Promise<unknown>> => (dispatch) => {
  dispatch({
    type: UPDATE_TOKEN_REQUEST,
  });
  return updateTokenRequest()
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
