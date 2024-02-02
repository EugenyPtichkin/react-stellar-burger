import { api } from '../../utils/burger-api';

export const INGREDIENTS_REQUEST: 'INGREDIENTS_REQUEST' = 'INGREDIENTS_REQUEST';
export const SET_INGREDIENTS_SUCCESS: 'SET_INGREDIENTS_SUCCESS' = 'SET_INGREDIENTS_SUCCESS';
export const SET_INGREDIENTS_ERROR: 'SET_INGREDIENTS_ERROR' = 'SET_INGREDIENTS_ERROR';

import { DispatchType } from '../hooks/hooks';
import { TBurger } from '../types/data';

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

export const getIngredients: any = () => {
  return function(dispatch: DispatchType) {
    dispatch({
      type: INGREDIENTS_REQUEST
    })
    api.getIngredientsData()
    .then((res) => {
      dispatch( {
          type: SET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })            
      })
    .catch((res) =>  {
      dispatch({
        type : SET_INGREDIENTS_ERROR,
        errorType : res.status
      })
    })
  }
}
