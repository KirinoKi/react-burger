import { getCookie } from "../../utils/utils";
import { TWs } from "../../utils/types";
import { AnyAction } from 'redux';
import { MiddlewareAPI } from "redux";

export const socketMiddleware = (wsUrl: string, wsActions: TWs, isAuth = false)=> {
  return (store: MiddlewareAPI ) => {
    let socket: WebSocket | null = null;

    return (next: (arg: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage, wsClose } = wsActions;
      if (type === wsInit) {
        if (!isAuth) {
          socket = new WebSocket(wsUrl);
        } else {
          const accessToken = getCookie('token');
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        };
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const orders = { ...payload };
          socket.send(JSON.stringify(orders));
        }

        if (wsClose && type === wsClose && socket) {
          socket.close();
        }
      }
      next(action);
    };
  };
};

