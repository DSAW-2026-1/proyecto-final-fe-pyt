import { useEffect, useState } from "react";
import { getPurchases } from "../services/userService";
import { addReview } from "../services/reviewService";

function Purchases() {

  const [purchases, setPurchases] = useState([]);

  // ⭐ estado para rating y comentario
  const [reviews, setReviews] = useState({});

  // ===============================
  // CARGAR COMPRAS
  // ===============================
  const load = async () => {
    try {
      const data = await getPurchases();
      setPurchases(data);
    } catch (error) {
      console.error("Error cargando compras", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ===============================
  // MANEJAR INPUTS
  // ===============================
  const handleChange = (productId, field, value) => {
    setReviews(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
  };

  // ===============================
  // CALIFICAR
  // ===============================
  const handleReview = async (p) => {

    const review = reviews[p.productId];

    if (!review || !review.rating) {
      return alert("Selecciona una calificación");
    }

    try {

      await addReview({
        productId: p.productId,
        rating: Number(review.rating),
        comment: review.comment || ""
      });

      alert("Reseña enviada ⭐");

      load();

    } catch (error) {
      console.error("Error al calificar", error);

      alert(
        error.response?.data?.error ||
        "Error al enviar reseña"
      );
    }

  };

  // ===============================
  // UI
  // ===============================
  return (
    <div className="container">

      <h1>Mis Compras 🧾</h1>

      {
        purchases.length === 0 ? (
          <p>No tienes compras aún</p>
        ) : (
          <div className="grid">

            {
              purchases.map((p, index) => (

                <div key={index} className="card">

                  {/* IMAGEN */}
                  {
                    p.image && (
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{
                          width: "100%",
                          borderRadius: 8,
                          marginBottom: 10
                        }}
                      />
                    )
                  }

                  <h3>{p.title}</h3>

                  <p><strong>Precio:</strong> ${p.price}</p>

                  {/* ESTADO */}
                  {
                    p.reviewed ? (
                      <p style={{ color: "green" }}>
                        ✅ Ya calificaste
                      </p>
                    ) : (
                      <>
                        {/* ⭐ RATING */}
                        <select
                          value={reviews[p.productId]?.rating || ""}
                          onChange={(e) =>
                            handleChange(
                              p.productId,
                              "rating",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Calificación</option>
                          <option value="5">5 ⭐</option>
                          <option value="4">4 ⭐</option>
                          <option value="3">3 ⭐</option>
                          <option value="2">2 ⭐</option>
                          <option value="1">1 ⭐</option>
                        </select>

                        <br /><br />

                        {/* 💬 COMENTARIO */}
                        <textarea
                          placeholder="Comentario (opcional)"
                          value={reviews[p.productId]?.comment || ""}
                          onChange={(e) =>
                            handleChange(
                              p.productId,
                              "comment",
                              e.target.value
                            )
                          }
                        />

                        <br /><br />

                        <button
                          className="btn"
                          onClick={() => handleReview(p)}
                        >
                          Enviar reseña ⭐
                        </button>
                      </>
                    )
                  }

                </div>

              ))
            }

          </div>
        )
      }

    </div>
  );
}

export default Purchases;