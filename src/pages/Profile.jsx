import { useEffect, useState } from "react";

import {
  getProfile,
  becomeSeller
} from "../services/profileService";

function Profile() {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    publicName: "",
    phone: "",
    faculty: "",
    description: ""
  });

  // ===============================
  // CARGAR PERFIL
  // ===============================
  const loadProfile = async () => {

    try {

      const data = await getProfile();

      setUser(data);

    } catch (error) {

      console.error("Error cargando perfil", error);

      alert(
        error.response?.data?.error ||
        "Error cargando perfil"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // ===============================
  // INPUTS
  // ===============================
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // ===============================
  // CONVERTIRSE EN VENDEDOR
  // ===============================
  const handleSubmit = async (e) => {

    e.preventDefault();

    // VALIDACIÓN
    if (
      !form.publicName ||
      !form.phone ||
      !form.faculty
    ) {
      return alert("Completa todos los campos obligatorios");
    }

    try {

      await becomeSeller({
        publicName: form.publicName,
        phone: form.phone,
        faculty: form.faculty,
        description: form.description
      });

      alert("Ahora eres vendedor ✅");

      // recargar perfil
      loadProfile();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.error ||
        "Error al convertirse en vendedor"
      );
    }
  };

  // ===============================
  // LOADING
  // ===============================
  if (loading) {

    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <h1>Cargando...</h1>
      </div>
    );
  }

  // ===============================
  // ERROR USER
  // ===============================
  if (!user) {

    return (
      <h1 style={{
        textAlign: "center",
        marginTop: 50
      }}>
        Error cargando usuario
      </h1>
    );
  }

  // ===============================
  // UI
  // ===============================
  return (

    <div style={{
      background: "#F5F7FA",
      minHeight: "100vh",
      padding: "30px"
    }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(90deg, #0B3C6D, #1E5A96)",
        padding: "30px",
        borderRadius: "16px",
        color: "white",
        marginBottom: "30px"
      }}>

        <h1 style={{
          margin: 0,
          fontSize: "40px"
        }}>
          Mi Perfil 👤
        </h1>

        <p>
          Información de tu cuenta universitaria
        </p>

      </div>

      {/* INFO PERFIL */}
      <div style={{
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        marginBottom: "25px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.08)"
      }}>

        <h2 style={{
          color: "#0B3C6D"
        }}>
          Información personal
        </h2>

        <p>
          <strong>Nombre:</strong> {user.name}
        </p>

        <p>
          <strong>Correo:</strong> {user.email}
        </p>

        <p>
          <strong>Rol:</strong> {user.role}
        </p>

        <p>
          <strong>Ventas:</strong> {user.totalSales || 0}
        </p>

        <p>
          <strong>Calificación:</strong>{" "}
          {
            user.rating === "Nuevo" || !user.rating
              ? "Nuevo vendedor"
              : `⭐ ${user.rating}`
          }
        </p>

      </div>

      {/* NOTIFICACIONES */}
      <div style={{
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        marginBottom: "25px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.08)"
      }}>

        <h2 style={{
          color: "#0B3C6D"
        }}>
          🔔 Notificaciones
        </h2>

        {
          user.notifications &&
          user.notifications.length > 0 ? (

            user.notifications.map((n, i) => (

              <div
                key={i}
                style={{
                  background: "#F5F7FA",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "10px"
                }}
              >
                {n.message}
              </div>

            ))

          ) : (

            <p>No tienes notificaciones</p>

          )
        }

      </div>

      {/* FORM VENDEDOR */}
      {
        !user.isSeller ? (

          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)"
          }}>

            <h2 style={{
              color: "#0B3C6D"
            }}>
              Convertirme en vendedor 🏪
            </h2>

            <p>
              Completa tu información para comenzar a vender productos.
            </p>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="publicName"
                placeholder="Nombre público"
                value={form.publicName}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ccc"
                }}
              />

              <input
                type="text"
                name="phone"
                placeholder="Teléfono"
                value={form.phone}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ccc"
                }}
              />

              <input
                type="text"
                name="faculty"
                placeholder="Facultad"
                value={form.faculty}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ccc"
                }}
              />

              <textarea
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  minHeight: "100px"
                }}
              />

              <button
                style={{
                  background: "#C9A646",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Ser vendedor
              </button>

            </form>

          </div>

        ) : (

          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)"
          }}>

            <h2 style={{
              color: "#0B3C6D"
            }}>
              🏪 Perfil de vendedor
            </h2>

            <p>
              <strong>Nombre público:</strong>{" "}
              {user.sellerInfo?.publicName}
            </p>

            <p>
              <strong>Teléfono:</strong>{" "}
              {user.sellerInfo?.phone}
            </p>

            <p>
              <strong>Facultad:</strong>{" "}
              {user.sellerInfo?.faculty}
            </p>

            <p>
              <strong>Descripción:</strong>{" "}
              {user.sellerInfo?.description || "Sin descripción"}
            </p>

          </div>

        )
      }

    </div>
  );
}

export default Profile;