import { api } from '../../utils/burger-api';

export const ORDER_REQUEST: 'ORDER_REQUEST' = 'ORDER_REQUEST';
export const SET_ORDER_SUCCESS: 'SET_ORDER_SUCCESS' = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR: 'SET_ORDER_ERROR' = 'SET_ORDER_ERROR';

import { DispatchType } from '../hooks/hooks';

export function getOrder(data: Array<string>) {
    return function(dispatch: DispatchType) {      
      dispatch({
        type: ORDER_REQUEST,
      })
  
      api.getOrderNumber(data) //: Array<string>)
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