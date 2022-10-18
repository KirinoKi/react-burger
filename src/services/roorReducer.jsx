import { combineReducers } from 'redux';
import { ingredientsListReducer } from './reducers/ingredients';
import { selectedIngredientsReducer } from './reducers/constructor';
import { orderNumbertReducer } from './reducers/order';
import { ingredientDataReducer } from './reducers/ingredient';
import { authReducer } from './reducers/auth';
import { wsReducer } from './reducers/ws';
import { wsAuthReducer } from './reducers/wsAuth';

export const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
  selectedIngredients: selectedIngredientsReducer,
  orderNumber: orderNumbertReducer,
  ingredientData: ingredientDataReducer,
  auth: authReducer,
  ws: wsReducer,
  wsAuth: wsAuthReducer
});

