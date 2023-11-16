import {getIngredientsData} from '../../utils/burger-api';

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const SET_INGREDIENTS_SUCCESS = 'SET_INGREDIENTS_SUCCESS';
export const SET_INGREDIENTS_ERROR = 'SET_INGREDIENTS_ERROR';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: INGREDIENTS_REQUEST
    })
    getIngredientsData()
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