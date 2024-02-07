  import {
    ORDER_REQUEST,
    SET_ORDER_SUCCESS,
    SET_ORDER_ERROR,    
} from '../actions/order';

import { TGetOrderNumberActions } from '../actions/order';
import { TOrderSet } from '../types/data';


  //cостояние заказа + статусы запросов
  const initialState: TOrderSet = {
    Ids: [],
    orderName: '',
    orderNumber: 0,
    orderRequest: false,
    orderIsError: false
  };

export const orderReducer = (state = initialState, action: TGetOrderNumberActions): TOrderSet => {
  switch (action.type) {
    case ORDER_REQUEST : 
      return {
        ...state,
        orderRequest: true,
        orderIsError: false
    }
    case SET_ORDER_SUCCESS : 
      return {
        ...state,
        orderName: action.payload.name,
        orderNumber: action.payload.number,
        orderRequest: false,
        orderIsError: false
      }
    case SET_ORDER_ERROR: 
      return {
        ...state,
        orderRequest: false,
        orderIsError: true
      }
    default:
        return state;
    
  }
}