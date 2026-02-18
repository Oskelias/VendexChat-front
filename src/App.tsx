import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { StorePage } from "./pages/StorePage";
import { CartProvider } from "./context/CartContext";

export default function App() {
  console.log("[App] Rendering. Path:", window.location.pathname);
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Landing Page en la raíz */}
          <Route path="/" element={<HomePage />} />

          {/* Tienda dinámica en cualquier slug */}
          <Route path="/:slug" element={<StorePage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
