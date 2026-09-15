const BASE = "/api";

async function parseJsonSafe(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function handle(res, fallbackMessage) {
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    const err = new Error(data?.error || fallbackMessage);
    err.fieldErrors = data?.fieldErrors || null;
    err.status = res.status;
    throw err;
  }
  return data;
}

const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });

/* ---------------- Public ---------------- */

/** Saytdagi barcha matn va ro'yxatlarni olib keladi. */
export async function fetchContent() {
  const res = await fetch(`${BASE}/content`);
  const data = await handle(res, "Sayt ma'lumotlarini yuklab bo'lmadi.");
  return data.content || {};
}

/** Ariza yuborish — token kerak emas. */
export async function submitApplication(payload) {
  const res = await fetch(`${BASE}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await handle(res, "Xatolik yuz berdi.");
  return data.application;
}

/* ---------------- Admin auth ---------------- */

export async function adminLogin(code) {
  const res = await fetch(`${BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  const data = await handle(res, "Kirishda xatolik yuz berdi.");
  return data.token;
}

export async function adminLogout(token) {
  await fetch(`${BASE}/admin/logout`, { method: "POST", headers: authHeaders(token) }).catch(() => {});
}

/* ---------------- Admin: kontent ---------------- */

export async function saveContent(token, content) {
  const res = await fetch(`${BASE}/content`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify({ content }),
  });
  const data = await handle(res, "Kontentni saqlab bo'lmadi.");
  return data.content;
}

/* ---------------- Admin: media ---------------- */

/**
 * Faylni serverga yuklaydi. Yuklanish jarayonini kuzatish uchun
 * XMLHttpRequest ishlatilgan (fetch progress qo'llab-quvvatlamaydi).
 */
export function uploadMedia(token, file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${BASE}/media`);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("X-File-Name", encodeURIComponent(file.name));

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      let parsed = null;
      try { parsed = JSON.parse(xhr.responseText); } catch { /* bo'sh javob */ }
      if (xhr.status >= 200 && xhr.status < 300 && parsed?.file) {
        resolve(parsed.file);
      } else {
        const err = new Error(parsed?.error || "Faylni yuklab bo'lmadi.");
        err.status = xhr.status;
        reject(err);
      }
    };
    xhr.onerror = () => reject(new Error("Tarmoq xatosi. Faylni yuklab bo'lmadi."));
    xhr.send(file);
  });
}

export async function fetchMedia(token) {
  const res = await fetch(`${BASE}/media`, { headers: authHeaders(token) });
  const data = await handle(res, "Fayllar ro'yxatini olib bo'lmadi.");
  return data.files;
}

export async function deleteMedia(token, name) {
  const res = await fetch(`${BASE}/media/${encodeURIComponent(name)}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  await handle(res, "Faylni o'chirib bo'lmadi.");
  return true;
}

/* ---------------- Admin: arizalar ---------------- */

export async function fetchApplications(token) {
  const res = await fetch(`${BASE}/applications`, { headers: authHeaders(token) });
  const data = await handle(res, "Arizalarni yuklab bo'lmadi.");
  return data.applications;
}

export async function updateApplicationStatus(token, id, status) {
  const res = await fetch(`${BASE}/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify({ status }),
  });
  const data = await handle(res, "Statusni yangilab bo'lmadi.");
  return data.application;
}

export async function deleteApplication(token, id) {
  const res = await fetch(`${BASE}/applications/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  await handle(res, "Arizani o'chirib bo'lmadi.");
  return true;
}
