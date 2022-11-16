import { putAnOrder } from '../../utils/api';
import { PUT_AN_ORDER, PUT_AN_ORDER_FAILED, PUT_AN_ORDER_REQUEST } from "./types";
import { resetConstructor } from './constructor';
import { TOrderData, AppThunk } from '../../utils/types';

export type TPutAnPrderActions =
  | IPutAnOrderOnServerAction
  | IShowErrorWhenPutAnOrderFailedrAction
  | IPutAnOrderRequestAction;

export interface IPutAnOrderRequestAction {
  readonly type: typeof PUT_AN_ORDER_REQUEST;
}

export interface IPutAnOrderOnServerAction {
  readonly type: typeof PUT_AN_ORDER;
  readonly orderNumber: number;
};

export interface IShowErrorWhenPutAnOrderFailedrAction {
  readonly type: typeof PUT_AN_ORDER_FAILED;
  readonly payload: string;
};

const putAnOrderOnServer = (res: TOrderData): IPutAnOrderOnServerAction => {
  return {
    type: PUT_AN_ORDER,
    orderNumber: res.order.number
  }
};

const showErrorWhenPutAnOrderFailed = (err: { message: string; }): IShowErrorWhenPutAnOrderFailedrAction => {
  return {
    type: PUT_AN_ORDER_FAILED,
    payload: `Произошла Ошибка размещения заказа: ${err.message}`
  }
};

export const sendOrder = (id: Array<string>): AppThunk<Promise<unknown>> => (dispatch) => {
  dispatch({
    type: PUT_AN_ORDER_REQUEST
  });
  return putAnOrder(id)
    .then(res => {
      dispatch(putAnOrderOnServer(res));
      dispatch(resetConstructor());
    })
    .catch(err => {
      dispatch(showErrorWhenPutAnOrderFailed(err))
    })
};
