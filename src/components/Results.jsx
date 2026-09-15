import React, { useMemo, useState } from "react";
import { useContent } from "../context/ContentContext.jsx";
import ResultCard from "./ResultCard.jsx";
import Reveal from "./Reveal.jsx";

export default function Results() {
  const { content } = useContent();
  const data = content.results || {};
  const items = data.items || [];
  const [filter, setFilter] = useState("Barchasi");

  // Filtrlar ro'yxatini natijalarning o'zidan hosil qilamiz —
  // admin yangi fan qo'shsa, filtr avtomatik paydo bo'ladi.
  const filters = useMemo(() => {
    const types = [...new Set(items.map((r) => r.type).filter(Boolean))];
    return ["Barchasi", ...types];
  }, [items]);

  const filtered = useMemo(
    () => (filter === "Barchasi" ? items : items.filter((r) => r.type === filter)),
    [items, filter]
  );

  if (items.length === 0) return null;

  return (
    <section id="natijalar" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">{data.title}</h2>
          {data.subtitle && <p className="text-slate-500 mt-3 max-w-lg leading-relaxed">{data.subtitle}</p>}
        </Reveal>

        {filters.length > 2 && (
          <Reveal delay={80} className="mt-6 flex flex-row flex-nowrap gap-2 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  filter === f
                    ? "bg-indigo-950 text-white shadow-md shadow-indigo-950/20"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-700"
                }`}
              >
                {f}
              </button>
            ))}
          </Reveal>
        )}

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r, i) => (
            <Reveal key={r.id || i} delay={(i % 3) * 90}>
              <ResultCard r={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
