export const ADD_IN_VIEW = 'ADD_IN_VIEW';

export function addInView(item, inView) {
    return function(dispatch) {
      console.log('Item:', item, ' InView:', inView);      
      dispatch({
        type: ADD_IN_VIEW,
        item: item,
        inView: inView
      })
    }
  }