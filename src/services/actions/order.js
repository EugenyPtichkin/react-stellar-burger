import { getOrderNumber } from '../../utils/burger-api';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR = 'SET_ORDER_ERROR';

export function getOrder(data) {
    return function(dispatch) {      
      dispatch({
        type: ORDER_REQUEST,
      })
  
      getOrderNumber(data)
      .then((res) => {
          dispatch( {
            type: SET_ORDER_SUCCESS,
            name: res.name,
            order: res.order.number,
            success: true
          })    
        }) 
      .catch((res) =>  {
        dispatch({
          type : SET_ORDER_ERROR,
          errorType : res.status
        })
      })
    }
  }