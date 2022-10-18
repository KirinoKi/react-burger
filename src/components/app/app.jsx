import { Switch, Route, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from "../modal/modal";
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { removeIngredienFromModal } from '../../services/actions/ingredient';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Preloader } from '../preloader/preloader';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { NotFound } from '../../pages/not-found/not-found';
import { ProfilePage } from '../../pages/profile/profile';
import { ProtectedRoute } from '../protected-route';
import { getUser } from '../../services/actions/auth';
import { refreshToken } from '../../services/actions/auth';
import { getCookie } from '../../utils/utils';
import { useLocation } from "react-router-dom";
import { getIngredients } from "../../services/actions/ingredients";

export function App() {
  const { isIngredientDetailsOpened } = useSelector(store => store.ingredientData);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);
  const { ingredientsRequest } = useSelector(store => store.ingredientsList);

  const history = useHistory();
  const dispatch = useDispatch();

  const closeAllModals = () => {
    dispatch(removeIngredienFromModal())
    setOrderDetailsOpened(false);
    history.replace('/');
  };

  const openOrderDetailsModal = () => {
    if (!user) {
      history.replace('/login')
    } if (user) {
      setOrderDetailsOpened(true);
    }
  }

  const cookie = getCookie('token')
  const user = useSelector(store => store.auth.user);
  const refreshTokenData = localStorage.getItem('token');
  const updateTokenSuccess = useSelector(store => store.auth.updateTokenSuccess);

  useEffect(() => {
    if (!user && refreshTokenData && cookie) {
      dispatch(getUser());
    }
    if (!cookie && refreshTokenData) {
      dispatch(refreshToken());
    }
    if (cookie && updateTokenSuccess && refreshTokenData && !user) {
      dispatch(getUser());
    }
    dispatch(getIngredients())
  }, [dispatch, refreshTokenData, user, cookie, updateTokenSuccess]);

  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      {ingredientsRequest && <Preloader />}
      <AppHeader />
      <Switch location={background || location}>
        <Route exact path="/">
          <main className={appStyles.main}>
            <section className={appStyles.container}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                {!ingredientsRequest && <BurgerConstructor onClick={openOrderDetailsModal} />}
              </DndProvider>
            </section>
          </main>
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route exact path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id">
          <h2 className={`mt-30 pb-3 text text_type_main-large ${appStyles.title}`}>Детали ингредиента</h2>
          <IngredientDetails />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {background && (
        <Route path="/ingredients/:id">
          <Modal
            title="Детали ингредиента"
            onClose={closeAllModals}
          >
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {
        isOrderDetailsOpened &&
        <Modal
          title=""
          onClose={closeAllModals}
        >
          <OrderDetails />
        </Modal>
      }
    </>
  )
}


