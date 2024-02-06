import { SET_ORDER_SUCCESS, SET_ORDER_ERROR, TSingleOrderActions } from '../actions/singleOrder';
import { TSingleOrder } from '../types/data'; 

const initialState: TSingleOrder = {
  order: null,
  errorType: false,
};

export const singleOrderReducer = (state = initialState, action: TSingleOrderActions ): TSingleOrder => {
  switch (action.type) {
    case SET_ORDER_SUCCESS:
      return {
        ...state,
        order: action.order,
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