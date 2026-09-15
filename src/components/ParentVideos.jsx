import React, { useState } from "react";
import { Play, Quote } from "lucide-react";
import { useContent } from "../context/ContentContext.jsx";
import Reveal from "./Reveal.jsx";
import Lightbox from "./Lightbox.jsx";

function VideoCard({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-[15rem] sm:w-full shrink-0 snap-center text-left rounded-[1.4rem] overflow-hidden bg-slate-900 ring-1 ring-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-950/15 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <div className="aspect-[9/16] w-full relative">
        {item.poster ? (
          <img
            src={item.poster}
            alt={item.name || "Ota-ona videosi"}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          />
        ) : (
          <video
            src={item.src}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />

        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-14 h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Play className="w-5 h-5 text-indigo-950 translate-x-0.5" fill="currentColor" />
          </span>
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          {item.quote && (
            <p className="text-[12px] text-white/85 leading-snug line-clamp-3 mb-2">
              <Quote className="w-3 h-3 inline -mt-1 mr-1 text-amber-300" />
              {item.quote}
            </p>
          )}
          <p className="text-white font-semibold text-sm leading-tight">{item.name}</p>
          {item.role && <p className="text-white/60 text-[11px] mt-0.5">{item.role}</p>}
        </div>
      </div>
    </button>
  );
}

export default function ParentVideos() {
  const { content } = useContent();
  const data = content.parentVideos || {};
  const items = (data.items || []).filter((v) => v.src);
  const [openIdx, setOpenIdx] = useState(null);

  if (items.length === 0) return null;

  const lightboxItems = items.map((v) => ({
    id: v.id,
    src: v.src,
    poster: v.poster,
    kind: "video",
    caption: [v.name, v.role].filter(Boolean).join(" · "),
  }));

  return (
    <section id="tilaklar" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">{data.title}</h2>
          {data.subtitle && <p className="text-slate-500 mt-3 max-w-lg leading-relaxed">{data.subtitle}</p>}
        </Reveal>

        {/* Mobilda gorizontal surilish, kattaroq ekranlarda to'r */}
        <div className="mt-10 flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-5 px-5 pb-2 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
          {items.map((item, i) => (
            <Reveal key={item.id || i} delay={(i % 4) * 80} className="shrink-0 sm:shrink">
              <VideoCard item={item} onOpen={() => setOpenIdx(i)} />
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox items={lightboxItems} index={openIdx} onClose={() => setOpenIdx(null)} />
    </section>
  );
}
