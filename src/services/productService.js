import axios from "axios";

const API = "https://proyecto-final-be-pyt.onrender.com/api/products";

// 🔥 helper para headers (evita repetir código)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// ==========================
// OBTENER PRODUCTOS
// ==========================
export const getProducts = async () => {
  try {

    const response = await axios.get(API);

    return response.data;

  } catch (error) {
    console.error("ERROR GET PRODUCTS:", error);
    throw error;
  }
};

// ==========================
// CREAR PRODUCTO
// ==========================
export const createProduct = async (productData) => {
  try {

    const response = await axios.post(
      API,
      productData,
      getAuthHeaders()
    );

    return response.data;

  } catch (error) {
    console.error("ERROR CREATE PRODUCT:", error.response?.data || error);
    throw error;
  }
};

// ==========================
// ELIMINAR PRODUCTO
// ==========================
export const deleteProduct = async (id) => {
  try {

    console.log("ELIMINANDO PRODUCTO ID:", id); // 👈 DEBUG

    const response = await axios.delete(
      `${API}/${id}`,
      getAuthHeaders()
    );

    return response.data;

  } catch (error) {
    console.error("ERROR DELETE PRODUCT:", error.response?.data || error);
    throw error;
  }
};

// ==========================
// EDITAR PRODUCTO
// ==========================
export const updateProduct = async (id, productData) => {
  try {

    console.log("EDITANDO PRODUCTO:", id, productData); // 👈 DEBUG

    const response = await axios.put(
      `${API}/${id}`,
      productData,
      getAuthHeaders()
    );

    return response.data;

  } catch (error) {
    console.error("ERROR UPDATE PRODUCT:", error.response?.data || error);
    throw error;
  }
};