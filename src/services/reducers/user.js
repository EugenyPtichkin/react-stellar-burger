import { SET_AUTH_CHECKED, SET_USER, SET_AUTH_ERROR } from './../actions/user';

const initialState = {
    user: null,
    isAuthChecked: false,
    isAuthError: false,
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
    case SET_AUTH_ERROR:
        return {
          ...state,
          isAuthError: action.payload,
        }
    default:
      return state;    
  }
};