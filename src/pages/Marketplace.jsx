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
      await createProduct(form);

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
      alert("Error al publicar producto");
    }
  };

  // ===============================
  // PRODUCTOS
  // ===============================
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      alert("Producto eliminado ✅");
      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

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

    try {
      await updateProduct(product.id, newData);
      alert("Producto actualizado ✅");
      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Error al editar");
    }
  };

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
    <div style={{ background: "#f5f7fb", minHeight: "100vh", padding: "30px" }}>

      <h1 style={{ color: "#002F6C" }}>Marketplace 🛒</h1>

      {/* ================= FORM ================= */}
      {
        user?.isSeller && (
          <div style={{
            background: "white",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
          }}>

            <h2 style={{ color: "#0056b3" }}>Publicar producto</h2>

            <form onSubmit={handleSubmit}>

              <input name="title" placeholder="Título" value={form.title} onChange={handleChange} />
              <br /><br />

              <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleChange} />
              <br /><br />

              <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
              <br /><br />

              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Categoría</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Libros">Libros</option>
                <option value="Ropa">Ropa</option>
              </select>

              <br /><br />

              <select name="condition" value={form.condition} onChange={handleChange}>
                <option value="">Condición</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </select>

              <br /><br />

              <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
              <br /><br />

              <input name="image" placeholder="URL imagen" value={form.image} onChange={handleChange} />
              <br /><br />

              <button style={{
                background: "#002F6C",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: 5
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
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px"
      }}>

        {
          products.map(product => (

            <div key={product.id} style={{
              background: "white",
              borderRadius: 10,
              padding: 15,
              boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
            }}>

              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 8
                }}
              />

              <h3>{product.title}</h3>
              <p>{product.description}</p>

              <p><strong>Stock:</strong> {product.stock}</p>
              <p style={{ color: "#0056b3", fontWeight: "bold" }}>
                ${product.price}
              </p>

              <p>👤 {product.sellerInfo?.name}</p>
              <p>
                ⭐ {
                  product.sellerInfo?.rating === "Nuevo"
                    ? "Nuevo vendedor"
                    : product.sellerInfo?.rating
                }
              </p>

              <button
                onClick={() => handleAddToCart(product.id)}
                style={{
                  background: "#0056b3",
                  color: "white",
                  border: "none",
                  padding: 8,
                  borderRadius: 5,
                  marginTop: 10
                }}
              >
                🛒 Agregar
              </button>

              {
                (user?.id === product.seller || user?.role === "admin") && (
                  <div style={{ marginTop: 10 }}>
                    <button onClick={() => handleEdit(product)}>✏️</button>
                    <button onClick={() => handleDelete(product.id)}>🗑️</button>
                  </div>
                )
              }

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Marketplace;