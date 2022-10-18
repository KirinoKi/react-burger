import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link, Redirect } from 'react-router-dom';
import { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from "../../services/actions/auth";

export function ResetPasswordPage() {
  const [passwordValue, setPasswordValue] = useState('');
  const [token, setToken] = useState('');
  const [icon, setIcon] = useState('ShowIcon');
  const [type, setType] = useState('password');

  const inputPasswordRef = useRef(null);
  const inputCodRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0);
    setIcon('HideIcon');
    setType('text');
    if (icon === 'HideIcon' && type === 'text') {
      setIcon('ShowIcon');
      setType('password');
    }
  }

  const dispatch = useDispatch();

  const saveNewPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword(passwordValue, token));
  }

  const forgotPasswordSuccess = useSelector(store => store.auth.forgotPasswordSuccess);
  const user = useSelector(store => store.auth.user);
  const resetPasswordSuccess = useSelector(store => store.auth.resetPasswordSuccess);

  if (forgotPasswordSuccess === false) {
    return (
      <Redirect
        to={{
          pathname: '/forgot-password'
        }}
      />
    );
  }

  if (user) {
    return (
      <Redirect
        to='/'
      />
    );
  }

  if (resetPasswordSuccess === true) {
    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    );
  }

  return (
    <div className={styles.conatiner}>
      <h2 className="mb-6 text text_type_main-medium">Восстановление пароля</h2>
      <form className={styles.form} onSubmit={saveNewPassword}>
        <Input
          type={type}
          placeholder={'Введите новый пароль'}
          onChange={e => setPasswordValue(e.target.value)}
          value={passwordValue}
          icon={icon}
          name={'email'}
          error={false}
          ref={inputPasswordRef}
          onIconClick={onIconClick}
          errorText={'Ошибка ввода e-mail'}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          value={token}
          onChange={e => setToken(e.target.value)}
          name={'token'}
          error={false}
          ref={inputCodRef}
          errorText={'Ошибка ввода кода'}
          size={'default'}
        />
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className={`mt-20 ${styles.options}`}>
        <p className="mr-2 text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
        <Link className={`text text_type_main-default text_color_inactive ${styles.link}`} to="/login">
          Войти
        </Link>
      </div>
    </div>
  );
}
