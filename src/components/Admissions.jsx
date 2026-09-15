import React, { useMemo } from "react";
import { GraduationCap } from "lucide-react";
import { useContent } from "../context/ContentContext.jsx";
import Marquee from "./Marquee.jsx";

function AdmissionCard({ item, tinted }) {
  return (
    <article
      className={`group flex items-center gap-4 w-[19rem] sm:w-[23rem] rounded-2xl border px-4 py-3.5 transition-colors duration-300 ${
        tinted
          ? "bg-white/[0.09] border-white/[0.14] hover:bg-white/[0.14]"
          : "bg-white/[0.04] border-white/[0.09] hover:bg-white/[0.1]"
      }`}
    >
      <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400/25 to-violet-500/25 border border-white/10 flex items-center justify-center">
        <GraduationCap className="w-4.5 h-4.5 text-sky-200" style={{ width: 18, height: 18 }} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-white leading-tight truncate">{item.university}</p>
        <p className="text-[12px] text-indigo-300 truncate mt-0.5">
          {item.student}
          {item.program ? ` · ${item.program}` : ""}
        </p>
      </div>

      <div className="shrink-0 text-right">
        {item.badge && (
          <span
            className={`block text-[10px] font-semibold rounded-full px-2 py-0.5 ${
              item.badge === "Grant" ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"
            }`}
          >
            {item.badge}
          </span>
        )}
        {item.year && <span className="block text-[11px] text-indigo-400 mt-1 tabular-nums">{item.year}</span>}
      </div>
    </article>
  );
}

export default function Admissions() {
  const { content } = useContent();
  const data = content.admissions || {};
  const items = data.items || [];

  // Shaxmat doskasi tartibi: juft indekslar yuqori qatorda, toqlari pastki qatorda
  const [rowTop, rowBottom] = useMemo(() => {
    const top = items.filter((_, i) => i % 2 === 0);
    const bottom = items.filter((_, i) => i % 2 === 1);
    return [top, bottom.length ? bottom : top];
  }, [items]);

  if (items.length === 0) return null;

  const speed = Number(data.speed) || 46;

  return (
    <section id="qabul" className="relative bg-indigo-950 pb-20 sm:pb-24 overflow-hidden">
      <div className="pointer-events-none absolute -bottom-40 right-1/4 w-[30rem] h-[30rem] rounded-full bg-sky-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight max-w-xl">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-indigo-300 mt-3 max-w-lg text-sm sm:text-[15px] leading-relaxed">{data.subtitle}</p>
        )}
      </div>

      {/* Ikki qator, chapga qarab uzluksiz harakat */}
      <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4 marquee-fade">
        <Marquee
          items={rowTop}
          speed={speed}
          gap={14}
          renderItem={(item, i) => <AdmissionCard item={item} tinted={i % 2 === 0} />}
        />
        <Marquee
          items={rowBottom}
          speed={speed * 1.22}
          gap={14}
          offset={110}
          renderItem={(item, i) => <AdmissionCard item={item} tinted={i % 2 === 1} />}
        />
      </div>
    </section>
  );
}
