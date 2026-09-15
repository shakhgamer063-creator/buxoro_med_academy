import React from "react";
import { useContent } from "../context/ContentContext.jsx";
import BranchCard from "./BranchCard.jsx";
import Reveal from "./Reveal.jsx";

export default function Branches() {
  const { content } = useContent();
  const data = content.branches || {};
  const items = data.items || [];
  if (items.length === 0) return null;

  const main = items.find((b) => b.isMain) || items[0];

  return (
    <section id="filiallar" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">{data.title}</h2>
          {data.subtitle && <p className="text-slate-500 mt-3 max-w-lg">{data.subtitle}</p>}
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((b, i) => (
            <Reveal key={b.id || i} delay={i * 90}>
              <BranchCard b={b} />
            </Reveal>
          ))}
        </div>

        {main?.address && (
          <Reveal delay={120} className="mt-8 rounded-2xl overflow-hidden border border-slate-100">
            <iframe
              title="Xarita"
              loading="lazy"
              className="w-full h-64 sm:h-80 block"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=64.35%2C39.72%2C64.50%2C39.82&layer=mapnik`}
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
