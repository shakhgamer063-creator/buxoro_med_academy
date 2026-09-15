# Buxoro Med Academy

Tibbiyot oliygohiga tayyorlov markazi sayti. React + Vite (frontend) va Express (backend).
Saytdagi barcha matnlar, rasmlar va videolar admin panel orqali boshqariladi.

---

## Ishga tushirish

```bash
npm install
cp .env.example .env      # ADMIN_CODE ni o'zingiznikiga almashtiring
npm run dev
```

- Sayt: http://localhost:5173
- Admin panel: http://localhost:5173/admin

Telefondan tekshirish uchun kompyuter bilan bir Wi-Fi tarmog'ida turib,
terminalda ko'rsatilgan `Network:` manzilini telefon brauzeriga kiriting.

### Ishlab chiqarish (production)

```bash
npm run build
npm start
```

Endi hammasi bitta portda ishlaydi: http://localhost:3001 (admin panel `/admin`).

---

## Admin panel

`/admin` manziliga kiring va `.env` faylidagi `ADMIN_CODE` ni yozing.
Panelda ikkita bo'lim bor.

### 1. Sayt ma'lumotlari

Chapdagi ro'yxatdan kerakli bo'limni tanlaysiz:

| Bo'lim | Nimani boshqaradi |
|---|---|
| Sayt ma'lumotlari | Markaz nomi, telefonlar, manzil, ish vaqti, ijtimoiy tarmoqlar |
| Yuqori bo'lim (Hero) | Bosh sarlavha, tavsif, tugmalar, «500+ o'quvchi» kabi belgilar |
| Talabalarimiz qayerga kirdi | Chapga suriluvchi ikki qatorli kartalar |
| Ota-onalar videosi | 9:16 formatdagi video kartalar |
| Markazdan lavhalar | Galereya rasmlari |
| Qolgan bo'limlar | Raqamlar, yo'nalishlar, natijalar, ustozlar, afzalliklar, jarayon, filiallar, savol-javob, ariza formasi, pastki bloklar |

Har bir ro'yxatda yozuv **qo'shish**, **o'chirish** va **tartibini o'zgartirish** mumkin.
O'zgarishlar **«Saqlash»** bosilgandan keyin saytda ko'rinadi.
«Tiklash» tugmasi joriy bo'limni boshlang'ich holatga qaytaradi.

Bo'sh qoldirilgan bo'lim saytda umuman chizilmaydi va menyuda ham ko'rinmaydi.

### 2. Arizalar

Saytdagi formadan kelgan arizalar. Qidirish, status bo'yicha filtrlash,
statusni o'zgartirish va o'chirish mumkin.

---

## Rasm va video yuklash

Rasm yoki video maydonida **«Galereyadan tanlash»** tugmasini bosing:

- telefon yoki kompyuter galereyasidan fayl tanlanadi (bir nechtasini birdan ham);
- yuklanish foizi ko'rinib turadi;
- ilgari yuklangan fayllarni qayta ishlatish mumkin;
- keraksiz fayl o'sha oynadan o'chiriladi.

Videolar YouTube yoki boshqa tashqi xizmatdan olinmaydi — hammasi shu serverda saqlanadi.

Ruxsat etilgan turlar: `jpg, jpeg, png, webp, gif, avif` va `mp4, webm, mov, m4v, ogg`.
Bitta faylning maksimal hajmi `.env` dagi `MAX_UPLOAD_MB` bilan belgilanadi (standart 300 MB).

---

## Ma'lumotlar qayerda saqlanadi

| Yo'l | Nima |
|---|---|
| `data/content.json` | Saytdagi barcha matn va ro'yxatlar |
| `data/content.json.bak` | Oxirgi saqlashdan oldingi zaxira nusxa |
| `data/applications.json` | Kelgan arizalar |
| `uploads/` | Yuklangan rasm va videolar |

Bu papkalar `.gitignore` da — GitHub'ga tushmaydi. Saytni ko'chirganda
ularni qo'lda nusxalab olish kerak.

Server ishlamay qolsa ham sayt ochiladi: bunday holda
`src/data/defaultContent.js` dagi boshlang'ich ma'lumotlar ko'rsatiladi.

---

## Loyiha tuzilishi

```
server/
  server.js             API yo'llari
  contentStore.js       content.json bilan ishlash
  mediaStore.js         fayl yuklash va o'chirish
  applicationsStore.js  arizalar
  sessionStore.js       admin sessiyasi
src/
  data/
    defaultContent.js   saytning boshlang'ich matnlari
    contentSchema.js    admin paneldagi formalar tavsifi
  context/
    ContentContext.jsx  kontentni yuklab, butun saytga tarqatadi
  components/
    Admissions.jsx      «Talabalarimiz qayerga kirdi» (marquee)
    ParentVideos.jsx    ota-onalar videosi (9:16)
    Gallery.jsx         «Markazimizdan lavhalar»
    Marquee.jsx         chapga suriluvchi qator
    Lightbox.jsx        rasm/videoni kattalashtirish
    admin/              admin panel komponentlari
  pages/AdminPage.jsx   admin panel
```

### Yangi maydon qo'shish

`src/data/defaultContent.js` ga qiymatni, `src/data/contentSchema.js` ga esa
bitta qator tavsifni qo'shsangiz kifoya — admin paneldagi forma avtomatik yangilanadi.

---

## API

| Metod | Yo'l | Kirish |
|---|---|---|
| GET | `/api/content` | ochiq |
| POST | `/api/applications` | ochiq |
| POST | `/api/admin/login` | ochiq |
| PUT | `/api/content` | admin |
| POST / GET / DELETE | `/api/media` | admin |
| GET / PATCH / DELETE | `/api/applications` | admin |

Admin so'rovlari `Authorization: Bearer <token>` sarlavhasi bilan yuboriladi.
Sessiya 8 soatdan keyin tugaydi.
