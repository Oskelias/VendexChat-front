import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { HomePage } from "./pages/HomePage";
import { StorePage } from "./pages/StorePage";

export default function App() {
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1";

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLocal ? (
              <HomePage />
            ) : (
              <CartProvider>
                <StorePage />
              </CartProvider>
            )
          }
        />
        <Route
          path="/:slug"
          element={
            <CartProvider>
              <StorePage />
            </CartProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
