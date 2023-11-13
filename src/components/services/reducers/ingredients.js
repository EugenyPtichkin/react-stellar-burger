import {
    INGREDIENTS_REQUEST,
    SET_INGREDIENTS_SUCCESS,
    SET_INGREDIENTS_ERROR     
  } from '../actions/ingredients';

  //перечень доступных ингредиентов + статусы запросов
  const initialState = {
    ingredientsData: null,
    ingredientsLoading: false,
    ingredientsError: false,
    ingredientsErrorType: ''
  };
  
  export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case INGREDIENTS_REQUEST: {
        return {
          ...state,
          ingredientsLoading: true,
          ingredientsLoading: false,
          ingredientsErrorType: ''
        }
      }
      case SET_INGREDIENTS_SUCCESS: {
        return {
          ...state,
          ingredientsData: action.ingredients,
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