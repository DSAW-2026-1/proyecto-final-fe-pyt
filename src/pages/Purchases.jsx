import { useEffect, useState } from "react";
import { getPurchases } from "../services/userService";
import { addReview } from "../services/reviewService";

function Purchases() {

  const [purchases, setPurchases] = useState([]);

  // 🔥 NUEVO (para comentario opcional)
  const [comments, setComments] = useState({});

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
  // MANEJAR COMENTARIO
  // ===============================
  const handleCommentChange = (productId, value) => {
    setComments(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  // ===============================
  // CALIFICAR
  // ===============================
  const handleReview = async (p) => {

    const rating = prompt("Calificación 1-5");

    if (!rating) return;

    const numericRating = Number(rating);

    // 🔥 VALIDACIÓN FUERTE
    if (numericRating < 1 || numericRating > 5) {
      return alert("La calificación debe ser entre 1 y 5");
    }

    try {

      await addReview({
        productId: p.productId,
        rating: numericRating,
        comment: comments[p.productId] || ""
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
    <div style={{ padding: 20 }}>

      <h1>Mis Compras 🧾</h1>

      {
        purchases.length === 0 ? (
          <p>No tienes compras aún</p>
        ) : (
          purchases.map((p, index) => (
            <div
              key={index}
              style={{
                border: "1px solid gray",
                margin: 10,
                padding: 10,
                borderRadius: 10
              }}
            >

              {/* IMAGEN */}
              {
                p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    width="120"
                  />
                )
              }

              <h3>{p.title}</h3>
              <p>Precio: ${p.price}</p>

              {/* 🔥 ESTADO */}
              {
                p.reviewed ? (
                  <p>Ya calificado ✅</p>
                ) : (
                  <>
                    <textarea
                      placeholder="Comentario (opcional)"
                      value={comments[p.productId] || ""}
                      onChange={(e) =>
                        handleCommentChange(
                          p.productId,
                          e.target.value
                        )
                      }
                    />

                    <br /><br />

                    <button onClick={() => handleReview(p)}>
                      Calificar ⭐
                    </button>
                  </>
                )
              }

            </div>
          ))
        )
      }

    </div>
  );
}

export default Purchases;