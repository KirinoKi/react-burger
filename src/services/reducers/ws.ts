import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSE,
  WS_GET_ORDERS
} from "../actions/types";
import { TOrder } from "../../utils/types";
import { TWsActions } from "../actions/ws";

type TWsState = {
  wsConnected: boolean;
  orders: TOrder['orders'];
  total: number | null;
  totalToday: number | null;
};

const initialState: TWsState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null
};

export const wsReducer = (state = initialState, action: TWsActions ): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };

      case WS_CONNECTION_CLOSE:
        return {
          ...initialState,
          wsConnected: false
        };

    default:
      return state;
  }
};
