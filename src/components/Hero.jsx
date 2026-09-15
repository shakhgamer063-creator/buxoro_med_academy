import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useContent } from "../context/ContentContext.jsx";
import { iconFor } from "../utils/icons.js";
import { scrollToId } from "../utils/scroll.js";

export default function Hero({ onRegisterClick }) {
  const { content } = useContent();
  const hero = content.hero || {};

  return (
    <section id="hero" className="relative overflow-hidden bg-indigo-950 pt-28 pb-16 sm:pt-36 sm:pb-20">
      {/* Yumshoq rangli dog'lar */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-600/30 blur-3xl" />
      <div className="pointer-events-none absolute top-24 left-0 w-72 h-72 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.16]" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative text-center">
        {hero.badge && (
          <div className="animate-hero-in inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3.5 py-1.5 text-xs font-medium text-indigo-100 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {hero.badge}
          </div>
        )}

        <h1
          className="animate-hero-in text-[2rem] sm:text-5xl lg:text-[3.4rem] leading-[1.1] font-semibold text-white tracking-tight"
          style={{ animationDelay: "80ms" }}
        >
          {hero.title}
        </h1>

        <p
          className="animate-hero-in mt-6 text-base sm:text-lg text-indigo-200 max-w-xl mx-auto leading-relaxed"
          style={{ animationDelay: "160ms" }}
        >
          {hero.subtitle}
        </p>

        <div className="animate-hero-in mt-9 flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3" style={{ animationDelay: "240ms" }}>
          <button
            onClick={onRegisterClick}
            className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 font-semibold px-6 py-3.5 flex items-center justify-center gap-2 hover:brightness-105 hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-lg shadow-amber-500/20"
          >
            {hero.primaryCta} <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollToId("kurslar")}
            className="rounded-full bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 hover:bg-white/15 hover:scale-[1.03] active:scale-95 transition-all duration-200"
          >
            {hero.secondaryCta}
          </button>
        </div>

        <div
          className="animate-hero-in mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3"
          style={{ animationDelay: "320ms" }}
        >
          {(hero.trust || []).map((t, i) => {
            const Icon = iconFor(t.icon);
            return (
              <div key={t.id || i} className="flex items-center gap-2 text-indigo-200 text-sm">
                <Icon className="w-4 h-4 text-amber-400" /> {t.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Yurak urishi chizig'i — bo'limni pastdagi bo'limga ulab turadi */}
      <div className="relative mt-12 sm:mt-14" aria-hidden="true">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
          <path
            className="ecg-line"
            d="M0,30 L180,30 L200,30 L212,10 L226,50 L240,22 L252,30 L420,30 L440,30 L452,10 L466,50 L480,22 L492,30 L660,30 L680,30 L692,10 L706,50 L720,22 L732,30 L900,30 L920,30 L932,10 L946,50 L960,22 L972,30 L1200,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  );
}
