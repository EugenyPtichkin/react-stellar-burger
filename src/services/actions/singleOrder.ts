import { api } from "../../utils/burger-api";

import { AppDispatch, AppThunk } from "../types";
import { TWSOrder } from "../types/data";

export const SET_ORDER_SUCCESS: 'SET_ORDER_SUCCESS' = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR: 'SET_ORDER_ERROR' = 'SET_ORDER_ERROR';


export interface ISetSingleOrderErrorAction {
  readonly type: typeof SET_ORDER_ERROR,
  errorType: boolean
}

export interface ISetSingleOrderSuccesAction {
  readonly type: typeof SET_ORDER_SUCCESS,
  readonly order: TWSOrder
}

export type TSingleOrderActions = ISetSingleOrderErrorAction | ISetSingleOrderSuccesAction;

export const setSingleOrderErrorAction = ():ISetSingleOrderErrorAction => ({
  type: SET_ORDER_ERROR,
  errorType: true
});

export const setSingleOrderSuccessAction = (order:TWSOrder):ISetSingleOrderSuccesAction => ({
  type: SET_ORDER_SUCCESS,
  order: order
});

export const getSingleOrder: AppThunk = (number: number) => (dispatch: AppDispatch) => {
  api.getSingleOrderData(number)//: number)
    .then((res) => {
      dispatch(setSingleOrderSuccessAction(res.orders[0]))
    })
    .catch((res) => {
      dispatch(setSingleOrderErrorAction());
    })
};