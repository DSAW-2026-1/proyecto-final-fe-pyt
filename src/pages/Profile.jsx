import { useEffect, useState } from "react";
import {
  getProfile,
  becomeSeller
} from "../services/profileService";

function Profile() {

  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    publicName: "",
    phone: "",
    faculty: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);

  // ===============================
  // CARGAR PERFIL
  // ===============================
  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (error) {
      console.error("Error cargando perfil", error);
      alert("Error cargando perfil");
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
  // SER VENDEDOR
  // ===============================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await becomeSeller(form);

      alert("Ahora eres vendedor ✅");

      loadProfile();

    } catch (error) {
      console.error(error);
      alert("Error al convertirse en vendedor");
    }

  };

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Cargando...</h1>;
  }

  if (!user) {
    return <h1>Error cargando usuario</h1>;
  }

  // ===============================
  // UI
  // ===============================
  return (
    <div className="container">

      <h1 style={{ color: "#0B3C6D" }}>
        Mi Perfil 👤
      </h1>

      <div className="card" style={{ padding: 20 }}>

        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>

        <p><strong>Ventas:</strong> {user.totalSales}</p>

        <p>
          <strong>Calificación:</strong>{" "}
          {
            user.rating
              ? `⭐ ${user.rating}`
              : "Nuevo vendedor"
          }
        </p>

      </div>

      <br />

      {/* ===============================
          NOTIFICACIONES
      =============================== */}
      <div className="card" style={{ padding: 20 }}>

        <h3>🔔 Notificaciones</h3>

        {
          user.notifications && user.notifications.length > 0
            ? user.notifications.map((n, i) => (
              <p key={i}>
                {n.message}
              </p>
            ))
            : <p>No tienes notificaciones</p>
        }

      </div>

      <br />

      {/* ===============================
          FORM VENDEDOR
      =============================== */}
      {
        !user.isSeller ? (

          <div className="card" style={{ padding: 20 }}>

            <h2>Convertirme en vendedor 🏪</h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="publicName"
                placeholder="Nombre público"
                value={form.publicName}
                onChange={handleChange}
              />

              <br /><br />

              <input
                type="text"
                name="phone"
                placeholder="Teléfono"
                value={form.phone}
                onChange={handleChange}
              />

              <br /><br />

              <input
                type="text"
                name="faculty"
                placeholder="Facultad"
                value={form.faculty}
                onChange={handleChange}
              />

              <br /><br />

              <textarea
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
              />

              <br /><br />

              <button className="btn-gold">
                Ser vendedor
              </button>

            </form>

          </div>

        ) : (

          <div className="card" style={{ padding: 20 }}>

            <h2 style={{ color: "#0B3C6D" }}>
              🏪 Ya eres vendedor
            </h2>

            <p><strong>Nombre público:</strong> {user.sellerInfo?.publicName}</p>
            <p><strong>Teléfono:</strong> {user.sellerInfo?.phone}</p>
            <p><strong>Facultad:</strong> {user.sellerInfo?.faculty}</p>
            <p><strong>Descripción:</strong> {user.sellerInfo?.description}</p>

          </div>

        )
      }

    </div>
  );
}

export default Profile;