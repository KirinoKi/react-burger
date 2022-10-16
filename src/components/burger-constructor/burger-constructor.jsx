import React, { useState, useEffect } from "react";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElements from "../constructor-elements/constructor-elements";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getOrderNumber } from "../../services/actions/api-data";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ORDER_NUMBER } from "../../services/actions/modal";
import { useDrop } from "react-dnd";
import {
  SET_CONSTRUCTOR_ELEMENT,
  FILTER_BUNS,
  SET_TOTAL_PRICE,
  RESET_TOTAL_PRICE,
  SET_BUNS,
  SET_ORDER_INGREDIENTS,
} from "../../services/actions/drop-container";
import { Reorder } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';

const BurgerConstructor = React.memo(() => {
  const dispatch = useDispatch();
  const { buns, totalPrice } = useSelector(
    (state) => state.dropContainerReducer
  );

  const [, dropTarget] = useDrop({
    accept: "items",
    drop: (item) => {
      item.type === "bun" && dispatch({ type: SET_BUNS, payload: {
        ...item,
        uuid: uuidv4()
    } });
      buns.length &&
        item.type !== "bun" &&
        dispatch({ type: SET_CONSTRUCTOR_ELEMENT, payload: {
          ...item,
          uuid: uuidv4()
      } });
    },
  });

  const constructorElements = useSelector(
    (state) => state.dropContainerReducer.constructorElements
  );

  const [items, setItems] = useState(constructorElements); // данный стейт используется для пропсов коипонентов библиотеки, которую я использую для перетаскивания ингредиентов внутри конструктора

  useEffect(() => {
    dispatch({ type: FILTER_BUNS });
    buns.length || constructorElements.length
      ? dispatch({
          type: SET_TOTAL_PRICE,
          payload: constructorElements,
        })
      : dispatch({
          type: RESET_TOTAL_PRICE,
          payload: constructorElements,
        });

    setItems(constructorElements);
    dispatch({ type: SET_ORDER_INGREDIENTS });
  }, [dispatch, constructorElements, buns]);

  const [isVisible, setVisability] = useState(false);

  const postResult = (ingredients) => {
    dispatch(getOrderNumber(ingredients));
  };

  const orderIngredients = useSelector(
    (state) => state.dropContainerReducer.orderIngredients
  );

  const setModal = () => {
    postResult(orderIngredients);
    handleOpenModal();
  };

  function handleOpenModal() {
    setVisability(true);
  }

  function handleCloseModal() {
    setVisability(false);
    dispatch({ type: RESET_ORDER_NUMBER });
  }

  const modalOrderDetails = (
    <Modal onClose={handleCloseModal} isOpened={isVisible}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section className={BurgerConstructorStyles.main}>
      <div className={BurgerConstructorStyles.drag} ref={dropTarget}>
        {buns.length ? (
          <>
            <ConstructorElements
              type="top"
              ingredient={buns[0]}
              isLocked={true}
            />
            <Reorder.Group
              className={BurgerConstructorStyles.reorder}
              axis="y"
              onReorder={setItems}
              values={items}
            >
              <div className={BurgerConstructorStyles.scrollable}>
                {items.map((stuff) => {
                  return (
                    <ConstructorElements
                      ingredient={stuff}
                      key={ stuff.uuid }
                      type="stuffing"
                      isLocked={false}
                    />
                  );
                })}
              </div>
            </Reorder.Group>
            <ConstructorElements
              type="bottom"
              ingredient={buns[0]}
              isLocked={true}
            />
          </>
        ) : (
          <>
            <div className={BurgerConstructorStyles.topBun}></div>
            <div className={BurgerConstructorStyles.stuff}>
              <p
                className={`${BurgerConstructorStyles.choose} text text_type_main-large`}
              >
                Пожалуйста, выберите булочки
              </p>
            </div>
            <div className={BurgerConstructorStyles.bottomBun}></div>
          </>
        )}
      </div>
      <div className={BurgerConstructorStyles.order}>
        <div className={BurgerConstructorStyles.price}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon />
        </div>
        <Button onClick={setModal} type="primary" size="large">
          Оформить заказ
        </Button>
        {isVisible && modalOrderDetails}
      </div>
    </section>
  );
});

export default BurgerConstructor;
