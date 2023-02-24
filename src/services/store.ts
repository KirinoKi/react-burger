import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './roorReducer';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socketMiddleware';
import { wsUrl, wsActions, wsAuthUrl, wsAuthActions } from '../utils/utils';
import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook} from 'react-redux';
import { RootState, AppDispatch } from "../utils/types";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions, false), socketMiddleware(wsAuthUrl, wsAuthActions, true)));
export const store = createStore(rootReducer, enhancer);

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();
