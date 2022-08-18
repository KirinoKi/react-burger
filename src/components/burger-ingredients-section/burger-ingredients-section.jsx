import styles from './burger-ingredients-section.module.css';

import PropTypes from 'prop-types';
import ingredientsTypes from '../../utils/types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientsSection(props) {
  return (
    <>
      <h2 className={`${styles.sectionTitle} text_type_main-medium mt-2 mb-6`}>{props.title}</h2>
      <ul className={`${styles.cardContainer} pl-4 pr-2`}>
        {
          props.data.map((item) => (
            <li key={item._id} className={`${styles.card} mb-8`} onClick={() => props.openModal(item)}>
              <img src={item.image} alt={item.name}/>
              <span className={`${styles.price} mt-2 mb-1 text_type_digits-default`}>
                {item.price}
                <CurrencyIcon type="primary" />
              </span>
              <p className={`${styles.name} text_type_main-default`}>{item.name}</p>
            </li>
          ))
        }
      </ul>
    </>
  );
}

BurgerIngredientsSection.propTypes = { 
  data: PropTypes.arrayOf(ingredientsTypes).isRequired
};

export default BurgerIngredientsSection;