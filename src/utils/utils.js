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
  WS_AUTH_SEND_ORDERS
} from "../services/actions/types";

//Возвращение куки
export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//Установка куки
export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
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
export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

//Функцуия форматирования даты
export const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("ru", {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Moscow'
  });

  let dateOfOrder = new Date(date);

  const today = new Date();

  function diffSubtract(dayOne, dayTwo) {
    return Math.ceil((dayOne - dayTwo) / 86400000);
  }

  let dayQty = diffSubtract(today, dateOfOrder);

  const formatterForFay = new Intl.DateTimeFormat("ru", {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
    timeZone: 'Europe/Moscow'
  });

  const formatDay = (dateOfOrder, dayQty) => {
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

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_ORDERS,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS
};

export const wsAuthActions = {
  wsInit: WS_AUTH_CONNECTION_START,
  wsSendMessage: WS_AUTH_SEND_ORDERS,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  onMessage: WS_AUTH_GET_ORDERS
};
