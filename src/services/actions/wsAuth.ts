import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_CLOSE,
  WS_AUTH_GET_ORDERS,
  WS_AUTH_SEND_ORDERS,
  WS_AUTH_CONNECTION_START
} from "./types";
import { TOrder } from "../../utils/types";

export type TWsAuthActions =
IWsConnectionSuccessAction
| IWsConnectionErrorAction
| IWsConnectionClosedAction
| IWsConnectionCloseAction
| IWsGetMessageAction
| IWsSendMessageAction
| IWsAuthConnectionStartAction;

interface IWsAuthConnectionStartAction {
  readonly type: typeof WS_AUTH_CONNECTION_START;
};

interface IWsConnectionSuccessAction {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
};

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
  return {
    type: WS_AUTH_CONNECTION_SUCCESS
  };
};

interface IWsConnectionErrorAction {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
};

export const wsConnectionError = (): IWsConnectionErrorAction => {
  return {
    type: WS_AUTH_CONNECTION_ERROR
  };
};

interface IWsConnectionClosedAction {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
};

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
  return {
    type: WS_AUTH_CONNECTION_CLOSED
  };
};

interface IWsGetMessageAction {
  readonly type: typeof WS_AUTH_GET_ORDERS;
  payload: TOrder
};

export const wsGetMessage = (order: TOrder): IWsGetMessageAction => {
  return {
    type: WS_AUTH_GET_ORDERS,
    payload: order
  };
};

interface IWsSendMessageAction {
  readonly type: typeof WS_AUTH_SEND_ORDERS;
  payload: TOrder
};

export const wsSendMessage = (order: TOrder): IWsSendMessageAction  => {
  return {
    type: WS_AUTH_SEND_ORDERS,
    payload: order
  };
};

interface IWsConnectionCloseAction {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSE;
};

export const wsConnectionClose = (): IWsConnectionCloseAction => {
  return {
    type: WS_AUTH_CONNECTION_CLOSE
  };
};