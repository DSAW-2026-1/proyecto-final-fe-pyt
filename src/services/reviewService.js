import axios from "axios";

const API = "https://proyecto-final-be-pyt.onrender.com/api/reviews";

export const addReview = async (data) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    API,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};