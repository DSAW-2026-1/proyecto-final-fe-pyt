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

    // 🔥 VALIDACIÓN FRONTEND
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

    // 🔥 EDICIÓN COMPLETA
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
      alert("Producto agregado al carrito 🛒");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error");
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div style={{ padding: "20px" }}>

      <h1>Marketplace 🛒</h1>

      <hr />

      {/* FORM SOLO VENDEDORES */}
      {
        user?.isSeller ? (

          <>
            <h2>Publicar producto</h2>

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

              <button type="submit">Publicar</button>

            </form>
          </>

        ) : (
          <h2>⚠️ Debes ser vendedor</h2>
        )
      }

      <hr />

      <h2>Productos</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>

        {
          products.map(product => (

            <div key={product.id} style={{ border: "1px solid gray", padding: 15, width: 300 }}>

              <img src={product.image} alt={product.title} width="250" />

              <h3>{product.title}</h3>
              <p>{product.description}</p>

              <p>Stock: {product.stock}</p>
              <strong>${product.price}</strong>

              {/* INFO VENDEDOR */}
              <p>Vendedor: {product.sellerInfo?.name}</p>
              <p>
                Rating: {
                  product.sellerInfo?.rating === "Nuevo"
                    ? "Nuevo vendedor"
                    : product.sellerInfo?.rating + " ⭐"
                }
              </p>
              <p>Contacto: {product.sellerInfo?.email}</p>

              <br />

              <button onClick={() => handleAddToCart(product.id)}>
                🛒 Carrito
              </button>

              {/* EDITAR / ELIMINAR */}
              {
                (user?.id === product.seller || user?.role === "admin") && (
                  <>
                    <button onClick={() => handleEdit(product)}>✏️</button>
                    <button onClick={() => handleDelete(product.id)}>🗑️</button>
                  </>
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