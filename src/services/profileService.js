import axios from "axios";

const API = "https://proyecto-final-be-pyt.onrender.com/api/profile";

const getToken = () => {
  return localStorage.getItem("token");
};

// obtener perfil
export const getProfile = async () => {

  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;

};

// convertirse en vendedor
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