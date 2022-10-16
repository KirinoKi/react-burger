import { putAnOrder } from '../../utils/api';
import { PUT_AN_ORDER, PUT_AN_ORDER_FAILED, PUT_AN_ORDER_REQUEST } from "./types";
import { resetConstructor } from './constructor'

function putAnOrderOnServer(res) {
  return {
    type: PUT_AN_ORDER,
    orderNumber: res.order.number
  }
}

function showErrorWhenPutAnOrderFailed(err) {
  return {
    type: PUT_AN_ORDER_FAILED,
    payload: `Произошла Ошибка размещения заказа: ${err.message}`
  }
}

export function sendOrder(id) {
  return function(dispatch) {
    dispatch({
      type: PUT_AN_ORDER_REQUEST
    });
    putAnOrder(id)
      .then(res => {
        dispatch(putAnOrderOnServer(res));
        dispatch(resetConstructor());
      })
      .catch(err => {
        dispatch(showErrorWhenPutAnOrderFailed(err))
      })
  };
}
