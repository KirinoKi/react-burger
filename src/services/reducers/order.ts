import { PUT_AN_ORDER, PUT_AN_ORDER_FAILED, PUT_AN_ORDER_REQUEST } from "../actions/types";
import { TPutAnPrderActions } from '../actions/order';

type TOrderDataState = {
  readonly orderNumber: number | string;
  putAnOrderRequest: boolean;
  putAnOrderFailed: boolean;
}

const initialOrderNumberState: TOrderDataState = {
  orderNumber: '',
  putAnOrderRequest: false,
  putAnOrderFailed: false,
};

export const orderNumbertReducer = (state = initialOrderNumberState, action: TPutAnPrderActions): TOrderDataState => {
  switch (action.type) {
    case PUT_AN_ORDER_REQUEST: {
      return {
        ...state,
        putAnOrderRequest: true
      };
    }
    case PUT_AN_ORDER: {
      return { ...state, orderNumber: action.orderNumber, putAnOrderRequest: false, putAnOrderFailed: false };
    }
    case PUT_AN_ORDER_FAILED: {
      return { ...state, putAnOrderFailed: true, putAnOrderRequest: false };
    }
    default: {
      return state;
    }
  }
};
