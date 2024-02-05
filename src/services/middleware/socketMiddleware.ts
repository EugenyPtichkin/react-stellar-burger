import { Middleware, MiddlewareAPI } from 'redux';
import { TWsFeedMiddlewareActions } from '../../services/actions/wsFeedActionTypes';
import { TWsUserMiddlewareActions } from '../../services/actions/wsUserActionTypes';
import { AppDispatch, RootState } from '../types';
import { TWsUserActions } from '../actions/wsUserActions';
import { TWsFeedActions } from '../actions/wsFeedActions';
import { TWSMessage } from '../types/data';

export const socketMiddleware = (wsActions: TWsFeedMiddlewareActions | TWsUserMiddlewareActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWsUserActions | TWsFeedActions) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsConnect, wsSendMessage, wsDisconnect, onOpen, onClose, onError, onMessage } = wsActions;
      
      if (type === wsConnect) {
        //console.log(payload);
        socket = new WebSocket(payload); //весь путь спрятан в payload
      }
      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message: TWSMessage = { ...payload};   //, token: localStorage.getItem("accessToken")
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