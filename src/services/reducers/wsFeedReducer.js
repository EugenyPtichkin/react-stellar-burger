import {
  WS_FEED_SET_ENDPOINT,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE
} from '../actions/wsFeedActionTypes';

const initialState = {
  wsEndPoint: '',
  wsConnected: false,
  messages: []
};

export const wsFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_FEED_SET_ENDPOINT:
      return {
        ...state,
        wsEndPoint: action.payload
      };
    case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_FEED_GET_MESSAGE:
      return {
        ...state,
        messages: state.messages.length
          ? [...state.messages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
          : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }]
      };
    default:
      return state;
  }
};