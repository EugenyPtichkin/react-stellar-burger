  import {
    ORDER_REQUEST,
    SET_ORDER_SUCCESS,
    SET_ORDER_ERROR    
} from '../actions/order';

  //cостояние заказа + статусы запросов
  const initialState = {
    Ids: [],
    orderName: '',
    orderNumber: 0,
    orderRequest: false,
    orderSuccess: false,
    orderIsError: false,
    orderErrorType: ''
  };

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST : 
      return {
        ...state,
        orderRequest: true,
        orderIsError: false,
        orderErrorType: ''
    }
    case SET_ORDER_SUCCESS : 
      return {
        ...state,
        orderName: action.name,
        orderNumber: action.order,
        orderRequest: false,
        orderSuccess: action.success,
        orderIsError: false,
        orderErrorType: ''
      }
    case SET_ORDER_ERROR: 
      return {
        ...state,
        orderRequest: false,
        orderIsError: true,
        orderErrorType: action.errorType
      }
    default:
        return state;
    
  }
}