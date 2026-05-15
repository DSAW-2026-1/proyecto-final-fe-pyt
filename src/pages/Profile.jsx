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

  // cargar perfil
  const loadProfile = async () => {

    const data = await getProfile();

    setUser(data);

  };

  useEffect(() => {
    loadProfile();
  }, []);

  // manejar inputs
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // hacerse vendedor
  const handleSubmit = async (e) => {

    e.preventDefault();

    await becomeSeller(form);

    alert("Ahora eres vendedor ✅");

    loadProfile();

  };

  if (!user) {
    return <h1>Cargando...</h1>;
  }

  return (
    <div>

      <h1>Mi Perfil 👤</h1>

      <hr />

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
        <strong>Ventas:</strong> {user.totalSales}
      </p>

      <p>
        <strong>Calificación:</strong>

        {
          user.rating
            ? ` ⭐ ${user.rating}`
            : " Nuevo vendedor"
        }
      </p>

      <hr />

      {
        !user.isSeller && (

          <div>

            <h2>Convertirme en vendedor 🏪</h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="publicName"
                placeholder="Nombre público"
                onChange={handleChange}
              />

              <br /><br />

              <input
                type="text"
                name="phone"
                placeholder="Teléfono"
                onChange={handleChange}
              />

              <br /><br />

              <input
                type="text"
                name="faculty"
                placeholder="Facultad"
                onChange={handleChange}
              />

              <br /><br />

              <textarea
                name="description"
                placeholder="Descripción"
                onChange={handleChange}
              />

              <br /><br />

              <button type="submit">
                Ser vendedor
              </button>

            </form>

          </div>

        )
      }

      {
        user.isSeller && (
          <h2>
            🏪 Eres vendedor
          </h2>
        )
      }

    </div>
  );
}

export default Profile;