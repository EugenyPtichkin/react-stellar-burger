import {
  WS_FEED_CONNECTION_STOP,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE
} from './wsFeedActionTypes';

import { TWSMessage } from '../types/data';


export interface IWsFeedConnectionStop {
  readonly type: typeof WS_FEED_CONNECTION_STOP;
  payload: Event;
}

export interface IWsFeedConnectionSuccess {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
  payload: Event;
}
export interface IWsFeedConnectionError {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
  payload: Event;
}
export interface IWsFeedConnectionClosed {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
  payload: Event;
}
export interface IWsFeedGetMessage {
  readonly type: typeof WS_FEED_GET_MESSAGE;
  payload: TWSMessage;
}
export interface IWsFeedSendMessage {
  readonly type: typeof WS_FEED_SEND_MESSAGE;
  payload: TWSMessage;
}
export interface IWsFeedConnectAction {
  readonly type: typeof WS_FEED_CONNECTION_START;
  payload: string;
}

export type TWsFeedActions =
  | IWsFeedConnectionStop
  | IWsFeedConnectionSuccess
  | IWsFeedConnectionError
  | IWsFeedConnectionClosed
  | IWsFeedGetMessage
  | IWsFeedSendMessage
  | IWsFeedConnectAction;

export const wsFeedConnectionStop = (event: Event): IWsFeedConnectionStop => ({
  type: WS_FEED_CONNECTION_STOP,
  payload: event
});

export const wsFeedConnectionSuccess = (event: Event): IWsFeedConnectionSuccess => ({
  type: WS_FEED_CONNECTION_SUCCESS,
  payload: event
});

export const wsFeedConnectionError = (event: Event): IWsFeedConnectionError => ({
  type: WS_FEED_CONNECTION_ERROR,
  payload: event
});

export const wsFeedConnectionClosed = (event: Event): IWsFeedConnectionClosed => ({
  type: WS_FEED_CONNECTION_CLOSED,
  payload: event
});

export const wsFeedGetMessage = (message: TWSMessage): IWsFeedGetMessage => ({
  type: WS_FEED_GET_MESSAGE,
  payload: message
});

export const wsFeedSendMessage = (message: TWSMessage): IWsFeedSendMessage => ({
  type: WS_FEED_SEND_MESSAGE,
  payload: message
});

export const wsFeedConnectAction = (url: string): IWsFeedConnectAction => ({
  type: WS_FEED_CONNECTION_START,
  payload: url
});