import React, { useEffect, useState } from "react";
import { FileText, LayoutGrid, Loader2, Lock, LogOut, ShieldAlert, Stethoscope } from "lucide-react";
import { adminLogin, adminLogout, fetchApplications } from "../utils/api.js";
import ApplicationsPanel from "../components/admin/ApplicationsPanel.jsx";
import ContentPanel from "../components/admin/ContentPanel.jsx";

const TOKEN_KEY = "bma_admin_token";

/* ============================================================
   1) MAXSUS KOD KIRITISH EKRANI
   ============================================================ */
function CodeGate({ onAuthed }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      const token = await adminLogin(code);
      sessionStorage.setItem(TOKEN_KEY, token);
      onAuthed(token);
    } catch (err) {
      setError(err.message || "Maxsus kod noto'g'ri.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-600/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-sky-500/20 blur-3xl" />

      <form onSubmit={submit} className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6 text-indigo-600" />
        </div>
        <h1 className="text-xl font-semibold text-indigo-950 text-center mt-4">Maxsus kodni kiriting</h1>
        <p className="text-sm text-slate-500 text-center mt-1.5">Admin panelga faqat maxsus kod bilan kirish mumkin.</p>

        <input
          type="password"
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="••••••••"
          className={`mt-6 w-full rounded-xl border px-4 py-3 text-sm text-center tracking-widest bg-white transition-all duration-200 focus:outline-none focus:ring-2 ${
            error ? "border-red-300 focus:ring-red-100 focus:border-red-400" : "border-slate-200 focus:ring-indigo-200 focus:border-indigo-400"
          }`}
        />
        {error && (
          <p className="flex items-center justify-center gap-1.5 text-xs text-red-500 mt-2">
            <ShieldAlert className="w-3.5 h-3.5" /> {error}
          </p>
        )}

        <button
          disabled={loading || !code}
          className="mt-5 w-full rounded-full bg-indigo-950 text-white font-semibold py-3 flex items-center justify-center gap-2 hover:bg-indigo-900 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Tekshirilmoqda..." : "Kirish"}
        </button>
      </form>
    </div>
  );
}

/* ============================================================
   2) PANEL QOBIG'I — ikkita bo'lim: Arizalar / Sayt kontenti
   ============================================================ */
const TABS = [
  { id: "content", label: "Sayt ma'lumotlari", Icon: LayoutGrid },
  { id: "applications", label: "Arizalar", Icon: FileText },
];

function Dashboard({ token, onLogout }) {
  const [tab, setTab] = useState("content");

  const logout = async () => {
    await adminLogout(token);
    onLogout(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-indigo-950 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center shrink-0">
              <Stethoscope className="w-[18px] h-[18px] text-white" />
            </span>
            <span className="font-semibold text-white truncate">
              Buxoro Med Academy <span className="text-indigo-300 font-normal hidden sm:inline">/ Admin</span>
            </span>
          </div>
          <button
            onClick={logout}
            className="shrink-0 flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 transition-colors"
          >
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Chiqish</span>
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex gap-1 -mb-px">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-xl transition-colors ${
                tab === id ? "bg-slate-50 text-indigo-950" : "text-indigo-300 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        {tab === "content" ? (
          <ContentPanel token={token} onUnauthorized={() => onLogout(true)} />
        ) : (
          <ApplicationsPanel token={token} onUnauthorized={() => onLogout(true)} />
        )}
      </main>
    </div>
  );
}

/* ============================================================
   ASOSIY
   ============================================================ */
export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY);
    if (!saved) {
      setChecking(false);
      return;
    }
    // Saqlangan token hali kuchlimi — tekshirib olamiz
    fetchApplications(saved)
      .then(() => setToken(saved))
      .catch(() => sessionStorage.removeItem(TOKEN_KEY))
      .finally(() => setChecking(false));
  }, []);

  const handleLogout = (expired) => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    if (expired) setTimeout(() => alert("Sessiya muddati tugadi. Iltimos, qaytadan kiring."), 0);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-indigo-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      </div>
    );
  }

  if (!token) return <CodeGate onAuthed={setToken} />;

  return <Dashboard token={token} onLogout={handleLogout} />;
}
