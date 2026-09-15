import React, { useState } from "react";
import { Maximize2 } from "lucide-react";
import { useContent } from "../context/ContentContext.jsx";
import Marquee from "./Marquee.jsx";
import Reveal from "./Reveal.jsx";
import Lightbox from "./Lightbox.jsx";

function GalleryTile({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-[16rem] sm:w-[21rem] aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <img
        src={item.src}
        alt={item.caption || "Markaz hayotidan lavha"}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

      <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Maximize2 className="w-4 h-4 text-white" />
      </span>

      {item.caption && (
        <span className="absolute bottom-0 left-0 right-0 p-4 text-left text-sm text-white font-medium leading-snug">
          {item.caption}
        </span>
      )}
    </button>
  );
}

export default function Gallery() {
  const { content } = useContent();
  const data = content.gallery || {};
  const items = (data.items || []).filter((g) => g.src);
  const [openIdx, setOpenIdx] = useState(null);

  if (items.length === 0) return null;

  const lightboxItems = items.map((g) => ({ id: g.id, src: g.src, kind: "image", caption: g.caption }));
  const speed = Number(data.speed) || 55;

  return (
    <section id="lavhalar" className="bg-slate-50 py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">{data.title}</h2>
          {data.subtitle && <p className="text-slate-500 mt-3 max-w-lg leading-relaxed">{data.subtitle}</p>}
        </Reveal>
      </div>

      <div className="mt-10 marquee-fade">
        <Marquee
          items={items}
          speed={speed}
          gap={16}
          renderItem={(item, i) => <GalleryTile item={item} onOpen={() => setOpenIdx(i)} />}
        />
      </div>

      <Lightbox items={lightboxItems} index={openIdx} onClose={() => setOpenIdx(null)} />
    </section>
  );
}
