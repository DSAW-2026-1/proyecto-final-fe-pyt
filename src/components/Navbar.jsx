import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid gray",
        alignItems: "center"
      }}
    >

      <Link to="/">
        Home
      </Link>

      {
        token && (
          <>
            <Link to="/marketplace">
              Marketplace
            </Link>

            <Link to="/profile">
              Perfil
            </Link>

            <Link to="/cart">
              Carrito
            </Link>
          </>
        )
      }

      {
        !token && (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )
      }

      {
        token && (
          <button onClick={logout}>
            Logout
          </button>
        )
      }

    </nav>
  );
}

export default Navbar;