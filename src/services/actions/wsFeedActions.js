import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE
} from './wsFeedActionTypes';

export const wsFeedConnectionSuccess = () => {
  return {
    type: WS_FEED_CONNECTION_SUCCESS
  };
};

export const wsFeedConnectionError = () => {
  return {
    type: WS_FEED_CONNECTION_ERROR
  };
};

export const wsFeedConnectionClosed = () => {
  return {
    type: WS_FEED_CONNECTION_CLOSED
  };
};

export const wsFeedGetMessage = message => {
  return {
    type: WS_FEED_GET_MESSAGE,
    payload: message
  };
};

export const wsFeedSendMessage = message => {
  return {
    type: WS_FEED_SEND_MESSAGE,
    payload: message
  };
};

export const wsFeedConnectAction = url => {
  return {
    type: WS_FEED_CONNECTION_START,
    payload: url
  };
};
