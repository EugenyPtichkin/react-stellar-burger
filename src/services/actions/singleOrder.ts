import { api } from "../../utils/burger-api";

import { AppDispatch, AppThunk } from "../types";

export const SET_ORDER_SUCCESS: 'SET_ORDER_SUCCESS' = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR: 'SET_ORDER_ERROR' = 'SET_ORDER_ERROR';

export const getSingleOrder: AppThunk = (number: number) => (dispatch: AppDispatch) => {
  api.getSingleOrderData(number)//: number)
    .then((res) => {
      dispatch({
        type: SET_ORDER_SUCCESS,
        payload: res.orders[0] /*сервер так упаковывает отдаваемые данные*/
      })
    })
    .catch((res) => {
      dispatch({
        type: SET_ORDER_ERROR,
        errorType: res
      })
    })
};