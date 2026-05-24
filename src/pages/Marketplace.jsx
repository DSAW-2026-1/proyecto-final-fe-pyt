import { useEffect, useState } from "react";

import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct
} from "../services/productService";

import { addToCart } from "../services/cartService";
import { getProfile } from "../services/profileService";
import { addReview } from "../services/reviewService";

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

  const [reviewsData, setReviewsData] = useState({});

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
  // 🔥 VALIDAR SI COMPRÓ
  // ===============================
  const hasPurchased = (productId) => {
    return user?.purchases?.some(
      p => String(p.productId) === String(productId)
    );
  };

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

    const newTitle = prompt("Nuevo título", product.title);
    if (!newTitle) return;

    try {
      await updateProduct(product.id, {
        ...product,
        title: newTitle
      });

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
      alert("Error al agregar al carrito");
    }
  };

  // ===============================
  // ⭐ RESEÑAS
  // ===============================
  const handleReviewChange = (productId, field, value) => {

    setReviewsData(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));

  };

  const handleReviewSubmit = async (productId) => {

    const review = reviewsData[productId];

    if (!review || !review.rating) {
      return alert("Selecciona una calificación");
    }

    try {

      await addReview({
        productId,
        rating: review.rating,
        comment: review.comment
      });

      alert("Reseña enviada ⭐");

      setReviewsData(prev => ({
        ...prev,
        [productId]: { rating: "", comment: "" }
      }));

      loadProducts();

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error al enviar reseña");
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

              <hr />

              {/* ⭐ RESEÑA PROTEGIDA */}
              {
                hasPurchased(product.id) ? (

                  <>
                    <h4>Calificar</h4>

                    <select
                      value={reviewsData[product.id]?.rating || ""}
                      onChange={(e) =>
                        handleReviewChange(product.id, "rating", e.target.value)
                      }
                    >
                      <option value="">Selecciona</option>
                      <option value="5">5 ⭐</option>
                      <option value="4">4 ⭐</option>
                      <option value="3">3 ⭐</option>
                      <option value="2">2 ⭐</option>
                      <option value="1">1 ⭐</option>
                    </select>

                    <br /><br />

                    <input
                      type="text"
                      placeholder="Comentario"
                      value={reviewsData[product.id]?.comment || ""}
                      onChange={(e) =>
                        handleReviewChange(product.id, "comment", e.target.value)
                      }
                    />

                    <br /><br />

                    <button onClick={() => handleReviewSubmit(product.id)}>
                      Enviar reseña ⭐
                    </button>
                  </>

                ) : (
                  <p>⚠️ Compra este producto para poder calificar</p>
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