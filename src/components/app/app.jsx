import React from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import {api} from '../../utils/constants'

function App() {
  const [apiData, setApiData] = React.useState([]);
  const [orderVisible, setOrderVisible] = React.useState(false);
  const [ingredientVisible, setIngredientVisible] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});

  React.useEffect(() => {
    fetch(api)
        .then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => setApiData(data.data))
        .catch(e => {
          console.log('Error: ' + e.message);
        });
  }, []);

  const closeModal = () => {
    setOrderVisible(false);
    setIngredientVisible(false);
  };

  const openOrderModal = () => {
    setOrderVisible(true);
  };

  const openIngredientModal = (item) => {
    setCurrentIngredient({...item});
    setIngredientVisible(true);
  }

  return (
    <div className="app">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={apiData} openModal={openIngredientModal}/>
        <BurgerConstructor ingredients={apiData} openModal={openOrderModal}/>
        { orderVisible && 
          <Modal 
            header= { '' }
            onClose={ closeModal }
          >
            <OrderDetails />
            </Modal>
        }
        { ingredientVisible && 
          <Modal 
            header="Детали ингредиента"
            onClose={ closeModal }
          >
            <IngredientDetails currentIngredient={currentIngredient}/>
          </Modal>
        }
      </main>
    </div>
  );
}

export default App;