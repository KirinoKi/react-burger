import { PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import loginStyles from "./login.module.css";
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../services/actions/auth";

export function LoginPage() {
  const [passwordValue, setPasswordValue] = useState('')

  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  }

  const [emailValue, setEmailValue] = useState('')
  const inputRef = useRef(null)

  const dispatch = useDispatch();

  const user = useSelector(store => store.auth.user);

  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(login(emailValue, passwordValue));
  }

  let location = useLocation();

  if (user) {
    return (
      <Redirect
        to={location.state?.from || '/'}
      />
    );
  }

  return (
    <div className={loginStyles.conatiner}>
      <h2 className="mb-6 text text_type_main-medium">Вход</h2>
      <form className={loginStyles.form} onSubmit={submitLogin}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка ввода e-mail'}
          size={'default'}
        />
        <PasswordInput onChange={onChangePassword} value={passwordValue} name={'password'} />
        <Button type="primary" size="medium" >
          Войти
        </Button>
      </form>
      <div className={`mt-20 ${loginStyles.options}`}>
        <p className="mr-2 text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
        <Link className={`text text_type_main-default text_color_inactive ${loginStyles.link}`} to="/register">
          Зарегистрироваться
        </Link>
      </div>
      <div className={`mt-4 ${loginStyles.options}`}>
        <p className="mr-2 text text_type_main-default text_color_inactive">Забыли пароль?</p>
        <Link className={`text text_type_main-default text_color_inactive ${loginStyles.link}`} to="/forgot-password">
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
}


