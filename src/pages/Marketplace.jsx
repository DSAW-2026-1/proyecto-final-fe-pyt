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
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // ===============================
  // FORM PRODUCTO
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
  // ACCIONES PRODUCTO
  // ===============================
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      alert("Producto eliminado ✅");
      loadProducts();
    } catch (error) {
      alert(error.response?.data?.error || "Error al eliminar");
    }
  };

  const handleEdit = async (product) => {

    const newData = {
      title: prompt("Título", product.title),
      price: prompt("Precio", product.price),
      description: prompt("Descripción", product.description),
      category: prompt("Categoría", product.category),
      condition: prompt("Condición (Nuevo/Usado)", product.condition),
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

  const handleAddToCart = async (id) => {
    try {
      await addToCart(id);
      alert("Producto agregado 🛒");
    } catch (error) {
      alert(error.response?.data?.error || "Error al agregar");
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div style={{
      background: "#F5F5F5",
      minHeight: "100vh",
      padding: "30px"
    }}>

      {/* HEADER */}
      <h1 style={{
        color: "#0B3C6D",
        marginBottom: 20
      }}>
        Mercado Sabana 🛒
      </h1>

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 30,
          borderRadius: 8,
          border: "1px solid #ccc"
        }}
      />

      {/* ================= FORM ================= */}
      {
        user?.isSeller && (
          <div style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            marginBottom: 30,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
          }}>

            <h2 style={{ color: "#1E5A96" }}>
              Publicar producto
            </h2>

            <form onSubmit={handleSubmit}>

              <input name="title" placeholder="Título" value={form.title} onChange={handleChange} /><br /><br />
              <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleChange} /><br /><br />
              <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} /><br /><br />

              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Categoría</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Libros">Libros</option>
                <option value="Ropa">Ropa</option>
              </select><br /><br />

              <select name="condition" value={form.condition} onChange={handleChange}>
                <option value="">Condición</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </select><br /><br />

              <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} /><br /><br />
              <input name="image" placeholder="URL imagen" value={form.image} onChange={handleChange} /><br /><br />

              <button style={{
                background: "#C9A646",
                color: "white",
                padding: "10px 20px",
                borderRadius: 6,
                border: "none"
              }}>
                Publicar
              </button>

            </form>
          </div>
        )
      }

      {/* ================= PRODUCTOS ================= */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px"
      }}>

        {
          filteredProducts.map(product => (

            <div key={product.id} style={{
              background: "white",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
            }}>

              {/* IMAGEN */}
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: 15 }}>

                <h3>{product.title}</h3>

                {/* CONDICIÓN */}
                <span style={{
                  background: product.condition === "Nuevo" ? "#1E5A96" : "#777",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 6,
                  fontSize: 12
                }}>
                  {product.condition}
                </span>

                <p style={{ fontSize: 14, color: "#555" }}>
                  {product.description}
                </p>

                <p><strong>Stock:</strong> {product.stock}</p>

                <p style={{
                  color: "#0B3C6D",
                  fontWeight: "bold",
                  fontSize: 18
                }}>
                  ${product.price}
                </p>

                {/* INFO VENDEDOR */}
                <p>👤 {product.sellerInfo?.name}</p>

                <p>
                  ⭐ {
                    product.sellerInfo?.rating === "Nuevo"
                      ? "Nuevo vendedor"
                      : product.sellerInfo?.rating
                  }
                </p>

                {/* 🔥 BOTÓN PERFIL */}
                <button
                  onClick={() => window.location.href = `/profile/${product.seller}`}
                  style={{
                    background: "#1E5A96",
                    color: "white",
                    padding: 6,
                    borderRadius: 6,
                    width: "100%",
                    marginTop: 5,
                    border: "none"
                  }}
                >
                  Ver perfil
                </button>

                {/* 🛒 */}
                <button
                  onClick={() => handleAddToCart(product.id)}
                  style={{
                    background: "#0B3C6D",
                    color: "white",
                    padding: 8,
                    borderRadius: 6,
                    width: "100%",
                    marginTop: 10,
                    border: "none"
                  }}
                >
                  🛒 Agregar
                </button>

                {/* EDITAR / ELIMINAR */}
                {
                  (user?.id === product.seller || user?.role === "admin") && (
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 10
                    }}>
                      <button onClick={() => handleEdit(product)}>✏️</button>
                      <button onClick={() => handleDelete(product.id)}>🗑️</button>
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