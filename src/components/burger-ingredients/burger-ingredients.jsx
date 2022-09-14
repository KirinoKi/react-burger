import React from 'react';
import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import ingredientsTypes from '../../utils/types';

import BurgerIngredientsSection from '../burger-ingredients-section/burger-ingredients-section'


function BurgerIngredients(props) {
  const tabs = [
    {
      name: 'bun',
      title: 'Булки',
    },
    {
      name: 'sauce',
      title: 'Соусы',
    },
    {
      name: 'main',
      title: 'Начинки',
    },
  ]
  
  const [current, setCurrent] = React.useState(tabs[0].name);

  return (
    <section className={`${styles.root} mr-10`}>
      <h1 className={`${styles.title} text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
      <div className={`${styles.tabs} mb-8`}>
        {
          tabs.map((item) => (
            <Tab 
              value={item.name} 
              active={current === item.name} 
              onClick={setCurrent} 
              key={item.name}
            >
              {item.title}
            </Tab>)
          )
        }
      </div>
      <div className={styles.ingredients}>
        { 
          tabs.map( item => (
              <BurgerIngredientsSection 
                type={item.name} 
                key={item.name} 
                title={item.title}
                data={props.ingredients.filter((el) => el.type === item.name )}
                openModal={props.openModal}
              />
            )
          )
        }
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = { 
  ingredients: PropTypes.arrayOf(ingredientsTypes).isRequired
};

export default BurgerIngredients;