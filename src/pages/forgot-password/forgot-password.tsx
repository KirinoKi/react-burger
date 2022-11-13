import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { Link, Redirect } from 'react-router-dom';
import { useState, useRef } from "react";
import { useDispatch, useSelector } from '../../services/store';
import { forgotPassword } from "../../services/actions/auth";
import { FunctionComponent } from "react";

export const ForgotPasswordPage: FunctionComponent = () => {
  const [emailValue, setEmailValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useDispatch();

  const sentForgotPassword = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(forgotPassword(emailValue));
  }

  const forgotPasswordSuccess = useSelector(store => store.auth.forgotPasswordSuccess);

  const user = useSelector(store => store.auth.user);

  if (user) {
    return (
      <Redirect
        to='/'
      />
    );
  }

  if (forgotPasswordSuccess === true) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password'
        }}
      />
    );
  }

  return (
    <div className={styles.conatiner}>
      <h2 className="mb-6 text text_type_main-medium">Восстановление пароля</h2>
      <form className={styles.form} onSubmit={sentForgotPassword}>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка ввода e-mail'}
          size={'default'}
        />
        <Button type="primary" size="medium">
          Восстановить
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
