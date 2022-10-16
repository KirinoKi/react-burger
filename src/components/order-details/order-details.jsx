import { useEffect, useMemo } from "react";
import orderDetailsStyles from "./order-details.module.css";
import doneImage from "../../images/done.svg";
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from "../../services/actions/order";

export function OrderDetails() {
  const { orderNumber } = useSelector(store => store.orderNumber);
  const selectedIngredients = useSelector(store => store.selectedIngredients);

  const dispatch = useDispatch();

  let ingredientsId = useMemo(() => {
    return selectedIngredients.ingredients.map(ingredient => ingredient._id)
  }, [selectedIngredients]);

  useEffect(() => {
    if (selectedIngredients.ingredients !== [] && selectedIngredients.bun !== null) {
      const bunId = selectedIngredients.bun._id;
      ingredientsId.push(bunId);
      ingredientsId.unshift(bunId)
      dispatch(sendOrder(ingredientsId));
    }
  }, [dispatch, selectedIngredients, ingredientsId])

  return (
    <>
      <h2
        className={`text_type_digits-large mt-15 mb-8 ${orderDetailsStyles.number}`}
      >
        {orderNumber}
      </h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={doneImage} alt="done" />
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

