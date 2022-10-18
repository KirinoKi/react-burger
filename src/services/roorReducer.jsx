import { combineReducers } from 'redux';
import { ingredientsListReducer } from './reducers/ingredients';
import { selectedIngredientsReducer } from './reducers/constructor';
import { orderNumbertReducer } from './reducers/order';
import { ingredientDataReducer } from './reducers/ingredient';
import { authReducer } from './reducers/auth';

export const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
  selectedIngredients: selectedIngredientsReducer,
  orderNumber: orderNumbertReducer,
  ingredientData: ingredientDataReducer,
  auth: authReducer
});

