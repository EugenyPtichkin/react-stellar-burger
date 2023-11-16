import {
  ADD_INGREDIENT,
  ADD_BUNS,
  DELETE_INGREDIENT,
  UPDATE_INGREDIENTS,
  DELETE_ALL_INGREDIENTS,
} from '../actions/burger';

const initialState = {
  bun: null,
  ingredients: []
}

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUNS:
      return {
        ...state,
        bun: action.data
      }
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, { ...action.data, uuid: action.uuid }]
      }
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients].filter(item => item.uuid !== action.uuid)
      }
    case UPDATE_INGREDIENTS:
      return {
        ...state,
        ingredients: action.data
      }
    case DELETE_ALL_INGREDIENTS:
      return {
        ...state,
        bun: null,
        ingredients: []
      }
    default:
      return state
  }
}