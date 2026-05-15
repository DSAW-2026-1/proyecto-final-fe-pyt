import axios from "axios";

const API = "http://localhost:3000/api/cart";

const getToken = () => {
  return localStorage.getItem("token");
};

// ver carrito
export const getCart = async () => {

  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;

};

// agregar
export const addToCart = async (productId) => {

  const response = await axios.post(
    API,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;

};

// eliminar
export const removeFromCart = async (id) => {

  const response = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;

};

// comprar
export const checkout = async () => {

  const response = await axios.post(
    `${API}/checkout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;

};