import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

      const data = await registerUser(form);

      console.log(data);

      alert("Registro exitoso ✅");

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert("Error al registrar ❌");

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
        borderRadius: "12px",
        width: "350px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)"
      }}>

        <h2 style={{
          textAlign: "center",
          color: "#0B3C6D"
        }}>
          Crear cuenta
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={form.name}
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
              marginBottom: "15px",
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
              marginBottom: "20px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#C9A646",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold"
            }}
          >
            Registrarse
          </button>

        </form>

        <p style={{
          textAlign: "center",
          marginTop: "15px"
        }}>
          ¿Ya tienes cuenta?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#0B3C6D",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Inicia sesión
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;