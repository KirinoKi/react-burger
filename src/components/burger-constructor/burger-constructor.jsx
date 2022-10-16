import { useMemo, useRef } from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
<<<<<<< Updated upstream
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
=======
import { type } from "../../utils/types";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import { addToConstructorBun, addToConstructorIngredient, deleteIngredientFromConstructor, reorderIngredientsInConstructor } from "../../services/actions/constructor";


export function BurgerConstructor({ onClick }) {
  const { bun, ingredients } = useSelector(store => store.selectedIngredients);
  const allIngredients = useSelector(store => store.ingredientsList.ingredients);
>>>>>>> Stashed changes
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
<<<<<<< Updated upstream
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
=======
    accept: 'ingredient',
    drop(item) {
      const draggedCard = allIngredients.find((el) => el._id === item.id);
      if (draggedCard.type !== "bun") {
        dispatch(addToConstructorIngredient(draggedCard));
      } else {
        dispatch(addToConstructorBun(draggedCard));
      }
    }
  })

  return (
    <section className="mt-25 ml-4 mr-8" ref={dropTarget}>
      {bun === null && ingredients.length === 0 ? (<div className={`mb-8 ${burgerConstructorStyles.containerForText}`}>
        <p className={`text text_type_main-medium pt-8 pb-8 pl-8 pr-8 ${burgerConstructorStyles.empty}`}>Перетащите ингредиенты слева сюда</p>
      </div>) :
        (<div className="mb-10">
          {bun && <TopProduct />}
          {ingredients && <section className={`mt-4 mb-4 ${burgerConstructorStyles.section}`}>
            <ProductList />
          </section>}
          {bun && <BottomProduct />}
        </div>)}
      <MakeAnOrder onClick={onClick} />
    </section>
  );
}

function TopProduct() {
  const { bun } = useSelector(store => store.selectedIngredients);
  return (
    <article className={`mr-4 ${burgerConstructorStyles.bun}`}>
      <div className={burgerConstructorStyles.constructor} key={bun._id}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    </article>)
}

function BottomProduct() {
  const { bun } = useSelector(store => store.selectedIngredients);
  return (
    <article className={`mr-4 ${burgerConstructorStyles.bun}`}>
      <div className={burgerConstructorStyles.constructor} key={bun._id}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    </article>
  );
}

function ProductList() {
  const { ingredients } = useSelector(store => store.selectedIngredients);
  return (
    <section>
      {ingredients.map((card, index) => (
        <ProductCard card={card} key={card.id} index={index} />
      ))}
    </section>
>>>>>>> Stashed changes
  );
}

function ProductCard({ card, index }) {
  const { ingredients } = useSelector(store => store.selectedIngredients);
  const id = card.id;
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "ingredient-item",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  }));

  const [{ isOver, canDrop }, dropTarget] = useDrop({
    accept: 'ingredient-item',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),

    drop(item) {
      const dragIndex = ingredients.findIndex((elem) => elem.id === item.id);
      const hoverIndex = index;

      const newIngredients = [...ingredients];

      let hoverIngredient = newIngredients[hoverIndex];

      newIngredients[hoverIndex] = newIngredients[dragIndex];
      newIngredients[dragIndex] = hoverIngredient;

      dispatch(reorderIngredientsInConstructor(newIngredients))
    }
  })

  const dragAndDropItem = dragRef(dropTarget(ref));

  const isActive = canDrop && isOver
  let boxShadow = 'none';
  let borderRadius = 'none';
  if (isActive) {
    boxShadow = '0px 4px 8px #4C4CFF';
    borderRadius = '40px';
  } else if (canDrop) {
    boxShadow = 'none'
  }

  return (
    <section className={`mb-4 mr-2 ${burgerConstructorStyles.ingredients}`} ref={dragAndDropItem}>
      <DragIcon />
      <div className={burgerConstructorStyles.inner} style={{ boxShadow, borderRadius }}>
        <ConstructorElement
          text={card.name}
          price={card.price}
          thumbnail={card.image}
          handleClose={() => dispatch(deleteIngredientFromConstructor(card))}
        />
      </div>
    </section>
  )
}

function MakeAnOrder({ onClick }) {
  const constructorItems = useSelector(store => store.selectedIngredients);

  const price = useMemo(() => {
    return (
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((s, v) => s + v.price, 0)
    );
  }, [constructorItems]);

  return (
<<<<<<< Updated upstream
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
=======
    <section className={`mr-4 ${burgerConstructorStyles.order}`}>
      <div className={burgerConstructorStyles.sum}>
        <p className="text text_type_digits-medium mr-2">{price}</p>
        <CurrencyIcon type="primary" />
>>>>>>> Stashed changes
      </div>
      {!constructorItems.bun ? (
        <Button type="primary" size="large" onClick={onClick} disabled>
          Оформить заказ
        </Button>
      ) : (<Button type="primary" size="large" onClick={onClick}>
        Оформить заказ
      </Button>)}

    </section>
  );
}

BurgerConstructor.propTypes = {
  onClick: PropTypes.func
};

MakeAnOrder.propTypes = {
  onClick: PropTypes.func
};

ProductCard.propTypes = {
  card: type,
  index: PropTypes.number
}
