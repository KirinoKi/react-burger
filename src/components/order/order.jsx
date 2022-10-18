import orderStyles from './order.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/utils';
import { useMemo } from 'react';

export function Order({ status, orderNumber, orderCreateTime, burgerName, ingredients }) {
  const ingredientsqty = ingredients.length;
  const hideIngredirntQty = ingredientsqty - 6;

  const allIngredients = useSelector(store => store.ingredientsList.ingredients);

  const ingredientsDataArray = useMemo(() => {
    return ingredients.map((ingredientInOrder) => {
      return allIngredients.find((item) => ingredientInOrder === item._id)
    })
  }, [ingredients, allIngredients])

  const ingredientData = useMemo(() => {
    return ingredientsDataArray.map((ingredient) => {
      return ingredient;
    })
  }, [ingredientsDataArray]);

  const totalOrder = ingredients.reduce((previousValue, currentItem) => {

    const ingredient = allIngredients.find((item) => {
      return currentItem === item._id;
    });

    if (!ingredient) {
      return previousValue;
    }

    return previousValue + ingredient.price;

  }, 0);

  return (
    <section className={`pt-6 pr-6 pl-6 pb-6 mb-6 ${orderStyles.order_container}`}>
      <div className={orderStyles.technical_info}>
        <p className="text text_type_digits-default">#{orderNumber}</p>
        <p className="text text_type_main-default text_color_inactive">{formatDate(orderCreateTime)}</p>
      </div>
      <div>
        <h3 className="text text_type_main-medium mb-2">{burgerName}</h3>
        {status !== 'Выполнен' ?
          <p className="text text_type_main-default">{status}</p> :
          <p className={`text text_type_main-default ${orderStyles.done}`}>{status}</p>}
      </div>
      <section className={orderStyles.order_info}>
        <ul className={orderStyles.items}>
          {allIngredients.length && ingredients.length && ingredientsqty <= 5 &&
            ingredientData.map((ing, index) => {
              return (
                <li className={orderStyles.list_item} key={index}>
                  {ing &&
                  <Ingredient ingredientimage={ing.image} ingredientName={ing.name} />}
                </li>
              )
            })
          }
          {allIngredients.length && ingredients.length && ingredientsqty >= 6 &&
            ingredientData.slice(0, 5).map((ing, index) => {
              return (
                <li className={orderStyles.list_item} key={index}>
                  <Ingredient ingredientimage={ing.image} ingredientName={ing.name} />
                </li>
              )
            })
          }
          {allIngredients.length && ingredients.length && ingredientsqty > 6 && (
            <li className={orderStyles.list_item}>
              <p className={`text text_type_main-default ${orderStyles.add_qty}`}>{`+${hideIngredirntQty}`}</p>
              <div className={orderStyles.back}>
                {ingredientData.slice(5, 6).map((ing, index) => {
                  return (
                    <Ingredient ingredientimage={ing.image} ingredientName={ing.name} key={index} />
                  )
                })
                }
              </div>
            </li >
          )}
        </ul>
        <div className={`ml-6 ${orderStyles.price_container}`}>
          <p className="text text_type_digits-default mr-2">
            {totalOrder}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </section>
    </section >
  );
}

function Ingredient({ ingredientimage, ingredientName }) {
  return (
    <div className={orderStyles.border}>
      <div className={orderStyles.item}>
        <img className={orderStyles.img} src={ingredientimage} alt={ingredientName} />
      </div>
    </div>
  );
}

Order.propTypes = {
  status: PropTypes.string.isRequired,
  orderNumber: PropTypes.number.isRequired,
  orderCreateTime: PropTypes.string.isRequired,
  burgerName: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
}

Ingredient.propTypes = {
  ingredientName: PropTypes.string.isRequired,
  ingredientimage: PropTypes.string.isRequired,
}















