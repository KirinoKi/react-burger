import { ADD_INGREDIENT_DATA_IN_MODAL, REMOVE_INGREDIENT_DATA_FROM_MODAL } from "./types";

export function addIngredientInModal(ingredietData) {
  return {
    type: ADD_INGREDIENT_DATA_IN_MODAL,
    ingredientData: ingredietData
  }
}

export function removeIngredienFromModal() {
  return {
    type: REMOVE_INGREDIENT_DATA_FROM_MODAL,
    ingredientData: ''
  }
}
