import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const UPLOADS_DIR = path.resolve(__dirname, "../uploads");

/** Ruxsat etilgan fayl turlari — kengaytma -> MIME */
const ALLOWED = {
  ".jpg": "image", ".jpeg": "image", ".png": "image", ".webp": "image", ".gif": "image", ".avif": "image",
  ".mp4": "video", ".webm": "video", ".mov": "video", ".m4v": "video", ".ogg": "video",
};

function ensureDir() {
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function slugify(name) {
  return name
    .normalize("NFKD")
    .replace(/[^\w.\- ]+/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase()
    .slice(0, 60);
}

/**
 * Yuklangan faylni `uploads/` papkasiga yozadi.
 * @returns {{ url: string, name: string, kind: "image"|"video", size: number }}
 */
export function saveMedia(buffer, originalName) {
  ensureDir();
  const ext = path.extname(originalName || "").toLowerCase();
  const kind = ALLOWED[ext];
  if (!kind) {
    const err = new Error("Bu fayl turini yuklab bo'lmaydi. Rasm (jpg, png, webp) yoki video (mp4, webm, mov) tanlang.");
    err.statusCode = 415;
    throw err;
  }
  if (!buffer || buffer.length === 0) {
    const err = new Error("Fayl bo'sh.");
    err.statusCode = 400;
    throw err;
  }

  const base = slugify(path.basename(originalName, ext)) || "fayl";
  const fileName = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}-${base}${ext}`;
  fs.writeFileSync(path.join(UPLOADS_DIR, fileName), buffer);

  return { url: `/uploads/${fileName}`, name: fileName, kind, size: buffer.length };
}

/** Papkadagi barcha fayllar ro'yxati (eng yangisi tepada). */
export function listMedia() {
  ensureDir();
  return fs
    .readdirSync(UPLOADS_DIR)
    .filter((f) => ALLOWED[path.extname(f).toLowerCase()])
    .map((f) => {
      const stat = fs.statSync(path.join(UPLOADS_DIR, f));
      return {
        name: f,
        url: `/uploads/${f}`,
        kind: ALLOWED[path.extname(f).toLowerCase()],
        size: stat.size,
        createdAt: stat.mtime.toISOString(),
      };
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/** Faylni o'chirish. Papkadan tashqariga chiqishga yo'l qo'yilmaydi. */
export function deleteMedia(name) {
  ensureDir();
  const safe = path.basename(name || "");
  const target = path.join(UPLOADS_DIR, safe);
  if (!target.startsWith(UPLOADS_DIR) || !fs.existsSync(target)) {
    const err = new Error("Fayl topilmadi.");
    err.statusCode = 404;
    throw err;
  }
  fs.unlinkSync(target);
  return { ok: true };
}
