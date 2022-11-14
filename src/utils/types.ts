import { TIngredientInModalActions } from '../services/actions/ingredient';
import { TPutAnPrderActions } from '../services/actions/order';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TAuthActions } from "../services/actions/auth";
import { TConstructorActions } from "../services/actions/constructor";
import { TGetIngredientsActions} from "../services/actions/ingredients";
import { TWsActions } from "../services/actions/ws";
import { TWsAuthActions } from "../services/actions/wsAuth";
import {rootReducer} from "../services/roorReducer";


type TApplicationActions = TIngredientInModalActions
| TPutAnPrderActions
| TAuthActions
| TConstructorActions
| TGetIngredientsActions
| TWsActions
| TWsAuthActions;

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type TIngredient = {
  _id: string;
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TIngredientsResponse = {
  data: TIngredientWithUniqueId[];
  success: boolean;
}

export type TIngredientWithUniqueId = TIngredient & { id: string };

export type TOrderData = {
  name: string;
  order: { number: number };
  success: boolean;
};

export type TUser = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type TOrderDetails = {
  ingredients: Array<string>;
  _id: string;
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  id?: string;
  count?: TCount
};

export type TCount = {
  [elem: string]: number
}

export type TOrder = {
  success: boolean;
  orders: TOrderDetails[];
  total: number;
  totalToday: number;
};

export type TDefaulResponse = {
  success: boolean;
  message: string;
};


export type TRefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TWs = {
  wsInit: string;
  wsSendMessage: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsClose: string;
};