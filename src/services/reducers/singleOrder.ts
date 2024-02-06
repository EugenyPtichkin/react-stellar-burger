import { SET_ORDER_SUCCESS, SET_ORDER_ERROR, TSingleOrderActions, SET_ORDER } from '../actions/singleOrder';
import { TOrder } from '../types/data'; 

const initialState: TOrder = {
  order: null,
  errorType: false,
};

export const singleOrderReducer = (state = initialState, action: TSingleOrderActions ): TOrder => {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
        errorType: false,
      }
    case SET_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload[0],
        errorType: false,
      }
    case SET_ORDER_ERROR:
      return {
        ...state,
        errorType: true,
      }
    default:
      return state;
  }
};