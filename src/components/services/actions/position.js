export const ADD_Y_COORDINATE = 'ADD_Y_COORDINATE';

export function addYCoordinate(item, coordinate) {
    return function(dispatch) {
      console.log(item.type);
      console.log(coordinate);
      dispatch({
        type: ADD_Y_COORDINATE,
        item: item,
        coordinate: coordinate
      })
    }
  }