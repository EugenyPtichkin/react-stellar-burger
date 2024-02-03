import { api } from '../../utils/burger-api';

import { AppDispatch, AppThunk } from '../types';
import { TIngredient } from '../types/data';

export const INGREDIENTS_REQUEST: 'INGREDIENTS_REQUEST' = 'INGREDIENTS_REQUEST';
export const SET_INGREDIENTS_SUCCESS: 'SET_INGREDIENTS_SUCCESS' = 'SET_INGREDIENTS_SUCCESS';
export const SET_INGREDIENTS_ERROR: 'SET_INGREDIENTS_ERROR' = 'SET_INGREDIENTS_ERROR';

interface IIngredientsRequest {
  readonly type: typeof INGREDIENTS_REQUEST;
}
interface ISetIngredientsSuccess {
  readonly type: typeof SET_INGREDIENTS_SUCCESS;
  ingredients: Array<TIngredient>;
}
interface ISetIngredientsError {
  readonly type: typeof SET_INGREDIENTS_ERROR;
  errorType: string;
}
export type TIngredientsActions =
  | IIngredientsRequest
  | ISetIngredientsSuccess
  | ISetIngredientsError;

export const ingredientsActions = (): TIngredientsActions => ({
  type: INGREDIENTS_REQUEST,
});

export const setIngredientsSuccess = (data: Array<TIngredient>): ISetIngredientsSuccess => ({
  type: SET_INGREDIENTS_SUCCESS,
  ingredients: data,
});

export const setIngredientsError = (data: string): ISetIngredientsError => ({
  type: SET_INGREDIENTS_ERROR,
  errorType: data,
});

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(ingredientsActions());
  api.getIngredientsData()
    .then((res) => {
      dispatch(setIngredientsSuccess(res.data));
    })
    .catch((res) => {
      dispatch(setIngredientsError(res.status));
    })
};
