import {
  FILL_ITEM,
  CLEAR_ITEM
} from '../actions/ingredient';

const initialState = {
  _id:'',
  name:'',
  type:'',
  proteins:0,
  fat:0,
  carbohydrates:0,
  calories:0,
  price:0,
  image:'',
  image_mobile:'',
  image_large:'',
  __v:0    
}

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
      case FILL_ITEM: {
        return {
          ...state,
          _id: action.ingredient._id,
          name: action.ingredient.name,
          type: action.ingredient.type,
          proteins: action.ingredient.proteins,
          fat: action.ingredient.fat,
          carbohydrates: action.ingredient.carbohydrates,
          calories: action.ingredient.calories,
          price: action.ingredient.price,
          image: action.ingredient.image,
          image_mobile: action.ingredient.image_mobile,
          image_large: action.ingredient.image_large,
          __v: action.ingredient.__v  
        };
      }
      case CLEAR_ITEM: {
        return {
          state: initialState
        };
      }
      default: {
        return state;
      }
    }
}