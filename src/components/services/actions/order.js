import { getOrderNumber } from './../../../utils/order-api';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR = 'SET_ORDER_ERROR';

export function getOrder(data) {
    return function(dispatch) {      
      dispatch({
        type: ORDER_REQUEST,
      })
  
      getOrderNumber(data)
      .then(res => {
        if (res && res.success) {
          //console.log(res);
          dispatch( {
            type: SET_ORDER_SUCCESS,
            name: res.name,
            order: res.order.number,
            success: true
          })            
        } else {
          dispatch({
            type : SET_ORDER_ERROR,
            errorType : res.status
          })
        }})
      .catch(() =>  {
        dispatch({
          type : SET_ORDER_ERROR,
          errorType : 'unknown'
        })
      })
    }
  }