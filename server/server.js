import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import {
  getAllApplications,
  addApplication,
  updateApplicationStatus,
  deleteApplication,
} from "./applicationsStore.js";
import { getContent, saveContent } from "./contentStore.js";
import { saveMedia, listMedia, deleteMedia, UPLOADS_DIR } from "./mediaStore.js";
import { createSession, isValidSession, destroySession } from "./sessionStore.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_CODE = process.env.ADMIN_CODE;
const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB || 300);

if (!ADMIN_CODE) {
  console.warn(
    "\n[OGOHLANTIRISH] .env faylida ADMIN_CODE topilmadi. /admin sahifasiga hech kim kira olmaydi.\n" +
      "Loyiha ildizida .env fayl yarating va ADMIN_CODE=... qatorini qo'shing.\n"
  );
}

app.use(cors());
app.use(express.json({ limit: "5mb" }));

/* ============================================================
   Admin sessiyasini tekshiruvchi middleware
   ============================================================ */
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!isValidSession(token)) {
    return res.status(401).json({ error: "Sessiya tugagan yoki ruxsat yo'q. Qaytadan kiring." });
  }
  next();
}

function fail(res, err, fallback) {
  const status = err?.statusCode || 500;
  if (status >= 500) console.error(fallback, err);
  return res.status(status).json({ error: err?.message || fallback });
}

/* ============================================================
   VALIDATSIYA
   ============================================================ */
const UZ_PHONE_RE = /^\+998\d{9}$/;

function validateApplicationPayload(body) {
  const errors = {};
  const fullName = (body.fullName || "").trim();
  const phone = (body.phone || "").replace(/\s+/g, "");
  const age = Number(body.age);

  if (fullName.length < 2) errors.fullName = "Ism va familiyangizni kiriting";
  if (!UZ_PHONE_RE.test(phone)) errors.phone = "Telefon raqamingizni to'g'ri kiriting";
  if (!body.age || Number.isNaN(age) || age < 5 || age > 90) errors.age = "Yoshingizni to'g'ri kiriting";
  if (!body.course) errors.course = "Yo'nalishni tanlang";
  if (!body.level) errors.level = "Darajani tanlang";
  if (!body.branch) errors.branch = "Filialni tanlang";
  if (!body.preferredTime) errors.preferredTime = "Qulay vaqtni tanlang";

  return { valid: Object.keys(errors).length === 0, errors, normalizedPhone: phone, age };
}

/* ============================================================
   PUBLIC: sayt kontenti
   ============================================================ */
app.get("/api/content", (req, res) => {
  try {
    return res.json({ content: getContent() });
  } catch (err) {
    return fail(res, err, "Kontentni yuklashda xatolik.");
  }
});

/* ============================================================
   PUBLIC: ariza yuborish
   ============================================================ */
app.post("/api/applications", async (req, res) => {
  const { valid, errors, normalizedPhone, age } = validateApplicationPayload(req.body);
  if (!valid) {
    return res.status(400).json({ error: "Forma to'liq yoki to'g'ri to'ldirilmagan.", fieldErrors: errors });
  }
  try {
    const created = await addApplication({
      fullName: req.body.fullName.trim(),
      phone: normalizedPhone,
      age,
      course: req.body.course,
      level: req.body.level,
      branch: req.body.branch,
      preferredTime: req.body.preferredTime,
      message: (req.body.message || "").trim(),
    });
    return res.status(201).json({ application: created });
  } catch (err) {
    return fail(res, err, "Arizani saqlashda xatolik yuz berdi.");
  }
});

/* ============================================================
   ADMIN AUTH
   ============================================================ */
app.post("/api/admin/login", (req, res) => {
  const { code } = req.body || {};
  if (!ADMIN_CODE || !code || code !== ADMIN_CODE) {
    return res.status(401).json({ error: "Maxsus kod noto'g'ri." });
  }
  return res.json({ token: createSession() });
});

app.post("/api/admin/logout", requireAdmin, (req, res) => {
  destroySession((req.headers.authorization || "").slice(7));
  return res.json({ ok: true });
});

/* ============================================================
   ADMIN: kontentni saqlash
   ============================================================ */
app.put("/api/content", requireAdmin, async (req, res) => {
  try {
    const saved = await saveContent(req.body?.content);
    return res.json({ content: saved });
  } catch (err) {
    return fail(res, err, "Kontentni saqlashda xatolik.");
  }
});

/* ============================================================
   ADMIN: media (rasm / video) yuklash
   Fayl xom (binary) ko'rinishda yuboriladi, nomi X-File-Name sarlavhasida.
   ============================================================ */
app.post(
  "/api/media",
  requireAdmin,
  express.raw({ type: "*/*", limit: `${MAX_UPLOAD_MB}mb` }),
  (req, res) => {
    try {
      const rawName = req.headers["x-file-name"];
      const originalName = decodeURIComponent(Array.isArray(rawName) ? rawName[0] : rawName || "");
      if (!originalName) {
        return res.status(400).json({ error: "Fayl nomi yuborilmadi." });
      }
      const file = saveMedia(req.body, originalName);
      return res.status(201).json({ file });
    } catch (err) {
      return fail(res, err, "Faylni yuklashda xatolik.");
    }
  }
);

app.get("/api/media", requireAdmin, (req, res) => {
  try {
    return res.json({ files: listMedia() });
  } catch (err) {
    return fail(res, err, "Fayllar ro'yxatini olishda xatolik.");
  }
});

app.delete("/api/media/:name", requireAdmin, (req, res) => {
  try {
    deleteMedia(req.params.name);
    return res.json({ ok: true });
  } catch (err) {
    return fail(res, err, "Faylni o'chirishda xatolik.");
  }
});

/* ============================================================
   ADMIN: arizalar
   ============================================================ */
app.get("/api/applications", requireAdmin, (req, res) => {
  try {
    return res.json({ applications: getAllApplications() });
  } catch (err) {
    return fail(res, err, "Arizalarni yuklashda xatolik yuz berdi.");
  }
});

app.patch("/api/applications/:id", requireAdmin, async (req, res) => {
  try {
    const updated = await updateApplicationStatus(req.params.id, req.body.status);
    return res.json({ application: updated });
  } catch (err) {
    return fail(res, err, "Statusni yangilashda xatolik yuz berdi.");
  }
});

app.delete("/api/applications/:id", requireAdmin, async (req, res) => {
  try {
    await deleteApplication(req.params.id);
    return res.json({ ok: true });
  } catch (err) {
    return fail(res, err, "Arizani o'chirishda xatolik yuz berdi.");
  }
});

/* ============================================================
   Yuklangan fayllarni ulashish
   ============================================================ */
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
app.use("/uploads", express.static(UPLOADS_DIR, { maxAge: "7d" }));

/* ============================================================
   PRODUCTION: build qilingan frontend
   ============================================================ */
const distPath = path.resolve(__dirname, "../dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/^(?!\/(api|uploads)).*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`\n✔ Buxoro Med Academy backend: http://localhost:${PORT}`);
  console.log(`  Admin panel: http://localhost:5173/admin (dev) yoki /admin (prod)\n`);
});
