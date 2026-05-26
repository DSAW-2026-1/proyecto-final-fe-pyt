import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";
import Cart from "./pages/Cart";
import Purchases from "./pages/Purchases";

// COMPONENTS
import Navbar from "./components/Navbar";

// ROUTES
import PrivateRoute from "./routes/PrivateRoute";

function App() {

  return (

    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar />

      <Routes>

        {/* ================= HOME ================= */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* ================= MARKETPLACE ================= */}
        <Route
          path="/marketplace"
          element={
            <PrivateRoute>
              <Marketplace />
            </PrivateRoute>
          }
        />

        {/* ================= PERFIL PRIVADO ================= */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* ================= PERFIL PÚBLICO ================= */}
        <Route
          path="/seller/:id"
          element={
            <PrivateRoute>
              <PublicProfile />
            </PrivateRoute>
          }
        />

        {/* ================= CARRITO ================= */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* ================= COMPRAS ================= */}
        <Route
          path="/purchases"
          element={
            <PrivateRoute>
              <Purchases />
            </PrivateRoute>
          }
        />

        {/* ================= LOGIN ================= */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* ================= REGISTER ================= */}
        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;