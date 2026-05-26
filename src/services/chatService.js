import axios from "axios";

const API =
  "https://proyecto-final-be-pyt.onrender.com/api/chat";

const getToken = () => {
  return localStorage.getItem("token");
};

// ===============================
// OBTENER CHATS
// ===============================
export const getChats = async () => {

  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;

};

// ===============================
// ENVIAR MENSAJE
// ===============================
export const sendMessage = async (
  receiverId,
  message
) => {

  const response = await axios.post(
    API,
    {
      receiverId,
      message
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;

};