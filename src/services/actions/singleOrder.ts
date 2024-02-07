import { api } from "../../utils/api";

import { AppDispatch, AppThunk } from "../types";
import { TWSOrder } from "../types/data";

export const SET_ORDER_SUCCESS: 'SET_ORDER_SUCCESS' = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR: 'SET_ORDER_ERROR' = 'SET_ORDER_ERROR';
export const SET_ORDER: 'SET_ORDER' = 'SET_ORDER';


export interface ISetSingleOrderErrorAction {
  readonly type: typeof SET_ORDER_ERROR,
  errorType: boolean
}

export interface ISetSingleOrderSuccessAction {
  readonly type: typeof SET_ORDER_SUCCESS,
  readonly payload: Array<TWSOrder>
}

export interface ISetSingleOrderAction {
  readonly type: typeof SET_ORDER,
  readonly payload: TWSOrder
}


export type TSingleOrderActions = ISetSingleOrderErrorAction | ISetSingleOrderSuccessAction | ISetSingleOrderAction;

export const setSingleOrderErrorAction = ():ISetSingleOrderErrorAction => ({
  type: SET_ORDER_ERROR,
  errorType: true
});

export const setSingleOrderSuccessAction = (order:Array<TWSOrder>):ISetSingleOrderSuccessAction => ({
  type: SET_ORDER_SUCCESS,
  payload: order
});

export const setSingleOrderAction = (order:TWSOrder):ISetSingleOrderAction => ({
  type: SET_ORDER,
  payload: order
});

export const getSingleOrder: AppThunk = (number: number) => (dispatch: AppDispatch) => {
  api.getSingleOrderData(number)
    .then((res) => {
      dispatch(setSingleOrderSuccessAction(res.orders))
    })
    .catch((res) => {
      dispatch(setSingleOrderErrorAction());
    })
};