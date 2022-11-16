import { PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import loginStyles from "./login.module.css";
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useState, useRef } from "react";
import { useDispatch, useSelector } from '../../services/store';
import { login } from "../../services/actions/auth";
import { FunctionComponent } from "react";
import { Button, TLocation } from "../../utils/utils";

export const LoginPage: FunctionComponent = () => {
  const [passwordValue, setPasswordValue] = useState<string>('')

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const [emailValue, setEmailValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useDispatch();

  const user = useSelector(store => store.auth.user);

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(emailValue, passwordValue));
  }


  let location = useLocation<TLocation>();

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


