import React from "react";
import { useContent } from "../context/ContentContext.jsx";
import { iconFor } from "../utils/icons.js";
import Reveal from "./Reveal.jsx";

export default function WhyUs() {
  const { content } = useContent();
  const data = content.whyUs || {};
  const items = data.items || [];
  if (items.length === 0) return null;

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">{data.title}</h2>
          {data.subtitle && <p className="text-slate-500 mt-3 max-w-lg leading-relaxed">{data.subtitle}</p>}
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((a, i) => {
            const Icon = iconFor(a.icon);
            return (
              <Reveal key={a.id || i} delay={(i % 3) * 90}>
                <div className="h-full rounded-2xl bg-white border border-slate-100 p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-950/5 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-950 mt-4">{a.title}</h3>
                  <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{a.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
