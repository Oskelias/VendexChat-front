import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import ShopPage from "./shop/pages/ShopPage";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Landing Page en la raíz */}
          <Route path="/" element={<HomePage />} />

          {/* Rutas reservadas que no deben ser capturadas por el shop */}
          <Route path="/admin" element={<div className="p-10 font-bold">Admin Panel (Separated deployment)</div>} />
          <Route path="/admin/*" element={<div className="p-10 font-bold">Admin Panel (Separated deployment)</div>} />
          <Route path="/sa" element={<div className="p-10 font-bold">Superadmin Panel</div>} />
          <Route path="/sa/*" element={<div className="p-10 font-bold">Superadmin Panel</div>} />
          <Route path="/api/*" element={<div>API Endpoint</div>} />

          {/* Tienda dinámica en cualquier slug */}
          <Route path="/:slug" element={<ShopPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
