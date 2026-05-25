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

      // guardar token
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/marketplace");

    } catch (error) {
      console.error(error);
      alert("Credenciales incorrectas ❌");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0B3C6D, #1E5A96)"
    }}>

      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "350px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"
      }}>

        <h2 style={{
          textAlign: "center",
          color: "#0B3C6D"
        }}>
          Mercado Sabana
        </h2>

        <p style={{
          textAlign: "center",
          color: "gray",
          marginBottom: "20px"
        }}>
          Iniciar sesión
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="correo@unisabana.edu.co"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#C9A646",
              color: "white",
              fontWeight: "bold",
              borderRadius: "6px"
            }}
          >
            Iniciar sesión
          </button>

        </form>

        <p style={{
          marginTop: "15px",
          textAlign: "center"
        }}>
          ¿No tienes cuenta?{" "}
          <span
            style={{ color: "#0B3C6D", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Regístrate
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;