import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Purchases from "./pages/Purchases";
import PublicProfile from "./pages/PublicProfile"; // ✅ NUEVO
import Chat from "./pages/Chat"; // ✅ NUEVO

import Navbar from "./components/Navbar";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>

      {/* Navbar solo cuando hay sesión */}
      {
        localStorage.getItem("token") && <Navbar />
      }

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* MARKETPLACE */}
        <Route
          path="/marketplace"
          element={
            <PrivateRoute>
              <Marketplace />
            </PrivateRoute>
          }
        />

        {/* COMPRAS */}
        <Route
          path="/purchases"
          element={
            <PrivateRoute>
              <Purchases />
            </PrivateRoute>
          }
        />

        {/* PERFIL PRIVADO */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* PERFIL PÚBLICO (🔥 NUEVO) */}
        <Route
          path="/seller/:id"
          element={<PublicProfile />}
        />

        {/* CARRITO */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* CHAT (🔥 NUEVO) */}
        <Route
          path="/chat/:id"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* REGISTER */}
        <Route path="/register" element={<Register />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;