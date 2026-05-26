import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PublicProfile() {

  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const res = await axios.get(
          `https://proyecto-final-be-pyt.onrender.com/api/profile/public/${id}`
        );

        setUser(res.data);

      } catch (error) {
        console.error(error);
      }

    };

    fetchUser();

  }, [id]);

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="container">

      <div className="card" style={{ padding: 20 }}>

        <h1>{user.name}</h1>

        <p>Email: {user.email}</p>

        <p>
          Rating:
          {
            user.rating === "Nuevo"
              ? " Nuevo vendedor"
              : ` ${user.rating} ⭐`
          }
        </p>

        <p>Ventas realizadas: {user.totalSales}</p>

        <p>
          Descripción:
          {
            user.sellerInfo?.description ||
            "Sin descripción"
          }
        </p>

      </div>

    </div>
  );
}

export default PublicProfile;