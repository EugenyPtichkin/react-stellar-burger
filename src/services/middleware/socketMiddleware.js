export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsConnect, wsSendMessage, wsDisconnect, onOpen, onClose, onError, onMessage } = wsActions;
      const { user, token } = getState().user;
      const { wsEndPoint } = getState().wsFeed;
      console.log(`${wsUrl}${wsEndPoint}`);
      console.log(`token=${token}`);
      if (type === wsConnect) {
          socket = new WebSocket(`${wsUrl}${wsEndPoint}?token=${token}`);
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
          const message = { ...payload, token: user.token };
          socket.send(JSON.stringify(message));
        }

        if (type === wsDisconnect && socket.readyState === 1) {
          socket.close(1000, "работа закончена по умолчанию - нормальное закрытие")
          socket = null
        }
      }

      next(action);
    };
  };
};