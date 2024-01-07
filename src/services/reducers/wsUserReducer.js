import {
  WS_USER_SET_ENDPOINT,
  WS_USER_USER_NAME_UPDATE,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE
} from '../actions/wsUserActionTypes';

const initialState = {
  wsEndPoint: '',
  wsConnected: false,
  messages: []
};

export const wsUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_USER_SET_ENDPOINT:
      return {
        ...state,
        wsEndPoint: action.payload
      };
    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_USER_GET_MESSAGE:
      return {
        ...state,
        messages: state.messages.length
          ? [...state.messages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
          : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }]
      };
    case WS_USER_USER_NAME_UPDATE:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};