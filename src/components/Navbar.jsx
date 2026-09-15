import React, { useEffect, useState } from "react";
import { Menu, Stethoscope, X } from "lucide-react";
import { useContent } from "../context/ContentContext.jsx";
import { scrollToId } from "../utils/scroll.js";

export default function Navbar({ links = [], onRegisterClick }) {
  const { content } = useContent();
  const site = content.site || {};
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil menyu ochiq bo'lsa fon scrollini bloklaymiz
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const linkColor = scrolled ? "text-slate-600 hover:text-indigo-700" : "text-indigo-100 hover:text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md shadow-indigo-950/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollToId("hero"); }}
          className="flex items-center gap-2.5 shrink-0 group min-w-0"
        >
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
            <Stethoscope className="w-[18px] h-[18px] text-white" />
          </span>
          <span className={`font-semibold text-[15px] sm:text-lg tracking-tight truncate ${scrolled ? "text-indigo-950" : "text-white"}`}>
            {site.name}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}
              className={`relative text-sm font-medium transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full ${linkColor}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={onRegisterClick}
            className={`rounded-full text-sm font-semibold px-5 py-2.5 transition-all duration-200 hover:scale-[1.04] active:scale-95 ${
              scrolled ? "bg-indigo-950 text-white hover:bg-indigo-900" : "bg-white text-indigo-950 hover:bg-indigo-50"
            }`}
          >
            Qabulga yozilish
          </button>
        </div>

        <button
          className={`lg:hidden p-2 relative z-10 ${scrolled || open ? "text-indigo-950" : "text-white"}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menyu"
          aria-expanded={open}
        >
          <span className="relative w-6 h-6 block">
            <Menu className={`w-6 h-6 absolute inset-0 transition-all duration-200 ${open ? "opacity-0 rotate-90 scale-75" : "opacity-100"}`} />
            <X className={`w-6 h-6 absolute inset-0 transition-all duration-200 ${open ? "opacity-100" : "opacity-0 -rotate-90 scale-75"}`} />
          </span>
        </button>
      </div>

      {/* Mobil menyu */}
      <div
        className={`lg:hidden overflow-hidden bg-white border-t border-slate-100 shadow-lg transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-4 space-y-1">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); scrollToId(l.id); setOpen(false); }}
              className="block py-2.5 text-slate-700 font-medium border-b border-slate-50 last:border-0 transition-all duration-300"
              style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { onRegisterClick(); setOpen(false); }}
            className="w-full mt-3 rounded-full bg-indigo-950 text-white text-sm font-semibold px-5 py-3 active:scale-95 transition-transform"
          >
            Qabulga yozilish
          </button>
        </div>
      </div>
    </header>
  );
}
