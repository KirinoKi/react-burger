import {
  getCookie
} from "../../utils/utils";

export const socketMiddleware = (wsUrl, wsActions ) => {
  return store => {
    let socket = null;

    const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      

      if (action.user && type === wsInit) {
        socket = new WebSocket(`${wsUrl}?token=${getCookie('token')}`);
      } else if (type === wsInit) {
        socket = new WebSocket(wsUrl);
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
          socket.close();
        };

        if (type === wsSendMessage) {
          const orders = { ...payload };
          socket.send(JSON.stringify(orders));
        }
      }
      next(action);
    };
  };
};
