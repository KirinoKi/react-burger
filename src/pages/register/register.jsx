import { PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import registerStyles from "./register.module.css";
import { Link, Redirect } from 'react-router-dom';
import { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../../services/actions/auth";

export function RegisterPage() {
  const [passwordValue, setPasswordValue] = useState('');

  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  }

  const [emailValue, setEmailValue] = useState('');
  const inputRef = useRef(null);

  const [namelValue, setnamelValue] = useState('');
  const inputNemeRef = useRef(null);

  const dispatch = useDispatch();

  const userRegister = (e) => {
    e.preventDefault();
    dispatch(register(emailValue, passwordValue, namelValue));
  }

  const user = useSelector(store => store.auth.user);

  if (user) {
    return (
      <Redirect
        to='/'
      />
    );
  }

  return (
    <div className={registerStyles.conatiner}>
      <h2 className="mb-6 text text_type_main-medium">Регистрация</h2>
      <form className={registerStyles.form} onSubmit={userRegister}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setnamelValue(e.target.value)}
          value={namelValue}
          name={'name'}
          error={false}
          ref={inputNemeRef}
          errorText={'Ошибка ввода имени'}
          size={'default'}
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка ввода e-mail'}
          size={'default'}
        />
        <PasswordInput onChange={onChangePassword} value={passwordValue} name={'password'} />
        <Button type="primary" size="medium" >
          Зарегистрироваться
        </Button>
      </form>
      <div className={`mt-20 ${registerStyles.options}`}>
        <p className="mr-2 text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
        <Link className={`text text_type_main-default text_color_inactive ${registerStyles.link}`} to="/login">
          Войти
        </Link>
      </div>
    </div>
  );
}

