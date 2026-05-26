import axios from "axios";

const api = axios.create({
  baseURL: "https://proyecto-final-be-pyt.onrender.com"
});

export default api;