import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_CLOSE,
  WS_AUTH_GET_ORDERS,
  WS_AUTH_SEND_ORDERS
} from "./types";

export const wsConnectionSuccess = () => {
  return {
    type: WS_AUTH_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_AUTH_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_AUTH_CONNECTION_CLOSED
  };
};

export const wsGetMessage = order => {
  return {
    type: WS_AUTH_GET_ORDERS,
    payload: order
  };
};

export const wsSendMessage = order => {
  return {
    type: WS_AUTH_SEND_ORDERS,
    payload: order
  };
};


export const wsConnectionClose = () => {
  return {
    type: WS_AUTH_CONNECTION_CLOSE
  };
};

