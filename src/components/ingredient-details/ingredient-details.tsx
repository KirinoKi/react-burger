import ingredientDetailsStyles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from '../../services/store';
import { useHistory, useParams } from "react-router-dom";
import { Preloader } from "../preloader/preloader";
import { useEffect } from "react";

interface ParamTypes {
  id: string;
};

export function IngredientDetails() {
  let { id } = useParams<ParamTypes>();
  const ingredientsData = useSelector(store => store.ingredientsList.ingredients);
  let ingredientData = ingredientsData.find((el) => el._id === id);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!ingredientData) {
      history.replace(`/ingredients/${id}`);
    }
  }, [dispatch, ingredientData, history, id])


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

interface IIngredient{
  ingredientInfo: string | number;
  text: string;
};

const Ingredient = ({ ingredientInfo, text }: IIngredient) => {
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
};
