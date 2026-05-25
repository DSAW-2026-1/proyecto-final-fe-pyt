import axios from "axios";

const API = "https://proyecto-final-be-pyt.onrender.com/api/profile";

const getToken = () => {
  const token = localStorage.getItem("token");
  console.log("TOKEN EN PROFILE:", token);
  return token;
};

// ===============================
// 👤 OBTENER PERFIL
// ===============================
export const getProfile = async () => {

  try {

    const response = await axios.get(API, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    return response.data;

  } catch (error) {

    console.error(
      "ERROR PROFILE:",
      error.response?.data || error.message
    );

    return null; // 🔥 evita que la app se rompa
  }

};

// ===============================
// 🛍️ CONVERTIRSE EN VENDEDOR
// ===============================
export const becomeSeller = async (sellerData) => {

  try {

    const response = await axios.post(
      `${API}/become-seller`,
      sellerData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "ERROR BECOME SELLER:",
      error.response?.data || error.message
    );

    throw error; // 🔥 aquí sí lo lanzamos para mostrar alert en UI
  }

};