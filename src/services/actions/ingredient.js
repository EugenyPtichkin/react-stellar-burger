export const FILL_ITEM = 'FILL_ITEM';
export const CLEAR_ITEM = 'CLEAR_ITEM';

export function fillItem(ingredient) {
  return function(dispatch) {
    dispatch({
      type: FILL_ITEM,
      ingredient: ingredient
    })
  }
}

export function clearItem() {
    return function(dispatch) {
      dispatch({
        type: CLEAR_ITEM
      })
    }
  }