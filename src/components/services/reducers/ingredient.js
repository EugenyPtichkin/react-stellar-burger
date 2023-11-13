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
          _id: action._id,
          name: action.name,
          type: action.type,
          proteins: action.proteins,
          fat: action.fat,
          carbohydrates: action.carbohydrates,
          calories: action.calories,
          price: action.price,
          image: action.image,
          image_mobile: action.image_mobile,
          image_large: action.image_large,
          __v: action.__v  
        };
      }
      case CLEAR_ITEM: {
        return {
          ...state,
          state: initialState
        };
      }
      default: {
        return state;
      }
    }
}