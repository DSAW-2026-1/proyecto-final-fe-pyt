import axios from "axios";

const API = "https://proyecto-final-be-pyt.onrender.com/api/cart";

const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("⚠️ No hay token guardado");
  }

  return token;
};

// =======================
// VER CARRITO
// =======================
export const getCart = async () => {
  try {
    const response = await axios.get(API, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    return response.data;

  } catch (error) {
    console.error("❌ ERROR GET CART:", error.response?.data || error);
    throw error;
  }
};

// =======================
// AGREGAR PRODUCTO
// =======================
export const addToCart = async (productId) => {
  try {
    const response = await axios.post(
      `${API}/add`, // 🔥 CORREGIDO AQUÍ
      { productId },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("❌ ERROR ADD CART:", error.response?.data || error);
    throw error;
  }
};

// =======================
// ELIMINAR DEL CARRITO
// =======================
export const removeFromCart = async (id) => {
  try {
    const response = await axios.delete(
      `${API}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("❌ ERROR REMOVE CART:", error.response?.data || error);
    throw error;
  }
};

// =======================
// CHECKOUT
// =======================
export const checkout = async () => {
  try {
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

  } catch (error) {
    console.error("❌ ERROR CHECKOUT:", error.response?.data || error);
    throw error;
  }
};