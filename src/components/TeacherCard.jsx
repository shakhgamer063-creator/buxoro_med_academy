import React from "react";

export default function TeacherCard({ t }) {
  const initials = (t.name || "").split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("");
  return (
    <div className="h-full rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-lg hover:shadow-indigo-950/5 hover:-translate-y-1 transition-all duration-300">
      {t.photo ? (
        <img
          src={t.photo}
          alt={t.name}
          loading="lazy"
          className="w-16 h-16 rounded-2xl object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-sky-100 flex items-center justify-center text-indigo-700 font-semibold text-xl">
          {initials}
        </div>
      )}
      <h3 className="font-semibold text-indigo-950 mt-4">{t.name}</h3>
      {t.subject && <p className="text-sm text-indigo-600 font-medium">{t.subject}</p>}
      {(t.exp || t.cert) && (
        <p className="text-xs text-slate-400 mt-2">{[t.exp, t.cert].filter(Boolean).join(" · ")}</p>
      )}
      {t.bio && <p className="text-sm text-slate-500 mt-3 leading-relaxed">{t.bio}</p>}
    </div>
  );
}
