import { useEffect, useState } from "react";
import { getPurchases } from "../services/userService";
import { addReview } from "../services/reviewService";

function Purchases() {

  const [purchases, setPurchases] = useState([]);

  const load = async () => {
    const data = await getPurchases();
    setPurchases(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleReview = async (p) => {

    const rating = prompt("Calificación 1-5");
    if (!rating) return;

    await addReview({
      productId: p.productId,
      rating
    });

    alert("Reseña enviada ⭐");

    load();
  };

  return (
    <div>

      <h1>Mis Compras 🧾</h1>

      {
        purchases.map(p => (
          <div key={p.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>

            <img src={p.image} width="100" />

            <h3>{p.title}</h3>
            <p>${p.price}</p>

            {
              !p.reviewed ? (
                <button onClick={() => handleReview(p)}>
                  Calificar ⭐
                </button>
              ) : (
                <p>Ya calificado ✅</p>
              )
            }

          </div>
        ))
      }

    </div>
  );
}

export default Purchases;