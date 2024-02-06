import { api } from '../../utils/burger-api';

import { AppDispatch, AppThunk } from '../types';

export const ORDER_REQUEST: 'ORDER_REQUEST' = 'ORDER_REQUEST';
export const SET_ORDER_SUCCESS: 'SET_ORDER_SUCCESS' = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR: 'SET_ORDER_ERROR' = 'SET_ORDER_ERROR';

export const getOrder: AppThunk = (data: Array<string> | any) => (dispatch: AppDispatch) => {
  dispatch({
    type: ORDER_REQUEST,
  })

  api.getOrderNumber(data)
    .then((res) => {
      dispatch({
        type: SET_ORDER_SUCCESS,
        name: res.order.name,
        order: res.order.number,
        success: true
      })
    })
    .catch((res) => {
      dispatch({
        type: SET_ORDER_ERROR,
        errorType: res.status
      })
    })
};