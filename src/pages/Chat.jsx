import { useState, useEffect } from "react";
import axios from "axios";

function Chat({ userId }) {

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  const loadMessages = async () => {
    const res = await axios.get(
      `https://proyecto-final-be-pyt.onrender.com/api/chat/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setMessages(res.data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const send = async () => {

    await axios.post(
      "https://proyecto-final-be-pyt.onrender.com/api/chat",
      { to: userId, message: text },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setText("");
    loadMessages();
  };

  return (
    <div>
      <h2>Chat</h2>

      {messages.map((m, i) => (
        <p key={i}>
          <b>{m.from}</b>: {m.message}
        </p>
      ))}

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={send}>Enviar</button>
    </div>
  );
}

export default Chat;