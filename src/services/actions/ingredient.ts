import { ADD_INGREDIENT_DATA_IN_MODAL, REMOVE_INGREDIENT_DATA_FROM_MODAL } from "./types";
import { TIngredient } from "../../utils/types";

export type TIngredientInModalActions =
  IAddIngredientDataInModalAction
  | IRemoveIngredientDataFromModalAction;


export interface IAddIngredientDataInModalAction {
  readonly type: typeof ADD_INGREDIENT_DATA_IN_MODAL;
  readonly ingredientData: TIngredient;
}

export interface IRemoveIngredientDataFromModalAction {
  readonly type: typeof REMOVE_INGREDIENT_DATA_FROM_MODAL;
  readonly ingredientData: null;
}

export const addIngredientInModal = (ingredientData: TIngredient): IAddIngredientDataInModalAction => ({
  type: ADD_INGREDIENT_DATA_IN_MODAL,
  ingredientData
});

export const removeIngredienFromModal = (ingredientData: null): IRemoveIngredientDataFromModalAction => ({
  type: REMOVE_INGREDIENT_DATA_FROM_MODAL,
  ingredientData
});
