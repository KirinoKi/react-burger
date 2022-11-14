import styles from "./profile.module.css"
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect, useCallback } from "react";
import { NavLink } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { OrdersPage } from "./orders-history/orders-history";
import { useDispatch, useSelector } from '../../services/store';
import { logout, getUser, updateUser } from "../../services/actions/auth";
import { NotFound } from "../not-found/not-found";
import { useRouteMatch } from "react-router-dom";
import { WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_CLOSE } from "../../services/actions/types";
import { OrderInformation } from "../../components/order-info/order-info";
import { FunctionComponent } from "react";
import { Button } from "../../utils/utils";

export const ProfilePage: FunctionComponent = () => {
  const user = useSelector(store => store.auth.user);
  const userName = useSelector(store => store.auth.name);
  const userEmail = useSelector(store => store.auth.email);

  const [name, setName] = useState<string>(userName);
  const [login, setLogin] = useState<string>(userEmail);
  const [password, setPassword] = useState<string>('');

  const [disabledName, setDisabledName] = useState<boolean>(true);
  const [disabledLogin, setDisabledLogin] = useState<boolean>(true);
  const [disabledPassword, setDisabledPassword] = useState<boolean>(true);

  const [showButtons, setShowButtons] = useState<boolean>(false);

  const inutRefName = useRef<HTMLInputElement>(null);
  const inutRefLogin = useRef<HTMLInputElement>(null);
  const inutRefPassword = useRef<HTMLInputElement>(null);

  const inputNameOnEditIconClick = () => {
    setTimeout(() => {
      if (inutRefName.current) {
        inutRefName.current.focus()
      }
    }, 0);
    setDisabledName(false);
    setShowButtons(true);
  }

  const inputNameOnBlur = () => {
    setDisabledName(true);
  }

  const inputLoginOnEditIconClick = () => {
    setTimeout(() => {
      if (inutRefLogin.current) {
        inutRefLogin.current.focus()
      }
    }, 0);
    setDisabledLogin(false);
    setShowButtons(true);
  }

  const inputLoginOnBlur = () => {
    setDisabledLogin(true);
  }

  const inputPasswordOnEditIconClick = () => {
    setTimeout(() => {
      if (inutRefPassword.current) {
        inutRefPassword.current.focus()
      }
    }, 0);
    setDisabledPassword(false);
    setShowButtons(true);
  }

  const inputPasswordOnBlur = () => {
    setDisabledPassword(true);
  }

  const dispatch = useDispatch();

  const logoutSubmit = useCallback(
    (e: React.ChangeEvent<any>) => {
      e.preventDefault();
      dispatch(logout());
    },
    [dispatch]
  );

  const saveNewUserData = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(updateUser(name, login, password));
    setShowButtons(false);
  }

  const resetUpdateUserData = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (user !== null) {
      setName(user.name);
      setLogin(user.email);
      setPassword(password);
      setShowButtons(false);
    }
  }

  useEffect(() => {
    dispatch(getUser());
    dispatch({ type: WS_AUTH_CONNECTION_START });
    return () => {
      dispatch({ type: WS_AUTH_CONNECTION_CLOSE })
    }
  }, [dispatch]);

  const isMathPersonalInfo = !!useRouteMatch({ path: '/profile', exact: true });
  const isMatchOrderHistory = !!useRouteMatch({ path: '/profile/orders', exact: true });
  const isMatchOrderDetails = !!useRouteMatch({ path: '/profile/orders/:id' });

  return (
    <div className={styles.wrapper}>
      {!isMatchOrderDetails &&
        <nav>
          <ul className={`mb-20 ${styles.list}`}>
            <NavLink exact to="/profile" className={`text text_type_main-medium ${styles.link}`} activeClassName={styles.activeLink}>
              Профиль
            </NavLink>
            <NavLink exact to="/profile/orders" className={`text text_type_main-medium ${styles.link}`} activeClassName={styles.activeLink}>
              История заказов
            </NavLink>
            <button className={`text text_type_main-medium ${styles.button}`} onClick={logoutSubmit}>
              Выход
            </button>
          </ul>
          {isMathPersonalInfo && (
            <p className={`text text_type_main-default text_color_inactive ${styles.additional_text}`}>
              В этом разделе вы можете изменить&nbsp;свои персональные данные
            </p>
          )}
          {isMatchOrderHistory && (
            <p className={`text text_type_main-default text_color_inactive ${styles.additional_text}`}>
              В этом разделе вы можете просмотреть свою историю заказов
            </p>
          )}
        </nav>}
      <Switch>
        <Route exact path="/profile/orders">
          <OrdersPage />
        </Route>
        <Route path="/profile/orders/:id">
          <div className={styles.order_page}>
            <OrderInformation />
          </div>
        </Route>
        <Route exact path="/profile">
          <form className={styles.form} onSubmit={saveNewUserData}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={e => setName(e.target.value)}
              value={name}
              icon={'EditIcon'}
              name={'name'}
              error={false}
              ref={inutRefName}
              onIconClick={inputNameOnEditIconClick}
              errorText={'Ошибка ввода имени'}
              size={'default'}
              disabled={disabledName}
              onBlur={inputNameOnBlur}
            />
            <Input
              type={'email'}
              placeholder={'Логин'}
              onChange={e => setLogin(e.target.value)}
              value={login}
              icon={'EditIcon'}
              name={'login'}
              error={false}
              ref={inutRefLogin}
              onIconClick={inputLoginOnEditIconClick}
              errorText={'Ошибка ввода логина'}
              size={'default'}
              disabled={disabledLogin}
              onBlur={inputLoginOnBlur}
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              onChange={e => setPassword(e.target.value)}
              value={password}
              icon={'EditIcon'}
              name={'password'}
              error={false}
              ref={inutRefPassword}
              onIconClick={inputPasswordOnEditIconClick}
              errorText={'Ошибка ввода пароля'}
              size={'default'}
              disabled={disabledPassword}
              onBlur={inputPasswordOnBlur}
            />
            {showButtons &&
              <div className={styles.buttons}>
                <Button type="secondary" size="medium" onClick={resetUpdateUserData}>
                  Отмена
                </Button>
                <Button type="primary" size="medium">
                  Cохранить
                </Button>
              </div>}
          </form>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

