import {  GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../actions/types";
import { TIngredientWithUniqueId } from '../../utils/types';
import { TGetIngredientsActions } from '../actions/ingredients';

type TIngredientsState = {
  ingredients: ReadonlyArray<TIngredientWithUniqueId>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

const initiaIngredientsState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsListReducer = (state = initiaIngredientsState, action: TGetIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    default: {
      return state;
    }
  }
};
