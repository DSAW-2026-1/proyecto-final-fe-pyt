import { useEffect, useState } from "react";

import {
  getCart,
  removeFromCart,
  checkout
} from "../services/cartService";

function Cart() {

  const [cart, setCart] = useState([]);

  // cargar carrito
  const loadCart = async () => {

    const data = await getCart();

    setCart(data);

  };

  useEffect(() => {
    loadCart();
  }, []);

  // eliminar producto
  const handleRemove = async (id) => {

    await removeFromCart(id);

    loadCart();

  };

  // comprar
  const handleCheckout = async () => {

    const data = await checkout();

    alert(
      `Compra realizada ✅ Total: $${data.total}`
    );

    loadCart();

  };

  // total
  const total = cart.reduce(
    (acc, product) =>
      acc + Number(product.price),
    0
  );

  return (
    <div>

      <h1>Carrito 🛒</h1>

      <hr />

      {
        cart.length === 0
          ? (
            <h2>
              Carrito vacío
            </h2>
          )
          : (
            <>
              {
                cart.map(product => (

                  <div
                    key={product.id}
                    style={{
                      border: "1px solid gray",
                      padding: "10px",
                      marginBottom: "10px"
                    }}
                  >

                    <img
                      src={product.image}
                      alt={product.title}
                      width="150"
                    />

                    <h3>
                      {product.title}
                    </h3>

                    <p>
                      ${product.price}
                    </p>

                    <button
                      onClick={() =>
                        handleRemove(product.id)
                      }
                    >
                      Eliminar
                    </button>

                  </div>

                ))
              }

              <hr />

              <h2>
                Total: ${total}
              </h2>

              <button onClick={handleCheckout}>
                Comprar
              </button>

            </>
          )
      }

    </div>
  );
}

export default Cart;