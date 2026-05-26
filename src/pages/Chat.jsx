import { useEffect, useState } from "react";

import {
  getChats,
  sendMessage
} from "../services/chatService";

import {
  useSearchParams
} from "react-router-dom";

function Chat() {

  const [searchParams] = useSearchParams();

  // 🔥 vendedor automático
  const sellerId =
    searchParams.get("seller");

  const [chats, setChats] = useState([]);

  const [message, setMessage] = useState("");

  // ===============================
  // CARGAR MENSAJES
  // ===============================
  const loadChats = async () => {

    try {

      const data = await getChats();

      // 🔥 filtrar conversación
      const filtered = data.filter(
        chat =>
          chat.senderId === sellerId ||
          chat.receiverId === sellerId
      );

      setChats(filtered);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadChats();

  }, []);

  // ===============================
  // ENVIAR
  // ===============================
  const handleSend = async (e) => {

    e.preventDefault();

    if (!message) {
      return alert("Escribe un mensaje");
    }

    try {

      await sendMessage(
        sellerId,
        message
      );

      setMessage("");

      loadChats();

    } catch (error) {

      alert("Error enviando mensaje");

    }

  };

  return (

    <div style={{
      padding: 30,
      maxWidth: 700,
      margin: "auto"
    }}>

      <h1>Chat 💬</h1>

      {/* MENSAJES */}
      <div style={{
        background: "white",
        borderRadius: 12,
        padding: 20,
        minHeight: 400,
        marginBottom: 20
      }}>

        {
          chats.map((chat, index) => (

            <div
              key={index}
              style={{
                marginBottom: 15,
                background: "#F5F5F5",
                padding: 10,
                borderRadius: 10
              }}
            >

              <p>
                {chat.message}
              </p>

            </div>

          ))
        }

      </div>

      {/* INPUT */}
      <form onSubmit={handleSend}>

        <textarea
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          style={{
            width: "100%",
            height: 100,
            padding: 10,
            borderRadius: 10
          }}
        />

        <br /><br />

        <button
          style={{
            background: "#0B3C6D",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: 10
          }}
        >
          Enviar
        </button>

      </form>

    </div>

  );

}

export default Chat;