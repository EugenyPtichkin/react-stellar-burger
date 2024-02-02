import { SET_ORDER_SUCCESS, SET_ORDER_ERROR } from '../actions/singleOrder';

import { TSingleOrder } from '../types/data'; 

const initialState: TSingleOrder = {
  order: null,
  errorType: false,
};

export const singleOrderReducer = (state = initialState, action: any): TSingleOrder => {
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