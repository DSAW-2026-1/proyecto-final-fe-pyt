import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* LOGO / NOMBRE */}
      <div style={{ fontWeight: "bold", fontSize: "18px" }}>
        Marketplace Sabana
      </div>

      {/* LINKS */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

        <Link to="/">Home</Link>

        {
          token && (
            <>
              <Link to="/marketplace">Marketplace</Link>
              <Link to="/profile">Perfil</Link>
              <Link to="/cart">Carrito</Link>
              <Link to="/purchases">Compras</Link>
            </>
          )
        }

        {
          !token && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )
        }

      </div>

      {/* BOTÓN LOGOUT */}
      {
        token && (
          <button
            onClick={logout}
            style={{
              background: "white",
              color: "#003366",
              border: "none",
              padding: "6px 12px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        )
      }

    </nav>
  );
}

export default Navbar;