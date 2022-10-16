import { baseUrl, checkResponce } from "./constants";

export const fetchOrderDetails = (ingredients) => {

  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    body: JSON.stringify({ ingredients: [...ingredients] }),
    headers: { "Content-Type": "application/json" },
  }).then(checkResponce);
};

export const fetchIngredients = () => {

  return fetch(`${baseUrl}/ingredients`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  }).then(checkResponce);
};
