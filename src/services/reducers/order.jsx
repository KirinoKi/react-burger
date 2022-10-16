import { PUT_AN_ORDER, PUT_AN_ORDER_FAILED, PUT_AN_ORDER_REQUEST } from "../actions/types"

const initialOrderNumberState = {
  orderNumber: '',
  putAnOrderRequest: false,
  putAnOrderFailed: false,
};

export const orderNumbertReducer = (state = initialOrderNumberState, action) => {
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
