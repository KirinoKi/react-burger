import {
  GET_SELECTED_INGREDIENTS, ADD_INGREDIENT, ADD_BUN, DELETE_INGREDIENT, REORDER_INGREDIENTS_IN_CONSTRUCTOR,
  RESET_CONSTRUCTOR
} from "../actions/types";
import { TIngredientWithUniqueId } from '../../utils/types';
import { TConstructorActions } from '../actions/constructor';

type TConstructorState = {
  bun: null | TIngredientWithUniqueId;
  ingredients: TIngredientWithUniqueId[];
};

const constructorInitialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const selectedIngredientsReducer = (state = constructorInitialState, action: TConstructorActions): TConstructorState => {
  switch (action.type) {
    case GET_SELECTED_INGREDIENTS: {
      return {
        ...state,
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.payload
      }
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(item => item.id !== action.payload.id)
      }
    }
    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        bun: null,
        ingredients: []
      }
    }
    case REORDER_INGREDIENTS_IN_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: action.payload
      }
    }
    default: {
      return state;
    }
  }
};

