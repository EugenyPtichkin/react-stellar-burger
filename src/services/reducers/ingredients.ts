import {
  INGREDIENTS_REQUEST,
  SET_INGREDIENTS_SUCCESS,
  SET_INGREDIENTS_ERROR
} from '../actions/ingredients';

import { TIngredientsSet } from '../types/data';
import { TIngredientsActions } from '../actions/ingredients';

//перечень доступных ингредиентов + статусы запросов
const initialState: TIngredientsSet = {
  ingredients: null,
  ingredientsLoading: true,
  ingredientsError: false,
  ingredientsErrorType: ''
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsSet => {
  switch (action.type) {
    case INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsLoading: true,
        ingredientsError: false,
        ingredientsErrorType: ''
      }
    }
    case SET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsLoading: false,
        ingredientsError: false,
        ingredientsErrorType: ''
      }
    }
    case SET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsLoading: false,
        ingredientsError: true,
        ingredientsErrorType: action.errorType
      }
    }
    default: {
      return state;
    }
  }
}