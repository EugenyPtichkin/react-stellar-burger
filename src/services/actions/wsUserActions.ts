import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
  WS_USER_SEND_MESSAGE
} from './wsUserActionTypes';

import { TWSMessage } from '../types/data';

export interface WsUserConnectionSuccess {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}
export interface WsUserConnectionError {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
}
export interface WsUserConnectionClosed {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
}
export interface WsUserGetMessage {
  readonly type: typeof WS_USER_GET_MESSAGE;
  payload: TWSMessage;
}
export interface WsUserSendMessage {
  readonly type: typeof WS_USER_SEND_MESSAGE;
  payload: TWSMessage;
}
export interface WsUserConnectAction {
  readonly type: typeof WS_USER_CONNECTION_START;
  payload: string;
}

export type WsUserActions = 
  | WsUserConnectionSuccess
  | WsUserConnectionError
  | WsUserConnectionClosed
  | WsUserGetMessage
  | WsUserSendMessage
  | WsUserConnectAction;
  
export const wsUserConnectionSuccess = (): WsUserConnectionSuccess => ({
  type: WS_USER_CONNECTION_SUCCESS
});

export const wsUserConnectionError = (): WsUserConnectionError => ({
  type: WS_USER_CONNECTION_ERROR
});

export const wsUserConnectionClosed = (): WsUserConnectionClosed => ({
  type: WS_USER_CONNECTION_CLOSED
});

export const wsUserGetMessage = (message: TWSMessage): WsUserGetMessage => ({
  type: WS_USER_GET_MESSAGE,
  payload: message
});

export const wsUserSendMessage = (message: TWSMessage): WsUserSendMessage => ({
  type: WS_USER_SEND_MESSAGE,
  payload: message
});

export const wsUserConnectAction = (url: string): WsUserConnectAction => ({
  type: WS_USER_CONNECTION_START,
  payload: url
});