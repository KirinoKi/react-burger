import { ADD_INGREDIENT_DATA_IN_MODAL, REMOVE_INGREDIENT_DATA_FROM_MODAL } from "../actions/types";
import { TIngredient } from "../../utils/types";
import { TIngredientInModalActions } from "../actions/ingredient"

type TIngredientState = {
  readonly ingredientData: TIngredient | string | null;
  isIngredientDetailsOpened: boolean;
}

const initialIngredientState: TIngredientState = {
  ingredientData: null,
  isIngredientDetailsOpened: false
};

export const ingredientDataReducer = (state = initialIngredientState, action: TIngredientInModalActions): TIngredientState => {
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
