import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{
      background: "#0B3C6D",
      color: "white",
      padding: "10px 20px"
    }}>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "1200px",
        margin: "auto"
      }}>

        {/* LOGO */}
        <div style={{
          fontWeight: "bold",
          fontSize: "20px"
        }}>
          Mercado Sabana
        </div>

        {/* BUSCADOR */}
        {
          token && (
            <input
              type="text"
              placeholder="Buscar productos..."
              style={{
                width: "300px",
                padding: "6px 10px",
                borderRadius: "6px",
                border: "none",
                outline: "none"
              }}
            />
          )
        }

        {/* LINKS */}
        <div style={{
          display: "flex",
          gap: "15px",
          alignItems: "center"
        }}>

          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>

          {
            token && (
              <>
                <Link to="/marketplace" style={{ color: "white", textDecoration: "none" }}>
                  Marketplace
                </Link>

                <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
                  🛒
                </Link>

                <Link to="/purchases" style={{ color: "white", textDecoration: "none" }}>
                  Compras
                </Link>

                <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
                  Perfil
                </Link>

                {/* LOGOUT */}
                <button
                  onClick={logout}
                  style={{
                    background: "#C9A646",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Logout
                </button>
              </>
            )
          }

          {
            !token && (
              <>
                <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                  Login
                </Link>

                <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
                  Register
                </Link>
              </>
            )
          }

        </div>

      </div>

    </nav>
  );
}

export default Navbar;