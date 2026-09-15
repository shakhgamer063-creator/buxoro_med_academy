import React from "react";
import { useContent } from "../context/ContentContext.jsx";
import Reveal from "./Reveal.jsx";

export default function Process() {
  const { content } = useContent();
  const data = content.process || {};
  const items = data.items || [];
  if (items.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight text-center">{data.title}</h2>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-5 left-[12%] right-[12%] h-px bg-slate-200" />
          {items.map((s, i) => (
            <Reveal key={s.id || i} delay={i * 100} className="relative text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-indigo-950 text-white flex items-center justify-center font-semibold text-sm mx-auto sm:mx-0 relative z-10">
                {i + 1}
              </div>
              <h3 className="font-semibold text-indigo-950 mt-4">{s.title}</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
