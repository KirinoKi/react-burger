import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, GET_USER_REQUEST,
  GET_USER_SUCCESS, GET_USER_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED, UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS, UPDATE_TOKEN_FAILED
} from "../actions/types";
import { TUser } from '../../utils/types';
import { TAuthActions } from '../actions/auth'

type TAuthState = {
  user: TUser['user'] | null;
  name: string;
  email: string;

  registerRequest: boolean;
  registerFailed: boolean;

  loginRequest: boolean;
  loginSuccess: boolean;
  loginFailed: boolean;

  logoutRequest: boolean;
  logoutFailed: boolean;

  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  forgotPasswordSuccess: boolean;

  resetPasswordRequest: boolean;
  resetPasswordSuccess: boolean;
  resetPasswordFailed: boolean;

  getUserRequest: boolean;
  getUserFailed: boolean;

  updateUserRequest: boolean;
  updateUserFailed: boolean;

  updateTokenRequest: boolean;
  updateTokenSuccess: boolean;
  updateTokenFailed: boolean;
};

const initialState: TAuthState = {
  user: null,
  name: '',
  email: '',

  registerRequest: false,
  registerFailed: false,

  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordSuccess: false,

  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,

  getUserRequest: false,
  getUserFailed: false,

  updateUserRequest: false,
  updateUserFailed: false,

  updateTokenRequest: false,
  updateTokenSuccess: false,
  updateTokenFailed: false,
}

export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false
      };
    }
    case REGISTER_SUCCESS: {
      return { ...state, registerFailed: false, user: action.payload, registerRequest: false };
    }
    case REGISTER_FAILED: {
      return { ...state, registerFailed: true, registerRequest: false };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false
      };
    }
    case LOGIN_SUCCESS: {
      return { ...state, loginFailed: false, user: action.payload, loginRequest: false };
    }
    case LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false
      };
    }
    case LOGOUT_SUCCESS: {
      return { ...state, logoutFailed: false, user: action.payload, logoutRequest: false };
    }
    case LOGOUT_FAILED: {
      return { ...state, logoutFailed: true, logoutRequest: false };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return { ...state, forgotPasswordFailed: false, forgotPasswordSuccess: true, forgotPasswordRequest: false };
    }
    case FORGOT_PASSWORD_FAILED: {
      return { ...state, forgotPasswordFailed: true, forgotPasswordRequest: false };
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return { ...state, resetPasswordFailed: false, resetPasswordSuccess: true, resetPasswordRequest: false };
    }
    case RESET_PASSWORD_FAILED: {
      return { ...state, resetPasswordFailed: true, resetPasswordRequest: false };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false
      };
    }
    case GET_USER_SUCCESS: {
      return { ...state, getUserFailed: false, user: action.payload, name: action.name, email: action.email, getUserRequest: false };
    }
    case GET_USER_FAILED: {
      return { ...state, getUserFailed: true, getUserRequest: false };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false
      };
    }
    case UPDATE_USER_SUCCESS: {
      return { ...state, updateUserFailed: false, user: action.payload, updateUserRequest: false };
    }
    case UPDATE_USER_FAILED: {
      return { ...state, updateUserFailed: true, updateUserRequest: false };
    }

    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true,
        updateTokenSuccess: false,
        updateTokenFailed: false
      };
    }
    case UPDATE_TOKEN_SUCCESS: {
      return { ...state, updateTokenFailed: false, updateTokenSuccess: true, updateTokenRequest: false };
    }
    case UPDATE_TOKEN_FAILED: {
      return { ...state, updateTokenFailed: true, updateTokenSuccess: false, updateTokenRequest: false };
    }

    default: {
      return state;
    }
  }
};
