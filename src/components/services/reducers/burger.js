import {
    ADD_INGREDIENT,
    ADD_BUNS,
    DELETE_INGREDIENT
} from '../actions/burger';

const initialState = {
    bun : null,
    ingredients : []
}

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUNS : 
      return {
        ...state,
        bun: action.data
      }
    case ADD_INGREDIENT : 
      return {
        ...state,
        ingredients: [...state.ingredients, {...action.data, uuid: action.uuid}]
      }
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients:  [state.ingredients].filter(item => item.uuid !== action.uuid)
      }
    default:
        return state
  }
}