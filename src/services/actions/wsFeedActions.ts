import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE
} from './wsFeedActionTypes';

export interface WsFeedConnectionSuccess {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}
export interface WsFeedConnectionError {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
}
export interface WsFeedConnectionClosed {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}
export interface WsFeedGetMessage {
  readonly type: typeof WS_FEED_GET_MESSAGE;
  payload: [];
  timestamp: number;
}
export interface WsFeedSendMessage {
  readonly type: typeof WS_FEED_SEND_MESSAGE;
  payload: string;
}
export interface WsFeedConnectAction {
  readonly type: typeof WS_FEED_CONNECTION_START;
  payload: string;
}

export type WsFeedActions = 
  | WsFeedConnectionSuccess
  | WsFeedConnectionError
  | WsFeedConnectionClosed
  | WsFeedGetMessage
  | WsFeedSendMessage
  | WsFeedConnectAction;

export const wsFeedConnectionSuccess = (): WsFeedConnectionSuccess => ({
  type: WS_FEED_CONNECTION_SUCCESS
});

export const wsFeedConnectionError = (): WsFeedConnectionError => ({
  type: WS_FEED_CONNECTION_ERROR
});

export const wsFeedConnectionClosed = (): WsFeedConnectionClosed => ({
  type: WS_FEED_CONNECTION_CLOSED
});

export const wsFeedGetMessage = (message: []): WsFeedGetMessage => ({
  type: WS_FEED_GET_MESSAGE,
  payload: message,
  timestamp: 0
});

export const wsFeedSendMessage = (message: string): WsFeedSendMessage => ({
  type: WS_FEED_SEND_MESSAGE,
  payload: message
});

export const wsFeedConnectAction = (url: string): WsFeedConnectAction => ({
  type: WS_FEED_CONNECTION_START,
  payload: url
});