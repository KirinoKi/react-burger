import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './roorReducer';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socketMiddleware';

import { wsUrl, wsActions, wsAuthUrl, wsAuthActions } from '../utils/utils';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions, false), socketMiddleware(wsAuthUrl, wsAuthActions, true)));
export const store = createStore(rootReducer, enhancer);
