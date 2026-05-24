import axios from "axios";

const BASE_URL = "https://proyecto-final-be-pyt.onrender.com";

export const loginUser = async (data) => {
  const res = await axios.post(
    `${BASE_URL}/api/auth/login`,
    data
  );
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(
    `${BASE_URL}/api/auth/register`,
    data
  );
  return res.data;
};