import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_FILE = path.resolve(__dirname, "../data/content.json");

let writeQueue = Promise.resolve();

function ensureFile() {
  const dir = path.dirname(CONTENT_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(CONTENT_FILE)) {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify({}, null, 2), "utf-8");
  }
}

/** Saqlangan kontentni qaytaradi. Fayl yo'q yoki buzilgan bo'lsa — bo'sh obyekt. */
export function getContent() {
  ensureFile();
  try {
    const parsed = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/** Butun kontentni almashtiradi (admin panel har safar to'liq holatni yuboradi). */
export function saveContent(next) {
  if (!next || typeof next !== "object" || Array.isArray(next)) {
    const err = new Error("Kontent noto'g'ri formatda yuborildi.");
    err.statusCode = 400;
    throw err;
  }
  ensureFile();
  writeQueue = writeQueue.then(
    () =>
      new Promise((resolve, reject) => {
        // Avval zaxira nusxa — noto'g'ri saqlash bo'lsa qaytarish mumkin bo'lsin
        try {
          if (fs.existsSync(CONTENT_FILE)) {
            fs.copyFileSync(CONTENT_FILE, `${CONTENT_FILE}.bak`);
          }
        } catch {
          /* zaxira muhim emas, davom etamiz */
        }
        fs.writeFile(CONTENT_FILE, JSON.stringify(next, null, 2), "utf-8", (err) =>
          err ? reject(err) : resolve()
        );
      })
  );
  return writeQueue.then(() => next);
}
