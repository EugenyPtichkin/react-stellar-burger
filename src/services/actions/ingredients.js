import { api } from '../../utils/burger-api';

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const SET_INGREDIENTS_SUCCESS = 'SET_INGREDIENTS_SUCCESS';
export const ADD_INGREDIENT_SUCCESS = 'ADD_INGREDIENT_SUCCESS';
export const SET_INGREDIENTS_ERROR = 'SET_INGREDIENTS_ERROR';

export function getIngredients() {
  return function(dispatch) {
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

export function getSingleIngredient(number) {
  return function(dispatch) {
    dispatch({
      type: INGREDIENTS_REQUEST
    })
    api.getSingleIngredientData(number)
    .then((res) => {
      dispatch( {
          type: ADD_INGREDIENT_SUCCESS,
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
