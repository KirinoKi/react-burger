import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_CLOSE,
  WS_AUTH_GET_ORDERS
} from "../actions/types";
import { TOrder } from "../../utils/types";
import { TWsAuthActions } from "../actions/wsAuth"

type TWsAuthState = {
  wsConnected: boolean;
  orders: TOrder['orders'];
  total: number | null;
  totalToday: number | null;
};

const initialState: TWsAuthState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null
};

export const wsAuthReducer = (state = initialState, action: TWsAuthActions): TWsAuthState => {
  switch (action.type) {
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_AUTH_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_AUTH_GET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };

      case WS_AUTH_CONNECTION_CLOSE:
        return {
          ...state,
          wsConnected: false
        };

    default:
      return state;
  }
};
