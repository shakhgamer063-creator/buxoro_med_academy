import React from "react";
import { useContent } from "../context/ContentContext.jsx";
import TeacherCard from "./TeacherCard.jsx";
import Reveal from "./Reveal.jsx";

export default function Teachers() {
  const { content } = useContent();
  const data = content.teachers || {};
  const items = data.items || [];
  if (items.length === 0) return null;

  return (
    <section id="ustozlar" className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">{data.title}</h2>
          {data.subtitle && <p className="text-slate-500 mt-3 max-w-lg leading-relaxed">{data.subtitle}</p>}
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((t, i) => (
            <Reveal key={t.id || i} delay={(i % 4) * 80}>
              <TeacherCard t={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
