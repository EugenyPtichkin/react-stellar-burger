import { api } from "../../utils/burger-api";

export const SET_ORDER_SUCCESS = "SET_ORDER_SUCCESS";
export const SET_ORDER_ERROR = "SET_ORDER_ERROR";

export function getSingleOrder(number) {
  return function (dispatch) {
    api.getSingleOrderData(number)
      .then((res) => {
        dispatch({
          type: SET_ORDER_SUCCESS,
          payload : res.orders[0] /*вот как тут сервер оказывается упаковывает данные!*/
        })
      })
      .catch((res) => {
        dispatch({
          type: SET_ORDER_ERROR,
          errorType: res
        })
      })
  }
}