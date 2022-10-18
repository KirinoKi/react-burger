import { ADD_INGREDIENT_DATA_IN_MODAL, REMOVE_INGREDIENT_DATA_FROM_MODAL } from "../actions/types"

const initialIngredientState = {
  ingredientData: null,
  isIngredientDetailsOpened: false
};

export const ingredientDataReducer = (state = initialIngredientState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_DATA_IN_MODAL: {
      return { ...state, ingredientData: action.ingredientData, isIngredientDetailsOpened: true };
    }
    case REMOVE_INGREDIENT_DATA_FROM_MODAL: {
      return { ...state, ingredientData: action.ingredientData, isIngredientDetailsOpened: false };
    }
    default: {
      return state;
    }
  }
};
