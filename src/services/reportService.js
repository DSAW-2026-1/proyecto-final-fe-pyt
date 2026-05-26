import axios from "axios";

const API = "https://proyecto-final-be-pyt.onrender.com/api/reports";

export const createReport = async (data) => {

  const token = localStorage.getItem("token");

  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};