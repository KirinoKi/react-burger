import styles from "./profile.module.css"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect, useCallback } from "react";
import { NavLink } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { OrdersPage } from "./orders/orders";
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUser, updateUser } from "../../services/actions/auth";

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
  }, [dispatch])

  return (
    <div className={styles.wrapper}>
      <nav>
        <ul className={`mb-20 ${styles.list}`}>
          <NavLink exact to="/profile" className={`text text_type_main-medium ${styles.link}`} activeClassName={styles.activeLink}>
            Профиль
          </NavLink>
          <NavLink exact to="/profile/orders" className={`text text_type_main-medium ${styles.link}`} activeClassName={styles.activeLink}>
            История заказов
          </NavLink>
          <button  className={`text text_type_main-medium ${styles.button}`} onClick={logoutSubmit} type="secondary" size="large">
            Выход
          </button>
        </ul>
        <p className={`text text_type_main-default text_color_inactive ${styles.additional_text}`}>
          В этом разделе вы можете изменить&nbsp;свои персональные данные
        </p>
      </nav>
      <Switch>
        <Route exact path="/profile/orders">
          <OrdersPage />
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
      </Switch>
    </div>
  );
}

