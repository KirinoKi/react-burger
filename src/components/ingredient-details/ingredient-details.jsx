import ingredientDetailsStyles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { Preloader } from "../preloader/preloader";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";

export function IngredientDetails() {
  let { id } = useParams();
  const ingredientsData = useSelector(store => store.ingredientsList.ingredients);
  let ingredientData = ingredientsData.find((el) => el._id === id);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!ingredientData) {
      dispatch(getIngredients());
      history.replace(`/ingredients/${id}`);
    }
  }, [dispatch, ingredientData])


  if (!ingredientData) {
    return (<Preloader />)
  }

  return (
    <section className={ingredientDetailsStyles.container}>
      <div className={`pl-5 pr-5 ${ingredientDetailsStyles.photo}`}>
        <img src={ingredientData.image_large} alt={ingredientData.name} />
      </div>
      <h3
        className={`text text_type_main-medium pb-8 mt-4 ${ingredientDetailsStyles.name}`}
      >
        {ingredientData.name}
      </h3>
      <ul className={`mb-15 ${ingredientDetailsStyles.contains}`}>
        <Ingredient ingredientInfo={ingredientData.calories} text="Калории,ккал" />
        <Ingredient ingredientInfo={ingredientData.proteins} text="Белки, г" />
        <Ingredient ingredientInfo={ingredientData.fat} text="Жиры, г" />
        <Ingredient ingredientInfo={ingredientData.carbohydrates} text="Углеводы, г" />
      </ul>
    </section>
  );
}

function Ingredient({ ingredientInfo, text }) {
  return (
    <li>
      <p className="text text_type_main-default text_color_inactive pb-2">
        {text}
      </p>
      <p className="text text_type_digits-default text_color_inactive">
        {ingredientInfo}
      </p>
    </li>
  )
}

Ingredient.propTypes = {
  ingredientInfo: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
}
