import { api } from '../../utils/api';

import { AppDispatch, AppThunk } from '../types';
import { TWSOrder } from '../types/data';

export const ORDER_REQUEST: 'ORDER_REQUEST' = 'ORDER_REQUEST';
export const SET_ORDER_SUCCESS: 'SET_ORDER_SUCCESS' = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR: 'SET_ORDER_ERROR' = 'SET_ORDER_ERROR';

export interface IGetOrderAction {
  readonly type: typeof ORDER_REQUEST;
}

export interface ISetOrderErrorAction {
  readonly type: typeof SET_ORDER_ERROR; 
  readonly error: string
}

export interface ISetOrderSuccesAction {
  readonly type: typeof SET_ORDER_SUCCESS,
  readonly payload: TWSOrder
}

export type TGetOrderNumberActions = ISetOrderErrorAction | ISetOrderSuccesAction | IGetOrderAction;

export const getOrderAction = ():IGetOrderAction => ({
  type: ORDER_REQUEST
});

export const setOrderErrorAction = (error:string):ISetOrderErrorAction => ({
  type: SET_ORDER_ERROR,
  error: error
});

export const setOrderSuccessAction = (order:TWSOrder):ISetOrderSuccesAction => ({
  type: SET_ORDER_SUCCESS,
  payload: order
});

export const getOrder: AppThunk = (data: Array<string> ) => (dispatch: AppDispatch) => {
  dispatch(getOrderAction());

  api.getOrderNumber(data)
    .then((res) => {
       dispatch(setOrderSuccessAction(res.order));
      })
    .catch((err) => {
      dispatch(dispatch(setOrderErrorAction(err.status)));
    })
};