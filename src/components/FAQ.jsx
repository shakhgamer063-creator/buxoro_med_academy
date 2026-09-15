import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useContent } from "../context/ContentContext.jsx";
import Reveal from "./Reveal.jsx";

function FAQItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-slate-100 py-5 last:border-0">
      <button onClick={onToggle} className="w-full flex items-center justify-between text-left gap-4" aria-expanded={open}>
        <span className="font-medium text-indigo-950">{item.q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className="grid transition-[grid-template-rows] duration-300 ease-in-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="text-sm text-slate-500 mt-3 leading-relaxed sm:pr-8">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { content } = useContent();
  const data = content.faq || {};
  const items = data.items || [];
  const [openIdx, setOpenIdx] = useState(0);
  if (items.length === 0) return null;

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight text-center">{data.title}</h2>
        </Reveal>
        <Reveal delay={100} className="mt-10 bg-white rounded-3xl border border-slate-100 px-6 sm:px-8 py-1">
          {items.map((f, i) => (
            <FAQItem key={f.id || i} item={f} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
