import axios from "axios";

const API = "http://localhost:3000/api/products";

// obtener productos
export const getProducts = async () => {

  const response = await axios.get(API);

  return response.data;

};

// crear producto
export const createProduct = async (productData) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    API,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};

// eliminar producto
export const deleteProduct = async (id) => {

  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};

// editar producto
export const updateProduct = async (id, productData) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/${id}`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};