import ordersStyles from './orders-history.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Order } from '../../../components/order/order';
import { useSelector } from 'react-redux';
import { Preloader } from '../../../components/preloader/preloader';

export function OrdersPage() {
  const location = useLocation();

  const orders = useSelector(store => store.wsAuth.orders);

  if (!orders) {
    return <Preloader />
  }

  return (
    <section className={ordersStyles.section}>
      {orders.map((order) => {
        return (
          <Link to={{ pathname: `/profile/orders/${order._id}`, state: { background: location } }} className={ordersStyles.link} key={order._id}>
            {order.status === 'done' &&
              <Order
                status='Выполнен'
                orderNumber={order.number}
                orderCreateTime={order.createdAt}
                burgerName={order.name}
                ingredients={order.ingredients}
              />
            }
            {order.status === 'created' &&
              <Order
                status='Создан'
                orderNumber={order.number}
                orderCreateTime={order.createdAt}
                burgerName={order.name}
                ingredients={order.ingredients}
              />
            }
            {order.status === 'pending' &&
              <Order
                status='Готовится'
                orderNumber={order.number}
                orderCreateTime={order.createdAt}
                burgerName={order.name}
                ingredients={order.ingredients}
              />
            }
          </Link>)
      })}
    </section>
  );
}
