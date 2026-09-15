import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Clock, Loader2, MapPin, Phone, RefreshCw, Search, Trash2, XCircle } from "lucide-react";
import { deleteApplication, fetchApplications, updateApplicationStatus } from "../../utils/api.js";

const STATUS_META = {
  new: { label: "Yangi", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  contacted: { label: "Bog'lanildi", badge: "bg-blue-50 text-blue-700 border-blue-200" },
  accepted: { label: "Qabul qilindi", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  cancelled: { label: "Bekor qilindi", badge: "bg-red-50 text-red-700 border-red-200" },
};
const STATUS_ORDER = ["new", "contacted", "accepted", "cancelled"];

const FILTERS = [
  { id: "all", label: "Barchasi" },
  ...STATUS_ORDER.map((s) => ({ id: s, label: STATUS_META[s].label })),
];

function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat("uz-UZ", {
      day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function StatBlock({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <div className="text-2xl sm:text-3xl font-semibold text-indigo-950 tabular-nums">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}

function StatusSelect({ status, onChange, disabled }) {
  const meta = STATUS_META[status] || STATUS_META.new;
  return (
    <select
      value={status}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`text-xs font-medium rounded-full border px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60 ${meta.badge}`}
    >
      {STATUS_ORDER.map((s) => (
        <option key={s} value={s}>{STATUS_META[s].label}</option>
      ))}
    </select>
  );
}

export default function ApplicationsPanel({ token, onUnauthorized }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setApplications(await fetchApplications(token));
    } catch (err) {
      if (err.status === 401) return onUnauthorized();
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, onUnauthorized]);

  useEffect(() => { load(); }, [load]);

  const stats = useMemo(() => {
    const byStatus = { new: 0, contacted: 0, accepted: 0, cancelled: 0 };
    applications.forEach((a) => { if (byStatus[a.status] !== undefined) byStatus[a.status] += 1; });
    return { total: applications.length, ...byStatus };
  }, [applications]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return applications.filter((a) => {
      const matchesFilter = filter === "all" || a.status === filter;
      const matchesQuery =
        !q || a.fullName.toLowerCase().includes(q) || a.phone.replace(/\s+/g, "").includes(q.replace(/\s+/g, ""));
      return matchesFilter && matchesQuery;
    });
  }, [applications, filter, query]);

  const changeStatus = async (id, status) => {
    setBusyId(id);
    const prev = applications;
    setApplications((apps) => apps.map((a) => (a.id === id ? { ...a, status } : a)));
    try {
      await updateApplicationStatus(token, id, status);
    } catch (err) {
      setApplications(prev);
      if (err.status === 401) onUnauthorized();
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Bu ariza butunlay o'chiriladi. Davom etasizmi?")) return;
    setBusyId(id);
    try {
      await deleteApplication(token, id);
      setApplications((apps) => apps.filter((a) => a.id !== id));
    } catch (err) {
      if (err.status === 401) onUnauthorized();
      else setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatBlock label="Jami arizalar" value={stats.total} />
        <StatBlock label="Yangi" value={stats.new} />
        <StatBlock label="Bog'lanildi" value={stats.contacted} />
        <StatBlock label="Qabul qilindi" value={stats.accepted} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ism yoki telefon bo'yicha qidirish..."
            className="w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-row flex-nowrap gap-2 overflow-x-auto no-scrollbar">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f.id ? "bg-indigo-950 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            onClick={load}
            className="shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-indigo-300 flex items-center justify-center text-slate-500"
            title="Yangilash"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 mb-6 flex items-center gap-2">
          <XCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24 text-slate-400 gap-2">
          <Loader2 className="w-5 h-5 animate-spin" /> Yuklanmoqda...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-slate-400 text-sm">Hech qanday ariza topilmadi.</div>
      ) : (
        <>
          {/* Katta ekran: jadval */}
          <div className="hidden md:block rounded-2xl border border-slate-100 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-slate-500 text-xs uppercase tracking-wide">
                  <th className="px-5 py-3 font-medium">Ism</th>
                  <th className="px-5 py-3 font-medium">Telefon</th>
                  <th className="px-5 py-3 font-medium">Yosh</th>
                  <th className="px-5 py-3 font-medium">Yo'nalish / Daraja</th>
                  <th className="px-5 py-3 font-medium">Filial</th>
                  <th className="px-5 py-3 font-medium">Vaqt</th>
                  <th className="px-5 py-3 font-medium">Sana</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-t border-slate-100 hover:bg-slate-50/60 transition-colors align-top">
                    <td className="px-5 py-4 font-medium text-indigo-950">{a.fullName}</td>
                    <td className="px-5 py-4">
                      <a href={`tel:${a.phone}`} className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-700">
                        <Phone className="w-3.5 h-3.5" /> {a.phone}
                      </a>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{a.age}</td>
                    <td className="px-5 py-4 text-slate-600">
                      <div className="font-medium text-indigo-950">{a.course}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{a.level}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {a.branch}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> {a.preferredTime}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">{formatDate(a.createdAt)}</td>
                    <td className="px-5 py-4">
                      <StatusSelect status={a.status} disabled={busyId === a.id} onChange={(s) => changeStatus(a.id, s)} />
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => remove(a.id)}
                        className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors"
                        aria-label="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobil: kartalar */}
          <div className="md:hidden space-y-4">
            {filtered.map((a) => (
              <div key={a.id} className="rounded-2xl border border-slate-100 bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold text-indigo-950 truncate">{a.fullName}</div>
                    <a href={`tel:${a.phone}`} className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                      <Phone className="w-3.5 h-3.5" /> {a.phone}
                    </a>
                  </div>
                  <StatusSelect status={a.status} disabled={busyId === a.id} onChange={(s) => changeStatus(a.id, s)} />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                  <div><div className="text-xs text-slate-400">Yosh</div><div className="text-slate-700">{a.age}</div></div>
                  <div><div className="text-xs text-slate-400">Daraja</div><div className="text-slate-700">{a.level}</div></div>
                  <div className="col-span-2"><div className="text-xs text-slate-400">Yo'nalish</div><div className="text-slate-700 font-medium">{a.course}</div></div>
                  <div><div className="text-xs text-slate-400">Filial</div><div className="text-slate-700">{a.branch}</div></div>
                  <div><div className="text-xs text-slate-400">Qulay vaqt</div><div className="text-slate-700">{a.preferredTime}</div></div>
                </div>

                {a.message && (
                  <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-600">
                    <div className="text-xs text-slate-400 mb-1">Izoh</div>
                    {a.message}
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{formatDate(a.createdAt)}</span>
                  <button onClick={() => remove(a.id)} className="text-xs text-red-500 flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" /> O'chirish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
