import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS
} from "./types";

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetMessage = order => {
  return {
    type: WS_GET_ORDERS,
    payload: order
  };
};

