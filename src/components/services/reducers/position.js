import {
  ADD_IN_VIEW
 } from '../actions/position';
  
const initialState = {
  items: []
}
  
export const positionReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_IN_VIEW:
      return {
        ...state,
        //items: [...state.items, { ...action.item, inView: action.inView }]
        items: [...state.items, { [action.item] : action.inView }]
      }  
  default:    
    return state
  }
}