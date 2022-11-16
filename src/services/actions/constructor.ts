import { nanoid } from 'nanoid';
import { ADD_BUN, DELETE_INGREDIENT, REORDER_INGREDIENTS_IN_CONSTRUCTOR, RESET_CONSTRUCTOR, ADD_INGREDIENT, GET_SELECTED_INGREDIENTS } from "./types";
import { TIngredientWithUniqueId } from '../../utils/types';

export type TConstructorActions =
IAddToConstructorIngredientAction
| IAddToConstructorBunAction
| IDeleteIngredientFromConstructorAction
| IReorderIngredientsInConstructorAction
| IGetSelectedIngredientsAction
| IResetConstructorAction;

export interface IGetSelectedIngredientsAction {
  readonly type: typeof GET_SELECTED_INGREDIENTS;
};

export interface IAddToConstructorIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TIngredientWithUniqueId;
};

export interface IAddToConstructorBunAction {
  readonly type: typeof ADD_BUN;
  readonly payload: TIngredientWithUniqueId;
};

export interface IDeleteIngredientFromConstructorAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: TIngredientWithUniqueId;
};

export interface IReorderIngredientsInConstructorAction {
  readonly type: typeof REORDER_INGREDIENTS_IN_CONSTRUCTOR;
  readonly payload: TIngredientWithUniqueId[];
};

export interface IResetConstructorAction {
  readonly type: typeof RESET_CONSTRUCTOR;
};

export const addToConstructorIngredient = (ingredient: TIngredientWithUniqueId): IAddToConstructorIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ...ingredient,
      id: nanoid()
    }
  }
}

export const addToConstructorBun = (ingredient: TIngredientWithUniqueId): IAddToConstructorBunAction => {
  return {
    type: ADD_BUN,
    payload: ingredient
  }
}

export const deleteIngredientFromConstructor = (ingredient: TIngredientWithUniqueId): IDeleteIngredientFromConstructorAction => {
  return {
    type: DELETE_INGREDIENT,
    payload: {
      ...ingredient
    }
  }
}

export const reorderIngredientsInConstructor = (ingredientsArray: TIngredientWithUniqueId[]): IReorderIngredientsInConstructorAction => {
  return {
    type: REORDER_INGREDIENTS_IN_CONSTRUCTOR,
    payload: ingredientsArray
  }
}

export const resetConstructor = (): IResetConstructorAction => {
  return {
    type: RESET_CONSTRUCTOR
  }
}
