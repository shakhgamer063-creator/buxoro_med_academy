import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDown, ArrowUp, Check, ChevronDown, Loader2, Plus, RotateCcw, Save, Trash2, TriangleAlert,
} from "lucide-react";
import { CONTENT_SECTIONS } from "../../data/contentSchema.js";
import { DEFAULT_CONTENT } from "../../data/defaultContent.js";
import { mergeContent } from "../../context/ContentContext.jsx";
import { fetchContent, saveContent } from "../../utils/api.js";
import FieldInput from "./FieldInput.jsx";

function newId() {
  return `i${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/* ============================================================
   Ro'yxat elementi (masalan bitta talaba, bitta video)
   ============================================================ */
function ListItemEditor({ token, listSchema, item, index, total, expanded, onToggle, onChange, onMove, onRemove }) {
  const title = item[listSchema.titleField] || `${listSchema.label} #${index + 1}`;
  const subtitle = listSchema.subtitleField ? item[listSchema.subtitleField] : "";
  const media = listSchema.mediaField ? item[listSchema.mediaField] : "";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        {listSchema.mediaField && (
          <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
            {media ? (
              listSchema.mediaKind === "video" ? (
                <video src={media} muted preload="metadata" className="w-full h-full object-cover" />
              ) : (
                <img src={media} alt="" className="w-full h-full object-cover" />
              )
            ) : null}
          </div>
        )}

        <button onClick={onToggle} className="flex-1 min-w-0 text-left">
          <div className="text-sm font-medium text-indigo-950 truncate">{title || "(nomsiz)"}</div>
          {subtitle && <div className="text-xs text-slate-400 truncate mt-0.5">{subtitle}</div>}
        </button>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 flex items-center justify-center disabled:opacity-30"
            aria-label="Yuqoriga"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 flex items-center justify-center disabled:opacity-30"
            aria-label="Pastga"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={onRemove}
            className="w-8 h-8 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"
            aria-label="O'chirish"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={onToggle} className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 flex items-center justify-center" aria-label="Ochish">
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-5 pt-1 border-t border-slate-100 grid sm:grid-cols-2 gap-4">
          {listSchema.fields.map((f) => (
            <div key={f.key} className={f.type === "textarea" || f.type === "tags" || f.type === "image" || f.type === "video" ? "sm:col-span-2" : ""}>
              <FieldInput token={token} field={f} value={item[f.key]} onChange={(v) => onChange(f.key, v)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Bitta bo'lim muharriri
   ============================================================ */
function SectionEditor({ token, section, data, onChange }) {
  const [expandedId, setExpandedId] = useState(null);
  const list = section.list;
  const items = list ? data?.[list.key] || [] : [];

  const setField = (key, value) => onChange({ ...data, [key]: value });

  const setItems = (next) => onChange({ ...data, [list.key]: next });

  const updateItem = (id, key, value) =>
    setItems(items.map((it) => (it.id === id ? { ...it, [key]: value } : it)));

  const addItem = () => {
    const created = { id: newId(), ...structuredClone(list.newItem) };
    setItems([...items, created]);
    setExpandedId(created.id);
  };

  const removeItem = (id) => {
    if (!window.confirm("Bu yozuv o'chiriladi. Davom etasizmi?")) return;
    setItems(items.filter((it) => it.id !== id));
  };

  const moveItem = (index, step) => {
    const next = [...items];
    const target = index + step;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  };

  return (
    <div className="space-y-6">
      {section.fields?.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 grid sm:grid-cols-2 gap-4">
          {section.fields.map((f) => (
            <div key={f.key} className={f.type === "textarea" || f.type === "tags" ? "sm:col-span-2" : ""}>
              <FieldInput token={token} field={f} value={data?.[f.key]} onChange={(v) => setField(f.key, v)} />
            </div>
          ))}
        </div>
      )}

      {list && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-indigo-950">
              {list.label} <span className="text-slate-400 font-normal text-sm">({items.length})</span>
            </h3>
            <button
              onClick={addItem}
              className="rounded-full bg-indigo-600 text-white text-sm font-medium px-4 py-2 flex items-center gap-1.5 hover:bg-indigo-700 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" /> {list.addLabel || "Qo'shish"}
            </button>
          </div>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center text-sm text-slate-400">
              Hali yozuv yo'q. Yuqoridagi tugma orqali birinchisini qo'shing.
            </div>
          ) : (
            <div className="space-y-2.5">
              {items.map((item, i) => (
                <ListItemEditor
                  key={item.id || i}
                  token={token}
                  listSchema={list}
                  item={item}
                  index={i}
                  total={items.length}
                  expanded={expandedId === item.id}
                  onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  onChange={(k, v) => updateItem(item.id, k, v)}
                  onMove={(step) => moveItem(i, step)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Asosiy panel
   ============================================================ */
export default function ContentPanel({ token, onUnauthorized }) {
  const [draft, setDraft] = useState(null);
  const [savedSnapshot, setSavedSnapshot] = useState(null);
  const [activeKey, setActiveKey] = useState(CONTENT_SECTIONS[0].key);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const stored = await fetchContent();
      const merged = mergeContent(DEFAULT_CONTENT, stored);
      setDraft(merged);
      setSavedSnapshot(JSON.stringify(merged));
    } catch (err) {
      if (err.status === 401) return onUnauthorized();
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [onUnauthorized]);

  useEffect(() => { load(); }, [load]);

  const dirty = useMemo(
    () => draft !== null && JSON.stringify(draft) !== savedSnapshot,
    [draft, savedSnapshot]
  );

  // Saqlanmagan o'zgarishlar bo'lsa, sahifadan chiqishdan oldin ogohlantiramiz
  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = async () => {
    setSaving(true);
    setError("");
    setStatus("");
    try {
      await saveContent(token, draft);
      setSavedSnapshot(JSON.stringify(draft));
      setStatus("Saqlandi");
      setTimeout(() => setStatus(""), 2500);
    } catch (err) {
      if (err.status === 401) return onUnauthorized();
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const resetSection = () => {
    if (!window.confirm("Bu bo'lim boshlang'ich holatga qaytariladi. Davom etasizmi?")) return;
    setDraft((d) => ({ ...d, [activeKey]: structuredClone(DEFAULT_CONTENT[activeKey]) }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400 gap-2">
        <Loader2 className="w-5 h-5 animate-spin" /> Yuklanmoqda...
      </div>
    );
  }
  if (!draft) {
    return <div className="text-center py-24 text-sm text-red-500">{error || "Kontentni yuklab bo'lmadi."}</div>;
  }

  const section = CONTENT_SECTIONS.find((s) => s.key === activeKey) || CONTENT_SECTIONS[0];

  return (
    <div className="lg:flex lg:gap-8 lg:items-start">
      {/* Bo'limlar ro'yxati */}
      <nav className="lg:w-60 lg:shrink-0 mb-5 lg:mb-0 lg:sticky lg:top-24">
        <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 lg:mx-0 lg:px-0 pb-1">
          {CONTENT_SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveKey(s.key)}
              className={`shrink-0 lg:shrink text-left rounded-xl px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${
                activeKey === s.key
                  ? "bg-indigo-950 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg font-semibold text-indigo-950">{section.label}</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              O'zgarishlar «Saqlash» bosilgandan keyin saytda ko'rinadi.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetSection}
              className="rounded-full border border-slate-200 text-slate-600 text-sm font-medium px-4 py-2 hover:border-indigo-300 hover:text-indigo-700 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Tiklash
            </button>
            <button
              onClick={save}
              disabled={saving || !dirty}
              className="rounded-full bg-indigo-600 text-white text-sm font-semibold px-5 py-2 flex items-center gap-1.5 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : status ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saving ? "Saqlanmoqda..." : status || (dirty ? "Saqlash" : "Saqlangan")}
            </button>
          </div>
        </div>

        {dirty && (
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 text-sm px-4 py-2.5 mb-5">
            <TriangleAlert className="w-4 h-4 shrink-0" /> Saqlanmagan o'zgarishlar bor.
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 mb-5">{error}</div>
        )}

        <SectionEditor
          key={section.key}
          token={token}
          section={section}
          data={draft[section.key] || {}}
          onChange={(next) => setDraft((d) => ({ ...d, [section.key]: next }))}
        />
      </div>
    </div>
  );
}
