import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import { ContentProvider } from "./context/ContentContext.jsx";
import "./index.css";

// Admin panel yashirin sahifa: /admin (eski /arizalar havolasi ham ishlaydi).
// Alohida router kutubxonasi kerak emas — loyihada bor-yo'g'i ikkita sahifa bor.
const path = window.location.pathname.replace(/\/+$/, "");
const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
const relativePath = path.startsWith(base)
  ? path.slice(base.length) || "/"
  : path;

const isAdminRoute =
  relativePath === "/admin" ||
  relativePath === "/arizalar" ||
  window.location.hash === "#/admin" ||
  window.location.hash === "#/arizalar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isAdminRoute ? (
      <AdminPage />
    ) : (
      <ContentProvider>
        <App />
      </ContentProvider>
    )}
  </React.StrictMode>
);
