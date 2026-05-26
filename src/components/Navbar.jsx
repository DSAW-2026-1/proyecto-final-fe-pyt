import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ===============================
  // LOGOUT
  // ===============================
  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <nav style={{
      background: "linear-gradient(90deg, #0B3C6D, #1E5A96)",
      color: "white",
      padding: "15px 25px",
      boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "1400px",
        margin: "auto",
        gap: "20px"
      }}>

        {/* ===============================
            LOGO
        =============================== */}
        <div
          onClick={() => navigate("/marketplace")}
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            cursor: "pointer",
            whiteSpace: "nowrap"
          }}
        >
          Mercado Sabana 🛒
        </div>

        {/* ===============================
            BUSCADOR
        =============================== */}
        {
          token && (

            <input
              type="text"
              placeholder="Buscar productos..."
              style={{
                flex: 1,
                maxWidth: "450px",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "none",
                outline: "none",
                fontSize: "15px"
              }}
            />

          )
        }

        {/* ===============================
            LINKS
        =============================== */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap"
        }}>

          {/* HOME */}
          <NavItem to="/">
            🏠 Home
          </NavItem>

          {
            token ? (

              <>

                {/* MARKETPLACE */}
                <NavItem to="/marketplace">
                  🛍️ Marketplace
                </NavItem>

                {/* CHAT */}
                <NavItem to="/chat">
                  💬 Mensajes
                </NavItem>

                {/* CARRITO */}
                <NavItem to="/cart">
                  🛒 Carrito
                </NavItem>

                {/* COMPRAS */}
                <NavItem to="/purchases">
                  📦 Compras
                </NavItem>

                {/* PERFIL */}
                <NavItem to="/profile">
                  👤 Perfil
                </NavItem>

                {/* LOGOUT */}
                <button
                  onClick={logout}
                  style={{
                    background: "#C9A646",
                    color: "white",
                    border: "none",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "0.2s"
                  }}
                >
                  Logout
                </button>

              </>

            ) : (

              <>

                {/* LOGIN */}
                <NavItem to="/login">
                  Login
                </NavItem>

                {/* REGISTER */}
                <NavItem to="/register">
                  Register
                </NavItem>

              </>

            )
          }

        </div>

      </div>

    </nav>

  );

}

// ===============================
// COMPONENTE LINK
// ===============================
function NavItem({ to, children }) {

  return (

    <Link
      to={to}
      style={{
        color: "white",
        textDecoration: "none",
        fontWeight: "500",
        transition: "0.2s"
      }}
    >
      {children}
    </Link>

  );

}

export default Navbar;