import AppStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import useFetchIngredients from "../../services/hooks/useFetchIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loader from "../loader/loader";

function App() {
  const { hasError, isLoading, data } = useFetchIngredients();
  return hasError || isLoading || !data.length ? (
    <Loader />
  ) : (
    <div className={AppStyle.main}>
      <AppHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </div>
  );
}

export default App;
