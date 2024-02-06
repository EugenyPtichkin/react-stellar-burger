import { SET_AUTH_CHECKED, SET_USER, SET_AUTH_ERROR, TUserActions } from '../actions/user';


import { TUserSet } from '../types/data';

const initialState: TUserSet = {
    user: null,
    isAuthChecked: false,
    isAuthError: false,
};

export const userReducer = (state = initialState, action: TUserActions): TUserSet => {
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