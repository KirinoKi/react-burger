import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_SEND_ORDERS,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_GET_ORDERS,
  WS_AUTH_SEND_ORDERS,
  WS_CONNECTION_CLOSE,
  WS_AUTH_CONNECTION_CLOSE
} from "../services/actions/types";
import { Button as ButtonUI, Tab as TabUI } from "@ya.praktikum/react-developer-burger-ui-components";
import {FC, SyntheticEvent} from "react";
import { TWs } from "./types";

//Возвращение куки
export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

//Установка куки
export const setCookie = (name: string, value: string | number | boolean, props?: Record<string, string | number | Date | boolean>) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp instanceof Date && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

//Удаление куки
export const deleteCookie = (name: string) => {
  setCookie(name, '', { expires: -1 });
}

//Функцуия форматирования даты
export const formatDate = (date: string | Date) => {
  const formatter = new Intl.DateTimeFormat("ru", {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Moscow'
  });

  let dateOfOrder = new Date(date);

  const today = new Date();

  function diffSubtract(dayOne: string | Date, dayTwo: string | Date) {
    return Math.ceil((Number(dayOne) - Number(dayTwo)) / 86400000);
  }

  let dayQty = diffSubtract(today, dateOfOrder);

  const formatterForFay = new Intl.DateTimeFormat("ru", {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
    timeZone: 'Europe/Moscow'
  });

  const formatDay = (dateOfOrder: Date, dayQty: number) => {
    if (formatterForFay.format(today) === formatterForFay.format(dateOfOrder)) {
      return 'Cегодня'
    }
    if (dayQty === 1) {
      return 'Вчера'
    }
    if (dayQty === 2 || dayQty === 3 || dayQty === 4) {
      return `${dayQty} дня назад`
    }
    if (dayQty > 4 ) {
      return `${dateOfOrder.toLocaleDateString("ru-RU")}`
    }

  }
  return `${formatDay(dateOfOrder, dayQty)}, ${formatter.format(dateOfOrder)} i-GMT+3`
}

export const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
export const wsAuthUrl = 'wss://norma.nomoreparties.space/orders';

export const wsActions: TWs = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_ORDERS,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
  wsClose: WS_CONNECTION_CLOSE,
};

export const wsAuthActions: TWs = {
  wsInit: WS_AUTH_CONNECTION_START,
  wsSendMessage: WS_AUTH_SEND_ORDERS,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  onMessage: WS_AUTH_GET_ORDERS,
  wsClose: WS_AUTH_CONNECTION_CLOSE,
};

export const Button: FC<{
    type?: 'secondary' | 'primary';
    size?: 'small' | 'medium' | 'large';
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    disabled?: boolean;
    name?: string;
    htmlType?: 'button' | 'submit' | 'reset';
    className?: string;
    children: React.ReactNode;
}> = ButtonUI

export const Tab: FC<{
    active: boolean;
    value: string;
    onClick: (value: string) => void;
    children: React.ReactNode;
}> = TabUI