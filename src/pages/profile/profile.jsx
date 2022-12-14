import styles from "./profile.module.css"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect, useCallback } from "react";
import { NavLink } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { OrdersPage } from "./orders-history/orders-history";
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUser, updateUser } from "../../services/actions/auth";
import { NotFound } from "../not-found/not-found";
import { useRouteMatch } from "react-router-dom";
import { WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_CLOSE } from "../../services/actions/types";
import { OrderInformation } from "../../components/order-info/order-info";
import { useLocation } from "react-router-dom";

export function ProfilePage() {
  const user = useSelector(store => store.auth.user);

  const [name, setName] = useState(user.name);
  const [login, setLogin] = useState(user.email);
  const [password, setPassword] = useState('');

  const [disabledName, setDisabledName] = useState(true);
  const [disabledLogin, setDisabledLogin] = useState(true);
  const [disabledPassword, setDisabledPassword] = useState(true);

  const [showButtons, setShowButtons] = useState(false);

  const inutRefName = useRef(null);
  const inutRefLogin = useRef(null);
  const inutRefPassword = useRef(null);

  const inputNameOnEditIconClick = () => {
    setTimeout(() => inutRefName.current.focus(), 0);
    setDisabledName(false);
    setShowButtons(true);
  }

  const inputNameOnBlur = () => {
    setDisabledName(true);
  }

  const inputLoginOnEditIconClick = () => {
    setTimeout(() => inutRefLogin.current.focus(), 0);
    setDisabledLogin(false);
    setShowButtons(true);
  }

  const inputLoginOnBlur = () => {
    setDisabledLogin(true);
  }

  const inputPasswordOnEditIconClick = () => {
    setTimeout(() => inutRefPassword.current.focus(), 0);
    setDisabledPassword(false);
    setShowButtons(true);
  }

  const inputPasswordOnBlur = () => {
    setDisabledPassword(true);
  }

  const dispatch = useDispatch();

  const logoutSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logout());
    },
    [dispatch]
  );

  const saveNewUserData = (e) => {
    e.preventDefault();
    dispatch(updateUser(name, login, password));
    setShowButtons(false);
  }

  const resetUpdateUserData = (e) => {
    e.preventDefault();
    setName(user.name);
    setLogin(user.email);
    setPassword(password);
    setShowButtons(false);
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

  const location = useLocation();
  const background = location.state?.background;

  return (
    <div className={styles.wrapper}>
      {!isMatchOrderDetails &&
        <nav>
          <ul className={`mb-20 ${styles.list}`}>
            <NavLink exact to="/profile" className={`text text_type_main-medium ${styles.link}`} activeClassName={styles.activeLink}>
              ??????????????
            </NavLink>
            <NavLink exact to="/profile/orders" className={`text text_type_main-medium ${styles.link}`} activeClassName={styles.activeLink}>
              ?????????????? ??????????????
            </NavLink>
            <button className={`text text_type_main-medium ${styles.button}`} onClick={logoutSubmit} type="secondary" size="large">
              ??????????
            </button>
          </ul>
          {isMathPersonalInfo && (
            <p className={`text text_type_main-default text_color_inactive ${styles.additional_text}`}>
              ?? ???????? ?????????????? ???? ???????????? ????????????????&nbsp;???????? ???????????????????????? ????????????
            </p>
          )}
          {isMatchOrderHistory && (
            <p className={`text text_type_main-default text_color_inactive ${styles.additional_text}`}>
              ?? ???????? ?????????????? ???? ???????????? ?????????????????????? ???????? ?????????????? ??????????????
            </p>
          )}
        </nav>}
      <Switch location={background || location}>
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
              placeholder={'??????'}
              onChange={e => setName(e.target.value)}
              value={name}
              icon={'EditIcon'}
              name={'name'}
              error={false}
              ref={inutRefName}
              onIconClick={inputNameOnEditIconClick}
              errorText={'???????????? ?????????? ??????????'}
              size={'default'}
              disabled={disabledName}
              onBlur={inputNameOnBlur}
            />
            <Input
              type={'email'}
              placeholder={'??????????'}
              onChange={e => setLogin(e.target.value)}
              value={login}
              icon={'EditIcon'}
              name={'login'}
              error={false}
              ref={inutRefLogin}
              onIconClick={inputLoginOnEditIconClick}
              errorText={'???????????? ?????????? ????????????'}
              size={'default'}
              disabled={disabledLogin}
              onBlur={inputLoginOnBlur}
            />
            <Input
              type={'password'}
              placeholder={'????????????'}
              onChange={e => setPassword(e.target.value)}
              value={password}
              icon={'EditIcon'}
              name={'password'}
              error={false}
              ref={inutRefPassword}
              onIconClick={inputPasswordOnEditIconClick}
              errorText={'???????????? ?????????? ????????????'}
              size={'default'}
              disabled={disabledPassword}
              onBlur={inputPasswordOnBlur}
            />
            {showButtons &&
              <div className={styles.buttons}>
                <Button type="secondary" size="medium" onClick={resetUpdateUserData}>
                  ????????????
                </Button>
                <Button type="primary" size="medium">
                  C????????????????
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

