import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST } from "./types";
import { getIngredientsFromServer } from "../../utils/api";

function getIngredientsFromServerSuccess(res) {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: res.data
  }
}

function showErrorWhenGetIngredietsFailed(err) {
  return {
    type: GET_INGREDIENTS_FAILED,
    payload: `Произошла Ошибка получения данных об ингредиентах: ${err.message}`
  }
}

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsFromServer()
      .then(res => {
        if (res && res.success) {
          dispatch(getIngredientsFromServerSuccess(res));
        } else {
          dispatch(showErrorWhenGetIngredietsFailed());
        }
      })
      .catch(err => {
        dispatch(showErrorWhenGetIngredietsFailed(err));
      })
  };
}
