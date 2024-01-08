import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
  WS_USER_SEND_MESSAGE
  } from './wsUserActionTypes';

export const wsUserConnectionSuccess = () => {
  return {
    type: WS_USER_CONNECTION_SUCCESS
  };
};

export const wsUserConnectionError = () => {
  return {
    type: WS_USER_CONNECTION_ERROR
  };
};

export const wsUserConnectionClosed = () => {
  return {
    type: WS_USER_CONNECTION_CLOSED
  };
};

export const wsUserGetMessage = message => {
  return {
    type: WS_USER_GET_MESSAGE,
    payload: message
  };
};

export const wsUserSendMessage = message => {
  return {
    type: WS_USER_SEND_MESSAGE,
    payload: message
  };
};

export const wsUserConnectAction = url => {
  return {
    type: WS_USER_CONNECTION_START,
    payload: url
  };
};