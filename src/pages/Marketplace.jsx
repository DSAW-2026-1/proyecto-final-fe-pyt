import { useEffect, useState } from "react";

import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct
} from "../services/productService";

import { addToCart } from "../services/cartService";

function Marketplace() {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    condition: "",
    stock: "",
    image: ""
  });

  // usuario logueado
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // cargar productos
  const loadProducts = async () => {

    const data = await getProducts();

    setProducts(data);

  };

  useEffect(() => {
    loadProducts();
  }, []);

  // manejar inputs
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // crear producto
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createProduct(form);

      alert("Producto publicado ✅");

      // limpiar formulario
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

  // eliminar producto
  const handleDelete = async (id) => {

    try {

      await deleteProduct(id);

      alert("Producto eliminado ✅");

      loadProducts();

    } catch (error) {

      console.error(error);

      alert("No autorizado");

    }

  };

  // editar producto
  const handleEdit = async (product) => {

    const newTitle = prompt(
      "Nuevo título",
      product.title
    );

    if (!newTitle) return;

    try {

      await updateProduct(
        product.id,
        {
          ...product,
          title: newTitle
        }
      );

      alert("Producto actualizado ✅");

      loadProducts();

    } catch (error) {

      console.error(error);

      alert("Error al editar");

    }

  };

  // agregar al carrito
  const handleAddToCart = async (id) => {

    try {

      await addToCart(id);

      alert("Producto agregado al carrito 🛒");

    } catch (error) {

      console.error(error);

      alert("Error al agregar al carrito");

    }

  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Marketplace 🛒</h1>

      <hr />

      <h2>Publicar producto</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
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

          <option value="">
            Categoría
          </option>

          <option value="Tecnología">
            Tecnología
          </option>

          <option value="Libros">
            Libros
          </option>

          <option value="Ropa">
            Ropa
          </option>

          <option value="Accesorios">
            Accesorios
          </option>

        </select>

        <br /><br />

        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
        >

          <option value="">
            Condición
          </option>

          <option value="Nuevo">
            Nuevo
          </option>

          <option value="Usado">
            Usado
          </option>

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
          type="text"
          name="image"
          placeholder="URL de imagen"
          value={form.image}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Publicar
        </button>

      </form>

      <hr />

      <h2>Productos</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >

        {
          products.map(product => (

            <div
              key={product.id}
              style={{
                border: "1px solid gray",
                padding: "15px",
                width: "300px",
                borderRadius: "10px"
              }}
            >

              <img
                src={product.image}
                alt={product.title}
                width="250"
                style={{
                  borderRadius: "10px"
                }}
              />

              <h3>{product.title}</h3>

              <p>{product.description}</p>

              <p>
                <strong>Categoría:</strong> {product.category}
              </p>

              <p>
                <strong>Condición:</strong> {product.condition}
              </p>

              <p>
                <strong>Stock:</strong> {product.stock}
              </p>

              <strong>
                ${product.price}
              </strong>

              <br /><br />

              <button
                onClick={() =>
                  handleAddToCart(product.id)
                }
              >
                🛒 Agregar al carrito
              </button>

              <br /><br />

              {
                (
                  user?.id === product.seller ||
                  user?.role === "admin"
                ) && (

                  <div>

                    <button
                      onClick={() => handleEdit(product)}
                    >
                      ✏️ Editar
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product.id)
                      }
                      style={{
                        marginLeft: "10px"
                      }}
                    >
                      🗑️ Eliminar
                    </button>

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