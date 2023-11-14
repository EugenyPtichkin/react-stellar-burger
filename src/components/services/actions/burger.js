import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUNS = 'ADD_BUNS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export function addBuns(item) {
  return function(dispatch) {
    dispatch ({
      type: ADD_BUNS,
      data: item,
      uuid: uuidv4()
    })
  }
}

export function addIngredient(item) {
    return function(dispatch) {
      //console.log(item);    
      dispatch ({
        type: ADD_INGREDIENT,
        data: item,
        uuid: uuidv4()
      })
    }
  }

  export function deleteIngredient(uuid) {
    return function(dispatch) {
      dispatch ({
        type: DELETE_INGREDIENT,
        uuid: uuid
      })
    }
  }