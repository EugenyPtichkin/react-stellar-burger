import { SET_ORDER_SUCCESS, SET_ORDER_ERROR } from './../actions/singleOrder';

const initialState = {
  order: null,
  errorType: false,
};

export const singleOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload
      }
    case SET_ORDER_ERROR:
      return {
        ...state,
        errorType: action.payload,
      }
    default:
      return state;
  }
};