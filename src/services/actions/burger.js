import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUNS = 'ADD_BUNS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const DELETE_ALL_INGREDIENTS = 'DELETE_ALL_INGREDIENTS';

export function addBuns(item) {
  return function (dispatch) {
    dispatch({
      type: ADD_BUNS,
      data: item,
      uuid: uuidv4()
    })
  }
}
export function addIngredient(item) {
  return function (dispatch) {
    //console.log(item);    
    dispatch({
      type: ADD_INGREDIENT,
      data: item,
      uuid: uuidv4()
    })
  }
}
export function deleteIngredient(uuid) {
  return function (dispatch) {
    dispatch({
      type: DELETE_INGREDIENT,
      uuid: uuid
    })
  }
}
export function updateIngredients(ingredients) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_INGREDIENTS,
      data: ingredients
    })
  }
}
export function deleteAllIngredients() {
  return function (dispatch) {
    dispatch({
      type: DELETE_ALL_INGREDIENTS
    });
  }
}