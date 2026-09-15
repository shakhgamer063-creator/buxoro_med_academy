import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/**
 * Rasm va videolarni to'liq ekranda kattalashtirib ko'rsatadi.
 *
 * @param items  [{ id, src, kind: "image" | "video", caption, poster }]
 * @param index  ochiladigan elementning indeksi (null bo'lsa yopiq)
 */
export default function Lightbox({ items = [], index, onClose }) {
  const [current, setCurrent] = useState(index ?? 0);
  const open = index !== null && index !== undefined && items.length > 0;

  useEffect(() => {
    if (open) setCurrent(index);
  }, [index, open]);

  const go = useCallback(
    (step) => setCurrent((c) => (c + step + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go, onClose]);

  if (!open) return null;

  const item = items[current];
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[90] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        aria-label="Yopish"
      >
        <X className="w-5 h-5" />
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            className="absolute left-2 sm:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Oldingi"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            className="absolute right-2 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Keyingi"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <figure
        className="max-w-[92vw] max-h-[86vh] flex flex-col items-center gap-4 animate-[modalIn_0.25s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {item.kind === "video" ? (
          <video
            key={item.src}
            src={item.src}
            poster={item.poster || undefined}
            controls
            autoPlay
            playsInline
            className="max-w-[92vw] max-h-[76vh] rounded-2xl bg-black"
          />
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt={item.caption || ""}
            className="max-w-[92vw] max-h-[76vh] object-contain rounded-2xl"
          />
        )}

        {(item.caption || items.length > 1) && (
          <figcaption className="text-sm text-slate-300 text-center px-4">
            {item.caption}
            {items.length > 1 && (
              <span className="text-slate-500 ml-2 tabular-nums">
                {current + 1} / {items.length}
              </span>
            )}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
