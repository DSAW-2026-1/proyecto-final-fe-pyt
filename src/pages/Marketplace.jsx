import { useEffect, useState } from "react";

import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct
} from "../services/productService";

import { addToCart } from "../services/cartService";
import { getProfile } from "../services/profileService";

function Marketplace() {

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    condition: "",
    stock: "",
    image: ""
  });

  // ===============================
  // CARGAR DATOS
  // ===============================
  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadUser = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadUser();
  }, []);

  // ===============================
  // BUSCADOR
  // ===============================
  const filteredProducts = products.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  // ===============================
  // FORMULARIO
  // ===============================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.title ||
      !form.price ||
      !form.description ||
      !form.category ||
      !form.condition ||
      form.stock === ""
    ) {
      return alert("Todos los campos son obligatorios");
    }

    try {

      await createProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      });

      alert("Producto publicado ✅");

      setForm({
        title: "",
        price: "",
        description: "",
        category: "",
        condition: "",
        stock: "",
        image: ""
      });

      loadProducts();

    } catch (error) {
      alert(error.response?.data?.error || "Error al publicar");
    }

  };

  // ===============================
  // ELIMINAR
  // ===============================
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "¿Eliminar producto?"
    );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      alert("Producto eliminado ✅");

      loadProducts();

    } catch (error) {
      alert(error.response?.data?.error || "Error al eliminar");
    }

  };

  // ===============================
  // EDITAR
  // ===============================
  const handleEdit = async (product) => {

    const newData = {
      title: prompt("Título", product.title),
      price: prompt("Precio", product.price),
      description: prompt("Descripción", product.description),
      category: prompt("Categoría", product.category),
      condition: prompt("Condición", product.condition),
      stock: prompt("Stock", product.stock),
      image: prompt("Imagen URL", product.image)
    };

    if (Object.values(newData).some(v => v === null)) {
      return;
    }

    try {

      await updateProduct(product.id, {
        ...newData,
        price: Number(newData.price),
        stock: Number(newData.stock)
      });

      alert("Producto actualizado ✅");

      loadProducts();

    } catch (error) {
      alert(error.response?.data?.error || "Error al editar");
    }

  };

  // ===============================
  // CARRITO
  // ===============================
  const handleAddToCart = async (id) => {

    try {

      await addToCart(id);

      alert("Producto agregado 🛒");

    } catch (error) {
      alert(error.response?.data?.error || "Error");
    }

  };

  // ===============================
  // UI
  // ===============================
  return (

    <div style={{
      background: "#F5F7FA",
      minHeight: "100vh",
      padding: "40px"
    }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(90deg, #0B3C6D, #1E5A96)",
        color: "white",
        padding: "30px",
        borderRadius: "16px",
        marginBottom: "30px"
      }}>

        <h1 style={{
          margin: 0,
          fontSize: "40px"
        }}>
          Mercado Sabana 🛒
        </h1>

        <p style={{
          marginTop: 10,
          opacity: 0.9
        }}>
          Compra y vende dentro de la comunidad universitaria
        </p>

      </div>

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #D9D9D9",
          marginBottom: "30px",
          fontSize: "16px"
        }}
      />

      {/* FORMULARIO */}
      {
        user?.isSeller && (

          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            marginBottom: "40px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.08)"
          }}>

            <h2 style={{
              color: "#0B3C6D",
              marginBottom: 20
            }}>
              Publicar producto
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                name="title"
                placeholder="Título"
                value={form.title}
                onChange={handleChange}
                style={inputStyle}
              />

              <input
                type="number"
                name="price"
                placeholder="Precio"
                value={form.price}
                onChange={handleChange}
                style={inputStyle}
              />

              <textarea
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  height: 100
                }}
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Categoría</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Libros">Libros</option>
                <option value="Ropa">Ropa</option>
              </select>

              <select
                name="condition"
                value={form.condition}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Condición</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </select>

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                style={inputStyle}
              />

              <input
                name="image"
                placeholder="URL imagen"
                value={form.image}
                onChange={handleChange}
                style={inputStyle}
              />

              <button style={mainButton}>
                Publicar
              </button>

            </form>

          </div>

        )
      }

      {/* PRODUCTOS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "25px"
      }}>

        {
          filteredProducts.map(product => (

            <div
              key={product.id}
              style={{
                background: "white",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.08)"
              }}
            >

              {/* IMAGEN */}
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/300x200"
                }
                alt={product.title}
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: 20 }}>

                {/* CONDICIÓN */}
                <span style={{
                  background:
                    product.condition === "Nuevo"
                      ? "#0B3C6D"
                      : "#777",

                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "8px",
                  fontSize: 12
                }}>
                  {product.condition}
                </span>

                <h3 style={{
                  marginTop: 15,
                  color: "#0B3C6D"
                }}>
                  {product.title}
                </h3>

                <p style={{
                  color: "#555",
                  minHeight: 50
                }}>
                  {product.description}
                </p>

                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>

                <h2 style={{
                  color: "#C9A646"
                }}>
                  ${product.price}
                </h2>

                {/* VENDEDOR */}
                <div style={{
                  background: "#F4F6F9",
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 15
                }}>

                  <p>
                    👤 {product.sellerInfo?.name}
                  </p>

                  <p>
                    ⭐ {
                      product.sellerInfo?.rating === "Nuevo"
                        ? "Nuevo vendedor"
                        : product.sellerInfo?.rating
                    }
                  </p>

                </div>

                {/* PERFIL */}
                <button
                  onClick={() =>
                    window.location.href =
                      `/seller/${product.seller}`
                  }
                  style={secondaryButton}
                >
                  Ver perfil
                </button>

                {/* CARRITO */}
                <button
                  onClick={() =>
                    handleAddToCart(product.id)
                  }
                  style={mainButton}
                >
                  🛒 Agregar al carrito
                </button>

                {/* EDITAR / ELIMINAR */}
                {
                  (user?.id === product.seller ||
                    user?.role === "admin") && (

                    <div style={{
                      display: "flex",
                      gap: 10,
                      marginTop: 15
                    }}>

                      <button
                        onClick={() => handleEdit(product)}
                        style={{
                          flex: 1,
                          padding: 10,
                          borderRadius: 8,
                          border: "none",
                          background: "#1E5A96",
                          color: "white"
                        }}
                      >
                        ✏️ Editar
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(product.id)
                        }
                        style={{
                          flex: 1,
                          padding: 10,
                          borderRadius: 8,
                          border: "none",
                          background: "#C0392B",
                          color: "white"
                        }}
                      >
                        🗑️ Eliminar
                      </button>

                    </div>

                  )
                }

              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
}

// ===============================
// ESTILOS
// ===============================
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #D9D9D9",
  fontSize: "15px"
};

const mainButton = {
  width: "100%",
  background: "#C9A646",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: 10
};

const secondaryButton = {
  width: "100%",
  background: "#0B3C6D",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: 10
};

export default Marketplace;


