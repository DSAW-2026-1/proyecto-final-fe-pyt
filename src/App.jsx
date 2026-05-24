import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";

import Navbar from "./components/Navbar";

import PrivateRoute from "./routes/PrivateRoute";

import Purchases from "./pages/Purchases";

<Route path="/purchases" element={<Purchases />} />

function App() {
  return (
    <BrowserRouter>

      {/* Navbar */}
      <Navbar />

      <Routes>

        {/* Home protegida */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Marketplace protegido */}
        <Route
          path="/marketplace"
          element={
            <PrivateRoute>
              <Marketplace />
            </PrivateRoute>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Profile protegido */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Cart protegido */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;