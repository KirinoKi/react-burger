import orderInfoStyles from './order-info.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../../utils/utils';
import { useMemo, useEffect } from 'react';
import { Preloader } from '../preloader/preloader';
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED, WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_CLOSED } from '../../services/actions/types';
import { getUser } from '../../services/actions/auth';

export function OrderInformation() {
  let { id } = useParams();
  let match = useRouteMatch()
  const isProfile = '/profile/orders/:id';
  const isFeed = '/feed/:id';
  const user = useSelector(store => store.auth.user);
  const allOrders = useSelector(store => store.ws.orders);
  const userOrders = useSelector(store => store.wsAuth.orders);

  let orders = match.path === isProfile ? userOrders : allOrders;

  let orderData = orders.find((el) => el._id === id);
  const allIngredients = useSelector(store => store.ingredientsList.ingredients);
  const history = useHistory();
  const dispatch = useDispatch();

  const orderInfo = useMemo(() => {
    if (!orderData || 0) return null;

    const totalOrder = orderData.ingredients.reduce((previousValue, currentItem) => {

      const ingredient = allIngredients.find((item) => {
        return currentItem === item._id;
      });

      if (!ingredient) {
        return previousValue;
      }

      return previousValue + ingredient.price;

    }, 0);

    let count = {};

    for (let elem of orderData.ingredients) {
      if (count[elem] === undefined) {
        count[elem] = 1;
      } else {
        count[elem]++;
      }
    }

    orderData.count = count;

    return {
      ...orderData,
      totalOrder,
      count
    };
  }, [orderData, allIngredients]);

  useEffect(() => {
    if (!orderData) {
      if (match.path === isProfile) {
        dispatch(getUser());
        dispatch({ type: WS_AUTH_CONNECTION_START });
      }
      if (match.path === isFeed) {
        dispatch({ type: WS_CONNECTION_START });
      }
      history.replace(`${match.url}`);
    }

    return () => {
      if (match.path === isProfile) {
        dispatch({ type: WS_AUTH_CONNECTION_CLOSED });
      }
      if (match.path === isFeed) {
        dispatch({ type: WS_CONNECTION_CLOSED });
      }
    }
  }, [dispatch, orderData, history, orderInfo, match.path, match.url, user]);

  if (!orderInfo) {
    return (<Preloader />)
  }

  return (
    <>
      <p className={`text text_type_digits-default mb-10 ${orderInfoStyles.order_number}`}>#{orderInfo.number}</p>
      <h3 className="text text_type_main-medium mb-3">{orderInfo.name}</h3>
      {orderInfo.status === 'done' &&
        <p className={`text text_type_main-default mb-15 ${orderInfoStyles.done}`}>Выполнен</p>
      }
      {orderInfo.status === 'created' &&
        <p className="text text_type_main-default mb-15">Создан</p>
      }
      {orderInfo.status === 'pending' &&
        <p className="text text_type_main-default mb-15">Готовится</p>
      }
      <h3 className="text text_type_main-medium mb-6">Состав:</h3>
      <section className={orderInfoStyles.ingredients_section}>
        {orderInfo.count && [...new Set(orderInfo.ingredients)].map((ingredient, index) =>
          <IngredientInfo ingredient={ingredient} key={index} count={orderInfo.count} />
        )}
      </section>
      <div className={`mt-10 ${orderInfoStyles.technical_info}`}>
        <p className="text text_type_main-default text_color_inactive">{formatDate(orderInfo.createdAt)}</p>
        <div className={`ml-6 ${orderInfoStyles.price_container}`}>
          <p className="text text_type_digits-default mr-2">{orderInfo.totalOrder}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
}

function IngredientInfo({ ingredient, count }) {

  const allIngredients = useSelector(store => store.ingredientsList.ingredients);

  const currentIngredient = useMemo(() => {
    if (!ingredient || 0) return null;
    return allIngredients.find((item) => ingredient === item._id);
  }, [ingredient, allIngredients]);

  if (!ingredient) {
    return <Preloader />
  }

  return (
    <section className={orderInfoStyles.ingredient_info}>
      <div className={orderInfoStyles.info}>
        <div className={orderInfoStyles.border}>
          <div className={orderInfoStyles.item}>
            <img className={orderInfoStyles.img} src={currentIngredient.image} alt={currentIngredient.name} />
          </div>
        </div>
        <p className={`text text_type_main-default ml-4 mr-4 ${orderInfoStyles.text}`}>
          {currentIngredient.name}
        </p>
      </div>
      <div className={orderInfoStyles.qty_container}>
        <p className="text text_type_digits-default mr-2">{`${count[currentIngredient._id]} x ${currentIngredient.price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </section>
  )
}

IngredientInfo.propTypes = {
  ingredient: PropTypes.string.isRequired,
  count: PropTypes.object.isRequired
}









