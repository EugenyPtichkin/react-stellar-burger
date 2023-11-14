import {
  ADD_Y_COORDINATE
 } from '../actions/position';
  
const initialState = {
  items: []
}
  
export const positionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_Y_COORDINATE:
      return {
        ...state,
        items: [...state.items, { ...action.item, coordinate: action.coordinate }]
      }  
  default:
    return state
  }
}