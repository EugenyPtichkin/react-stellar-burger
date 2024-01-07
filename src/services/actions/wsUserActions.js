import {
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
  WS_USER_SEND_MESSAGE,
  WS_USER_USER_NAME_UPDATE
} from './wsUserActionTypes';

export const wsConnectionSuccess = () => {
  return {
    type: WS_USER_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_USER_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_USER_CONNECTION_CLOSED
  };
};

export const wsGetMessage = message => {
  return {
    type: WS_USER_GET_MESSAGE,
    payload: message
  };
};

export const wsSendMessage = message => {
  return {
    type: WS_USER_SEND_MESSAGE,
    payload: message
  };
};

export const wsUserNameUpdate = userName => {
  return {
    type: WS_USER_USER_NAME_UPDATE,
    payload: userName
  };
};