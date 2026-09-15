import React, { useState } from "react";
import { Image as ImageIcon, Trash2, Video as VideoIcon } from "lucide-react";
import MediaPicker from "./MediaPicker.jsx";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400";

function MediaField({ token, field, value, onChange }) {
  const [picking, setPicking] = useState(false);
  const isVideo = field.type === "video";

  return (
    <div>
      <label className="text-sm font-medium text-slate-600">{field.label}</label>

      <div className="mt-1.5 flex items-start gap-3">
        <div className="w-24 h-24 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center">
          {value ? (
            isVideo ? (
              <video src={value} muted preload="metadata" className="w-full h-full object-cover" />
            ) : (
              <img src={value} alt="" className="w-full h-full object-cover" />
            )
          ) : isVideo ? (
            <VideoIcon className="w-6 h-6 text-slate-300" />
          ) : (
            <ImageIcon className="w-6 h-6 text-slate-300" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPicking(true)}
              className="rounded-full bg-indigo-950 text-white text-sm font-medium px-4 py-2 hover:bg-indigo-900 active:scale-95 transition-all"
            >
              {value ? "Almashtirish" : "Galereyadan tanlash"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="rounded-full border border-slate-200 text-slate-600 text-sm font-medium px-4 py-2 hover:border-red-300 hover:text-red-600 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Olib tashlash
              </button>
            )}
          </div>
          {field.hint && <p className="text-xs text-slate-400 mt-2">{field.hint}</p>}
          {value && <p className="text-[11px] text-slate-400 mt-1 truncate">{value}</p>}
        </div>
      </div>

      {picking && (
        <MediaPicker
          token={token}
          kind={isVideo ? "video" : "image"}
          onPick={(url) => { onChange(url); setPicking(false); }}
          onClose={() => setPicking(false)}
        />
      )}
    </div>
  );
}

export default function FieldInput({ token, field, value, onChange }) {
  if (field.type === "image" || field.type === "video") {
    return <MediaField token={token} field={field} value={value || ""} onChange={onChange} />;
  }

  if (field.type === "switch") {
    return (
      <label className="flex items-center gap-3 cursor-pointer select-none py-2">
        <span
          className={`w-11 h-6 rounded-full p-0.5 transition-colors ${value ? "bg-indigo-600" : "bg-slate-300"}`}
          onClick={() => onChange(!value)}
        >
          <span className={`block w-5 h-5 rounded-full bg-white transition-transform ${value ? "translate-x-5" : ""}`} />
        </span>
        <span className="text-sm font-medium text-slate-600">{field.label}</span>
      </label>
    );
  }

  return (
    <div>
      <label className="text-sm font-medium text-slate-600">{field.label}</label>

      {field.type === "textarea" ? (
        <textarea rows={3} value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      ) : field.type === "tags" ? (
        <textarea
          rows={4}
          value={Array.isArray(value) ? value.join("\n") : value ?? ""}
          onChange={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
          className={inputClass}
          placeholder="Har bandni alohida qatorga yozing"
        />
      ) : field.type === "select" ? (
        <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={inputClass}>
          {(field.options || []).map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : field.type === "number" ? (
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          className={inputClass}
        />
      ) : (
        <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      )}

      {field.hint && <p className="text-xs text-slate-400 mt-1.5">{field.hint}</p>}
    </div>
  );
}
