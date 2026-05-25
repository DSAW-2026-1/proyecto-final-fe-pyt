import axios from "axios";

const API = "https://proyecto-final-be-pyt.onrender.com/api/profile";

const getToken = () => localStorage.getItem("token");

// ===============================
// PERFIL
// ===============================
export const getProfile = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};

// ===============================
// VENDEDOR
// ===============================
export const becomeSeller = async (sellerData) => {
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
};