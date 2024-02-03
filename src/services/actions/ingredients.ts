import { api } from '../../utils/burger-api';

import { AppDispatch, AppThunk } from '../types';
import { TBurger } from '../types/data';

export const INGREDIENTS_REQUEST: 'INGREDIENTS_REQUEST' = 'INGREDIENTS_REQUEST';
export const SET_INGREDIENTS_SUCCESS: 'SET_INGREDIENTS_SUCCESS' = 'SET_INGREDIENTS_SUCCESS';
export const SET_INGREDIENTS_ERROR: 'SET_INGREDIENTS_ERROR' = 'SET_INGREDIENTS_ERROR';

interface IIngredientsRequest {
  readonly type: typeof INGREDIENTS_REQUEST;
}
interface ISetIngredientsSuccess {
  readonly type: typeof SET_INGREDIENTS_SUCCESS;
  ingredients: TBurger | null;
}
interface ISetIngredientsError {
  readonly type: typeof SET_INGREDIENTS_ERROR;
  errorType: string;
}
export type TIngredientsActions =
  | IIngredientsRequest
  | ISetIngredientsSuccess
  | ISetIngredientsError;


export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: INGREDIENTS_REQUEST
  })
  api.getIngredientsData()
    .then((res) => {
      dispatch({
        type: SET_INGREDIENTS_SUCCESS,
        ingredients: res.data
      })
    })
    .catch((res) => {
      dispatch({
        type: SET_INGREDIENTS_ERROR,
        errorType: res.status
      })
    })
};
