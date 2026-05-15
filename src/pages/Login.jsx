import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await loginUser(form);

      console.log(data);

      // guardar token
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
    );

      navigate("/marketplace");

    } catch (error) {

      console.error(error);

      alert("Credenciales incorrectas");

    }
  };

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Iniciar sesión
        </button>

      </form>

    </div>
  );
}

export default Login;