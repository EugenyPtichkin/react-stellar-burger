import {
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
  WS_FEED_USER_NAME_UPDATE
} from './wsFeedActionTypes';

export const wsConnectionSuccess = () => {
  return {
    type: WS_FEED_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_FEED_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_FEED_CONNECTION_CLOSED
  };
};

export const wsGetMessage = message => {
  return {
    type: WS_FEED_GET_MESSAGE,
    payload: message
  };
};

export const wsSendMessage = message => {
  return {
    type: WS_FEED_SEND_MESSAGE,
    payload: message
  };
};

export const wsUserNameUpdate = userName => {
  return {
    type: WS_FEED_USER_NAME_UPDATE,
    payload: userName
  };
};