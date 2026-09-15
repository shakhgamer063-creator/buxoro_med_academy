import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import { ContentProvider } from "./context/ContentContext.jsx";
import "./index.css";

// Admin panel yashirin sahifa: /admin (eski /arizalar havolasi ham ishlaydi).
// Alohida router kutubxonasi kerak emas — loyihada bor-yo'g'i ikkita sahifa bor.
const path = window.location.pathname.replace(/\/+$/, "");
const isAdminRoute = path === "/admin" || path === "/arizalar";

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
