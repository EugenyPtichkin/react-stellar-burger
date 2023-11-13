import {
    ADD_ITEMS,
    SET_ISLOADING,
    RESET_ISLOADING,
    SET_ISERROR,
    RESET_ISERROR,
    SET_ERROR,
    RESET_ERROR,
  } from '../actions/ingredients';

  //перечень доступных ингредиентов
  const initialState = {
    ingredientsData: null,
    isLoading: true,
    isError: false,
    errorType: ''
  };
  
  export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ITEMS: {
        return {
          ...state,
          ingredientsData: action.data
        };
      }
      case SET_ISLOADING: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case RESET_ISLOADING: {
        return {
            ...state,
            isLoading: false,
          };
      }
      case SET_ISERROR: {
        return {
            ...state,
            isError: true,
          };
      }
      case RESET_ISERROR: {
        return {
            ...state,
            isError: false,
          };
      }
      case SET_ERROR: {
        return {
            ...state,
            errorType: action.error,
          };
      }
      case RESET_ERROR: {
        return {
            ...state,
            errorType: '',
          };
      }
      default: {
        return state;
      }
    }
  };