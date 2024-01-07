export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsConnect, wsSendMessage, wsDisconnect, onOpen, onClose, onError, onMessage } = wsActions;
      const { user, token } = getState().user;
      const wsFeed= getState().wsFeed;
      const wsUser = getState().wsUser;
      if (type === wsConnect) {//временная затычка пока не придумал как изменить
        if (wsUser && wsUser.wsEndPoint) {
          socket = new WebSocket(`${wsUrl}${wsUser.wsEndPoint}?token=${token}`);
        }
        else if (wsFeed&& wsFeed.wsEndPoint) { 
          socket = new WebSocket(`${wsUrl}${wsFeed.wsEndPoint}`);
        }
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