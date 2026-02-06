import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { HomePage } from "./pages/HomePage";
import { StorePage } from "./pages/StorePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
