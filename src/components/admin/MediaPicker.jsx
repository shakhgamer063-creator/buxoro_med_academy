import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Loader2, Trash2, Upload, Video as VideoIcon, X } from "lucide-react";
import { deleteMedia, fetchMedia, uploadMedia } from "../../utils/api.js";

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Rasm/video tanlash oynasi.
 * Foydalanuvchi qurilma galereyasidan yangi fayl yuklashi yoki
 * ilgari yuklangan fayllardan birini qayta tanlashi mumkin.
 */
export default function MediaPicker({ token, kind = "image", onPick, onClose }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(null);
  const inputRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setFiles(await fetchMedia(token));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleFiles = async (fileList) => {
    const list = Array.from(fileList || []);
    if (list.length === 0) return;
    setError("");
    try {
      let last = null;
      for (const file of list) {
        setProgress(0);
        last = await uploadMedia(token, file, setProgress);
      }
      setProgress(null);
      await load();
      if (list.length === 1 && last) onPick(last.url);
    } catch (err) {
      setProgress(null);
      setError(err.message);
    }
  };

  const remove = async (name) => {
    if (!window.confirm("Bu fayl butunlay o'chiriladi. Davom etasizmi?")) return;
    try {
      await deleteMedia(token, name);
      setFiles((f) => f.filter((x) => x.name !== name));
    } catch (err) {
      setError(err.message);
    }
  };

  const visible = files.filter((f) => f.kind === kind);
  const accept = kind === "video" ? "video/*" : "image/*";

  return (
    <div className="fixed inset-0 z-[80] bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6" onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-3xl rounded-t-3xl sm:rounded-3xl max-h-[88vh] flex flex-col animate-[modalIn_0.25s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-indigo-950">
            {kind === "video" ? "Video tanlash" : "Rasm tanlash"}
          </h3>
          <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500" aria-label="Yopish">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 sm:px-7 py-4 border-b border-slate-100">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple
            className="hidden"
            onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
          />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={progress !== null}
            className="w-full rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 py-6 flex flex-col items-center gap-2 text-indigo-700 hover:bg-indigo-50 transition-colors disabled:opacity-60"
          >
            <Upload className="w-5 h-5" />
            <span className="font-semibold text-sm">
              {progress !== null ? `Yuklanmoqda... ${progress}%` : "Galereyadan fayl tanlash"}
            </span>
            <span className="text-xs text-indigo-500">
              {kind === "video" ? "mp4, webm, mov" : "jpg, png, webp"} · bir nechta faylni birdan tanlash mumkin
            </span>
          </button>

          {progress !== null && (
            <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-indigo-600 transition-[width] duration-200" style={{ width: `${progress}%` }} />
            </div>
          )}

          {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-slate-400 gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Yuklanmoqda...
            </div>
          ) : visible.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-sm">
              {kind === "video" ? <VideoIcon className="w-8 h-8 mx-auto mb-3 opacity-40" /> : <ImageIcon className="w-8 h-8 mx-auto mb-3 opacity-40" />}
              Hali fayl yuklanmagan. Yuqoridagi tugma orqali qo'shing.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {visible.map((f) => (
                <div key={f.name} className="group relative rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                  <button onClick={() => onPick(f.url)} className="block w-full aspect-square">
                    {f.kind === "video" ? (
                      <video src={f.url} muted preload="metadata" className="w-full h-full object-cover" />
                    ) : (
                      <img src={f.url} alt="" loading="lazy" className="w-full h-full object-cover" />
                    )}
                  </button>
                  <button
                    onClick={() => remove(f.name)}
                    className="absolute top-1.5 right-1.5 w-8 h-8 rounded-full bg-white/90 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                    aria-label="O'chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="px-2 py-1.5 text-[10px] text-slate-400 truncate">{formatSize(f.size)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
