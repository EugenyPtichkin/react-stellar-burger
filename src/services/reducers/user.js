import { SET_AUTH_CHECKED, SET_USER, SET_TOKEN, SET_AUTH_ERROR } from './../actions/user';

const initialState = {
    user: null,
    isAuthChecked: false,
    isAuthError: false,
    token: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
        isAuthError: false,
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
      case SET_TOKEN:
        return {
          ...state,
          token: action.payload
        }
    case SET_AUTH_ERROR:
        return {
          ...state,
          isAuthError: action.payload,
          token: null,
        }
    default:
      return state;    
  }
};