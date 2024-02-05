import {
  WS_USER_CONNECTION_STOP,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
  WS_USER_SEND_MESSAGE
} from './wsUserActionTypes';

import { TWSMessage } from '../types/data';

export interface IWsUserConnectionStop {
  readonly type: typeof WS_USER_CONNECTION_STOP;
  payload: Event;
}
export interface IWsUserConnectionSuccess {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
  payload: Event;
}
export interface IWsUserConnectionError {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
  payload: Event;
}
export interface IWsUserConnectionClosed {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
  payload: Event;
}
export interface IWsUserGetMessage {
  readonly type: typeof WS_USER_GET_MESSAGE;
  payload: TWSMessage;
}
export interface IWsUserSendMessage {
  readonly type: typeof WS_USER_SEND_MESSAGE;
  payload: TWSMessage;
}
export interface IWsUserConnectAction {
  readonly type: typeof WS_USER_CONNECTION_START;
  payload: string;
}

export type TWsUserActions =
  | IWsUserConnectionStop
  | IWsUserConnectionSuccess
  | IWsUserConnectionError
  | IWsUserConnectionClosed
  | IWsUserGetMessage
  | IWsUserSendMessage
  | IWsUserConnectAction;


export const wsUserConnectionStop = (event: Event): IWsUserConnectionStop => ({
  type: WS_USER_CONNECTION_STOP,
  payload: event
});

export const wsUserConnectionSuccess = (event: Event): IWsUserConnectionSuccess => ({
  type: WS_USER_CONNECTION_SUCCESS,
  payload: event
});

export const wsUserConnectionError = (event: Event): IWsUserConnectionError => ({
  type: WS_USER_CONNECTION_ERROR,
  payload: event
});

export const wsUserConnectionClosed = (event: Event): IWsUserConnectionClosed => ({
  type: WS_USER_CONNECTION_CLOSED,
  payload: event
});

export const wsUserGetMessage = (message: TWSMessage): IWsUserGetMessage => ({
  type: WS_USER_GET_MESSAGE,
  payload: message
});

export const wsUserSendMessage = (message: TWSMessage): IWsUserSendMessage => ({
  type: WS_USER_SEND_MESSAGE,
  payload: message
});

export const wsUserConnectAction = (url: string): IWsUserConnectAction => ({
  type: WS_USER_CONNECTION_START,
  payload: url
});