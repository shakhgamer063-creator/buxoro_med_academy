import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_CONTENT } from "../data/defaultContent.js";
import { fetchContent } from "../utils/api.js";

const ContentContext = createContext({ content: DEFAULT_CONTENT, loading: true });

/**
 * Default qiymatlar ustiga serverdan kelgan qiymatlarni qo'yadi.
 * Massivlar butunlay almashtiriladi (admin panel to'liq ro'yxat yuboradi),
 * obyektlar esa maydon-maydon birlashtiriladi — shunda saytga yangi maydon
 * qo'shilsa, eski content.json bilan ham sayt buzilmaydi.
 */
export function mergeContent(base, override) {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base) || Array.isArray(override)) return override;
  if (typeof base !== "object" || typeof override !== "object") return override;

  const out = { ...base };
  for (const key of Object.keys(override)) {
    out[key] = key in base ? mergeContent(base[key], override[key]) : override[key];
  }
  return out;
}

export function ContentProvider({ children }) {
  const [saved, setSaved] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchContent()
      .then((c) => alive && setSaved(c))
      .catch(() => {
        // Server ishlamayapti — sayt default ma'lumotlar bilan ochilaveradi.
      })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  const value = useMemo(
    () => ({ content: mergeContent(DEFAULT_CONTENT, saved), loading }),
    [saved, loading]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

/** Saytning istalgan joyida: const { content } = useContent(); */
export function useContent() {
  return useContext(ContentContext);
}
