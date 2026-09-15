import React, { useMemo } from "react";

/**
 * Chap tomonga uzluksiz suriluvchi qator.
 *
 * Ishlash printsipi: bolalar ro'yxati ikki marta chiziladi va butun tasma
 * -50% ga suriladi. Ikkinchi nusxa birinchisining o'rniga kelganda animatsiya
 * qaytadan boshlanadi — natijada uzilishsiz aylanma harakat hosil bo'ladi.
 *
 * `offset` — ikkinchi qatorni shaxmat doskasidek yarim karta surish uchun.
 */
export default function Marquee({
  items = [],
  renderItem,
  speed = 45,
  gap = 16,
  offset = 0,
  reverse = false,
  className = "",
}) {
  const doubled = useMemo(() => [...items, ...items], [items]);
  if (items.length === 0) return null;

  return (
    <div className={`marquee ${className}`}>
      <div
        className="marquee__track"
        style={{
          "--marquee-gap": `${gap}px`,
          gap: `${gap}px`,
          paddingLeft: offset ? `${offset}px` : undefined,
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((item, i) => (
          <div key={`${item.id ?? i}-${i}`} className="marquee__item" aria-hidden={i >= items.length}>
            {renderItem(item, i % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
