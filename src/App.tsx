import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ShopPage from "./shop/pages/ShopPage";
import { CartProvider } from "./context/CartContext";

const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const DemoPage = lazy(() => import("./pages/DemoPage"));
const TermsPage = lazy(() => import("./pages/legal/TermsPage"));
const PrivacyPage = lazy(() => import("./pages/legal/PrivacyPage"));

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Landing Page en la raíz */}
          <Route path="/" element={<Suspense fallback={null}><HomePage /></Suspense>} />

          {/* Demo page */}
          <Route path="/demo" element={<Suspense fallback={null}><DemoPage /></Suspense>} />

          {/* Rutas reservadas que no deben ser capturadas por el shop */}
          <Route path="/admin" element={<div className="p-10 font-bold">Admin Panel (Separated deployment)</div>} />
          <Route path="/admin/*" element={<div className="p-10 font-bold">Admin Panel (Separated deployment)</div>} />
          <Route path="/api/*" element={<div>API Endpoint</div>} />

          {/* Páginas legales */}
          <Route path="/terms" element={<Suspense fallback={null}><TermsPage /></Suspense>} />
          <Route path="/privacy" element={<Suspense fallback={null}><PrivacyPage /></Suspense>} />

          {/* Tienda dinámica en cualquier slug */}
          <Route path="/:slug" element={<ShopPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
