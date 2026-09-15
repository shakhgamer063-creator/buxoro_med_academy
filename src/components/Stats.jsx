import React, { useEffect, useState } from "react";
import { useContent } from "../context/ContentContext.jsx";
import { iconFor } from "../utils/icons.js";
import { useInView } from "../hooks/useInView.js";
import Reveal from "./Reveal.jsx";

function Counter({ value, suffix }) {
  const [ref, inView] = useInView(0.4);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = Number(value) || 0;
    const duration = 1200;
    const start = performance.now();
    let raf;
    const step = (t) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}{suffix}
    </span>
  );
}

export default function Stats() {
  const { content } = useContent();
  const items = content.stats?.items || [];
  if (items.length === 0) return null;

  return (
    <section className="bg-white py-14 sm:py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((s, i) => {
          const Icon = iconFor(s.icon);
          return (
            <Reveal key={s.id || i} delay={i * 80} className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-indigo-600 mb-2">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-semibold text-indigo-950">
                <Counter value={s.value} suffix={s.suffix || ""} />
              </div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
