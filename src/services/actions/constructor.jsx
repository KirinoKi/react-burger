import { nanoid } from 'nanoid';
import { ADD_BUN, DELETE_INGREDIENT, REORDER_INGREDIENTS_IN_CONSTRUCTOR, RESET_CONSTRUCTOR, ADD_INGREDIENT } from "./types";

export function addToConstructorIngredient(ingredient) {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ...ingredient,
      id: nanoid()
    }
  }
}

export function addToConstructorBun(ingredient) {
  return {
    type: ADD_BUN,
    payload: ingredient
  }
}

export function deleteIngredientFromConstructor(ingredient) {
  return {
    type: DELETE_INGREDIENT,
    payload: {
      ...ingredient
    }
  }
}

export const reorderIngredientsInConstructor = (ingredientsArray) => {
  return {
    type: REORDER_INGREDIENTS_IN_CONSTRUCTOR,
    payload: ingredientsArray
  }
}

export const resetConstructor = () => {
  return {
    type: RESET_CONSTRUCTOR
  }
}
