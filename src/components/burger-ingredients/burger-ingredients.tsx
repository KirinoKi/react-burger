import React, { useEffect, useState, memo, useMemo, forwardRef } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from '../../services/store';
import { useInView } from 'react-intersection-observer';
import { useDrag } from "react-dnd";
import { useLocation, Link } from "react-router-dom";
import { TIngredientWithUniqueId } from "../../utils/types";
import { FunctionComponent } from 'react';

interface ITabs {
  inViewBuns: boolean;
  inViewSaucess: boolean;
  inViewFilling: boolean;
};

const Tabs = memo(({ inViewBuns, inViewSaucess, inViewFilling }: ITabs) => {
  const [current, setCurrent] = useState<string>("Булки");

  useEffect(() => {
    if (inViewBuns) {
      setCurrent("Булки");
    } else if (inViewSaucess) {
      setCurrent("Соусы");
    } else if (inViewFilling) {
      setCurrent("Начинки");
    }
  }, [inViewBuns, inViewFilling, inViewSaucess]);

  const scrollToSection = (current: string, id: string) => {
    setCurrent(current);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className={burgerIngredientsStyles.tabs}>
      <Tab value="Булки" active={current === "Булки"} onClick={() => { scrollToSection("Булки", 'buns') }}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === "Соусы"} onClick={() => { scrollToSection("Соусы", 'sauces') }}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === "Начинки"} onClick={() => { scrollToSection("Начинки", 'main') }}>
        Начинки
      </Tab>
    </div>
  );
});

export function BurgerIngredients() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredientsList);

  const bunCategory = useMemo(() => {
    return ingredients.filter((data) => data.type === "bun")
  }, [ingredients]);

  const sausesCategory = useMemo(() => {
    return ingredients.filter((data) => data.type === "sauce")
  }, [ingredients]);

  const mainCategory = useMemo(() => {
    return ingredients.filter((data) => data.type === "main")
  }, [ingredients]);

  const [bunRef, inViewBuns] = useInView({ threshold: 1 });
  const [sauceRef, inViewSaucess] = useInView({ threshold: 0.8 });
  const [mainRef, inViewFilling] = useInView({ threshold: 0.3 });

  return (
    <>
      {!ingredientsRequest && !ingredientsFailed && ingredients &&
        <section className="pl-8">
          <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
          <Tabs inViewBuns={inViewBuns} inViewSaucess={inViewSaucess} inViewFilling={inViewFilling} />
          <section className={`mt-10 ${burgerIngredientsStyles.section}`}>
            <IngredientsCategory name="Булки" ref={bunRef} category={bunCategory} id="buns" />
            <IngredientsCategory name="Cоусы" ref={sauceRef} category={sausesCategory} id="sauces" />
            <IngredientsCategory name="Начинки" ref={mainRef} category={mainCategory} id="main" />
          </section>
        </section>
      }
    </>
  );
};

interface IIngredientsCategory {
  name: string;
  category: TIngredientWithUniqueId[],
  id: string;
};

type Ref = HTMLDivElement;

const IngredientsCategory = forwardRef<Ref, IIngredientsCategory>(({ name, category, id }, ref) => (
    <div ref={ref}>
      <h2 className="text text_type_main-medium" id={id} >
        {name}
      </h2>
      <ProductList category={category} />
    </div>
))

interface IProductList {
  category: TIngredientWithUniqueId[],
};

const ProductList: FunctionComponent<IProductList> = ({ category })=> {
  return (
    <section
      className={`pt-6 pl-4 pr-4 mb-10 ${burgerIngredientsStyles.items}`}
    >
      {category.map((card, index) => {
        return <Product key={index} card={card} />
      })}
    </section>
  );
}

interface IProduct {
  card: TIngredientWithUniqueId,
};

const Product: FunctionComponent<IProduct> = ({ card }) => {
  const id = card._id;

  const location = useLocation();

  const [count, setCount] = useState<number>(0);
  const { bun, ingredients } = useSelector(store => store.selectedIngredients);

  useEffect(() => {
    if (card.type === 'bun' && bun !== null && bun._id === card._id) {
      setCount(2);
    } else {
      const ingredientsWithEqualIds = ingredients.filter((item) => item._id === id);
      setCount(ingredientsWithEqualIds.length);
    }
  }, [ingredients, bun, card.type, id, card._id])

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { id }
  });

  return (
    <Link to={{ pathname: `/ingredients/${id}`, state: { background: location } }}
      ref={dragRef} className={burgerIngredientsStyles.card}
      key={card._id}>
      {count > 0 &&
        <Counter
          count={count}
          size="default"
        />}
      <img
        className={`ml-4 mr-4 ${burgerIngredientsStyles.image}`}
        src={card.image}
        alt={card.name}
      />
      <div className={burgerIngredientsStyles.price}>
        <p className="text text_type_digits-default mt-1 mb-1">
          {card.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <div className={burgerIngredientsStyles.name}>
        <p className="text text_type_main-default">{card.name}</p>
      </div>
    </Link>
  );
};
