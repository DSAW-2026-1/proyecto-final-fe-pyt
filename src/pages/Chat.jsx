import { useEffect, useState } from "react";

import {
  getChats,
  sendMessage
} from "../services/chatService";

function Chat() {

  const [chats, setChats] = useState([]);

  const [receiverId, setReceiverId] = useState("");

  const [message, setMessage] = useState("");

  // ===============================
  // CARGAR MENSAJES
  // ===============================
  const loadChats = async () => {

    try {

      const data = await getChats();

      setChats(data);

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

    if (!receiverId || !message) {
      return alert("Completa los campos");
    }

    try {

      await sendMessage(
        receiverId,
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
      padding: 30
    }}>

      <h1>Mensajes 💬</h1>

      {/* FORM */}
      <form onSubmit={handleSend}>

        <input
          placeholder="ID destinatario"
          value={receiverId}
          onChange={(e) =>
            setReceiverId(e.target.value)
          }
        />

        <br /><br />

        <textarea
          placeholder="Mensaje"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <br /><br />

        <button>
          Enviar
        </button>

      </form>

      <hr />

      {/* MENSAJES */}
      {
        chats.map((chat, index) => (

          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10
            }}
          >

            <p>
              <strong>De:</strong>
              {" "}
              {chat.senderId}
            </p>

            <p>
              <strong>Para:</strong>
              {" "}
              {chat.receiverId}
            </p>

            <p>{chat.message}</p>

          </div>

        ))
      }

    </div>

  );

}

export default Chat;