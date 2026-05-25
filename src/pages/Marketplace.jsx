import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct
} from "../services/productService";

import { addToCart } from "../services/cartService";
import { getProfile } from "../services/profileService";

function Marketplace() {

  const navigate = useNavigate();

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
      console.error("Error cargando productos", error);
    }
  };

  const loadUser = async () => {
    try {

      const data = await getProfile();

      setUser(data);

    } catch (error) {
      console.error("Error cargando usuario", error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadUser();
  }, []);

  // ===============================
  // BUSCADOR
  // ===============================
  const filteredProducts = products.filter(product =>
    product.title?.toLowerCase().includes(search.toLowerCase())
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

  // ===============================
  // CREAR PRODUCTO
  // ===============================
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.title ||
      !form.price ||
      !form.description ||
      !form.category ||
      !form.condition ||
      !form.stock
    ) {
      return alert("Completa todos los campos");
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

      console.error(error);

      alert(
        error.response?.data?.error ||
        "Error al publicar"
      );
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

      console.error(error);

      alert(
        error.response?.data?.error ||
        "Error al eliminar"
      );
    }
  };

  // ===============================
  // EDITAR
  // ===============================
  const handleEdit = async (product) => {

    try {

      const newData = {

        title:
          prompt("Título", product.title) || product.title,

        price:
          prompt("Precio", product.price) || product.price,

        description:
          prompt("Descripción", product.description) || product.description,

        category:
          prompt("Categoría", product.category) || product.category,

        condition:
          prompt("Condición", product.condition) || product.condition,

        stock:
          prompt("Stock", product.stock) || product.stock,

        image:
          prompt("Imagen URL", product.image) || product.image
      };

      await updateProduct(product.id, {
        ...newData,
        price: Number(newData.price),
        stock: Number(newData.stock)
      });

      alert("Producto actualizado ✅");

      loadProducts();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.error ||
        "Error al editar"
      );
    }
  };

  // ===============================
  // AGREGAR CARRITO
  // ===============================
  const handleAddToCart = async (id) => {

    try {

      await addToCart(id);

      alert("Producto agregado al carrito 🛒");

    } catch (error) {

      console.error("❌ ERROR ADD CART:", error);

      alert(
        error.response?.data?.error ||
        "Error al agregar"
      );
    }
  };

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
        marginBottom: "30px",
        color: "white"
      }}>

        <h1 style={{
          margin: 0,
          fontSize: "42px"
        }}>
          Mercado Sabana 🛒
        </h1>

        <p>
          Compra y vende productos universitarios
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
          border: "1px solid #ccc",
          marginBottom: "30px",
          fontSize: "16px"
        }}
      />

      {/* FORMULARIO VENDEDOR */}
      {
        user?.isSeller && (

          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            marginBottom: "35px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.08)"
          }}>

            <h2 style={{
              color: "#0B3C6D"
            }}>
              Publicar producto
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                name="title"
                placeholder="Título"
                value={form.title}
                onChange={handleChange}
              />

              <br /><br />

              <input
                type="number"
                name="price"
                placeholder="Precio"
                value={form.price}
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

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Categoría</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Libros">Libros</option>
                <option value="Ropa">Ropa</option>
              </select>

              <br /><br />

              <select
                name="condition"
                value={form.condition}
                onChange={handleChange}
              >
                <option value="">Condición</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </select>

              <br /><br />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
              />

              <br /><br />

              <input
                name="image"
                placeholder="URL imagen"
                value={form.image}
                onChange={handleChange}
              />

              <br /><br />

              <button style={{
                background: "#C9A646",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer"
              }}>
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
                  height: "220px",
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: "18px" }}>

                {/* CONDICIÓN */}
                <span style={{
                  background:
                    product.condition === "Nuevo"
                      ? "#1E5A96"
                      : "#777",

                  color: "white",

                  padding: "4px 10px",

                  borderRadius: "6px",

                  fontSize: "12px"
                }}>
                  {product.condition}
                </span>

                <h3>{product.title}</h3>

                <p style={{
                  color: "#666"
                }}>
                  {product.description}
                </p>

                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>

                <h2 style={{
                  color: "#0B3C6D"
                }}>
                  ${product.price}
                </h2>

                {/* VENDEDOR */}
                <hr />

                <p>
                  👤 {
                    product.sellerInfo?.publicName ||
                    "Vendedor"
                  }
                </p>

                <p>
                  ⭐ {
                    product.sellerInfo?.rating === "Nuevo"
                      ? "Nuevo vendedor"
                      : product.sellerInfo?.rating || "Nuevo vendedor"
                  }
                </p>

                {/* PERFIL */}
                <button
                  onClick={() =>
                    navigate(`/seller/${product.seller}`)
                  }
                  style={{
                    width: "100%",
                    background: "#1E5A96",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    cursor: "pointer"
                  }}
                >
                  Ver perfil
                </button>

                {/* CARRITO */}
                <button
                  onClick={() =>
                    handleAddToCart(product.id)
                  }
                  style={{
                    width: "100%",
                    background: "#0B3C6D",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  🛒 Agregar al carrito
                </button>

                {/* EDITAR / ELIMINAR */}
                {
                  (user?.id === product.seller ||
                    user?.role === "admin") && (

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "15px"
                    }}>

                      <button
                        onClick={() => handleEdit(product)}
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                      >
                        🗑️
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

export default Marketplace;