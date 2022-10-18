import feedStyles from './feed.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Order } from '../../components/order/order';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/types';
import { Preloader } from '../../components/preloader/preloader';

export function FeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
    }
  }, [dispatch]);

  return (
    <section className={feedStyles.page}>
      <article className={`pl-2 pr-2 ${feedStyles.feed_section}`}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={`mt-5 ${feedStyles.section}`}>
          <Orders />
        </div>
      </article>
      <OrdersStatusSection />
    </section>
  );
}

export function Orders() {
  const location = useLocation();
  const orders = useSelector(store => store.ws.orders);

  if (!orders) {
    return <Preloader />
  }

  return (
    <>
      {orders.map((order) => {
        return (
          <Link to={{ pathname: `/feed/${order._id}`, state: { background: location } }} className={feedStyles.link} key={order._id}>
            <Order
              status=''
              orderNumber={order.number}
              orderCreateTime={order.createdAt}
              burgerName={order.name}
              ingredients={order.ingredients}
            />
          </Link>
        )
      })}
    </>
  );
}

function OrdersStatusSection() {
  const { total, totalToday, orders } = useSelector(store => store.ws);

  const ordersDoneArr = orders.filter((order) => {
    return order.status === 'done'
  })

  const ordersInProcessArr = orders.filter((order) => {
    return order.status !== 'done'
  })

  const firstThirtyItems = (arr) => {
    if (arr.length > 10) {
      return arr.slice(0, 10);
    } else {
      if (arr.length <= 10) {
        return arr;
      }
    }
  }

  return (
    <section className={feedStyles.status_container}>
      <article className={feedStyles.board}>
        <div className={feedStyles.status_lists}>
          <h3 className="text text_type_main-medium pb-6">Готовы:</h3>
          <ul className={feedStyles.done_list}>
            {firstThirtyItems(ordersDoneArr).map((order) =>
              <li className="text text_type_digits-default" key={order._id}>{order.number}</li>
            )}
          </ul>
        </div>
        <div className={feedStyles.status_lists}>
          <h3 className="text text_type_main-medium pb-6">В работе:</h3>
          <ul className={feedStyles.inprocess_list}>
            {firstThirtyItems(ordersInProcessArr).map((order) =>
              <li className="text text_type_digits-default" key={order._id}>{order.number}</li>
            )}
          </ul>
        </div>
      </article>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className={`text text_type_digits-large ${feedStyles.done_qty}`}>{total}</p>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className={`text text_type_digits-large ${feedStyles.done_qty}`}>{totalToday}</p>
      </div>
    </section>
  )
}



