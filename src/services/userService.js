import axios from "axios";

const API = "https://proyecto-final-be-pyt.onrender.com/api/user";

export const getPurchases = async () => {

  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/purchases`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;

};