/**
 * ADMIN PANEL SXEMASI
 * -------------------------------------------------------------
 * Admin paneldagi tahrirlash formalari shu fayl asosida avtomatik quriladi.
 * Yangi maydon qo'shish uchun shu yerga bitta qator yozish kifoya —
 * admin panel kodiga tegish shart emas.
 *
 * Maydon turlari:
 *   text | textarea | number | select | image | video | tags | switch
 */

export const ICON_OPTIONS = [
  { value: "users", label: "Odamlar" },
  { value: "award", label: "Medal" },
  { value: "trending", label: "O'sish" },
  { value: "layers", label: "Qatlamlar" },
  { value: "stethoscope", label: "Stetoskop" },
  { value: "microscope", label: "Mikroskop" },
  { value: "heart", label: "Yurak" },
  { value: "sparkles", label: "Yulduzchalar" },
];

export const CONTENT_SECTIONS = [
  {
    key: "site",
    label: "Sayt ma'lumotlari",
    icon: "settings",
    fields: [
      { key: "name", label: "Markaz nomi", type: "text" },
      { key: "short", label: "Qisqa nomi (logo ichida)", type: "text" },
      { key: "tagline", label: "Qisqa ta'rif", type: "text" },
      { key: "phone", label: "Asosiy telefon", type: "text" },
      { key: "phone2", label: "Qo'shimcha telefon", type: "text" },
      { key: "address", label: "Manzil", type: "text" },
      { key: "hours", label: "Ish vaqti", type: "text" },
      { key: "telegram", label: "Telegram havolasi", type: "text" },
      { key: "instagram", label: "Instagram havolasi", type: "text" },
      { key: "youtube", label: "YouTube havolasi", type: "text" },
    ],
  },

  {
    key: "hero",
    label: "Yuqori bo'lim (Hero)",
    icon: "layout",
    fields: [
      { key: "badge", label: "Yuqoridagi kichik yozuv", type: "text" },
      { key: "title", label: "Sarlavha", type: "textarea" },
      { key: "subtitle", label: "Tavsif", type: "textarea" },
      { key: "primaryCta", label: "Asosiy tugma matni", type: "text" },
      { key: "secondaryCta", label: "Ikkinchi tugma matni", type: "text" },
    ],
    list: {
      key: "trust",
      label: "Ishonch belgilari (500+ o'quvchi ...)",
      addLabel: "Belgi qo'shish",
      titleField: "text",
      newItem: { icon: "users", text: "" },
      fields: [
        { key: "text", label: "Matn", type: "text" },
        { key: "icon", label: "Ikonka", type: "select", options: ICON_OPTIONS },
      ],
    },
  },

  {
    key: "admissions",
    label: "Talabalarimiz qayerga kirdi",
    icon: "graduation",
    fields: [
      { key: "title", label: "Sarlavha", type: "text" },
      { key: "subtitle", label: "Tavsif", type: "textarea" },
      { key: "speed", label: "Harakat tezligi (soniya, katta son = sekinroq)", type: "number" },
    ],
    list: {
      key: "items",
      label: "Kartalar",
      addLabel: "Talaba qo'shish",
      titleField: "student",
      subtitleField: "university",
      newItem: { student: "", university: "", program: "", year: "", badge: "Grant" },
      fields: [
        { key: "student", label: "O'quvchi ismi", type: "text" },
        { key: "university", label: "Oliygoh nomi", type: "text" },
        { key: "program", label: "Yo'nalish", type: "text" },
        { key: "year", label: "Yil", type: "text" },
        {
          key: "badge",
          label: "Belgi",
          type: "select",
          options: [
            { value: "Grant", label: "Grant" },
            { value: "Kontrakt", label: "Kontrakt" },
            { value: "", label: "Belgisiz" },
          ],
        },
      ],
    },
  },

  {
    key: "parentVideos",
    label: "Ota-onalar videosi",
    icon: "video",
    fields: [
      { key: "title", label: "Sarlavha", type: "text" },
      { key: "subtitle", label: "Tavsif", type: "textarea" },
    ],
    list: {
      key: "items",
      label: "Videolar",
      addLabel: "Video qo'shish",
      titleField: "name",
      subtitleField: "role",
      mediaField: "src",
      mediaKind: "video",
      newItem: { src: "", poster: "", name: "", role: "Ota-ona", quote: "" },
      fields: [
        { key: "src", label: "Video fayl", type: "video", hint: "Telefon yoki kompyuter galereyasidan tanlang (mp4, mov, webm)" },
        { key: "poster", label: "Muqova rasmi (ixtiyoriy)", type: "image" },
        { key: "name", label: "Ism", type: "text" },
        { key: "role", label: "Kim (masalan: Diyoraning onasi)", type: "text" },
        { key: "quote", label: "Qisqa iqtibos", type: "textarea" },
      ],
    },
  },

  {
    key: "gallery",
    label: "Markazdan lavhalar (galereya)",
    icon: "image",
    fields: [
      { key: "title", label: "Sarlavha", type: "text" },
      { key: "subtitle", label: "Tavsif", type: "textarea" },
      { key: "speed", label: "Harakat tezligi (soniya)", type: "number" },
    ],
    list: {
      key: "items",
      label: "Rasmlar",
      addLabel: "Rasm qo'shish",
      titleField: "caption",
      mediaField: "src",
      mediaKind: "image",
      newItem: { src: "", caption: "" },
      fields: [
        { key: "src", label: "Rasm fayl", type: "image", hint: "jpg, png yoki webp" },
        { key: "caption", label: "Izoh", type: "text" },
      ],
    },
  },

  {
    key: "stats",
    label: "Raqamlar",
    icon: "chart",
    fields: [{ key: "title", label: "Sarlavha", type: "text" }],
    list: {
      key: "items",
      label: "Raqamlar",
      addLabel: "Raqam qo'shish",
      titleField: "label",
      newItem: { label: "", value: 0, suffix: "+", icon: "users" },
      fields: [
        { key: "label", label: "Nomi", type: "text" },
        { key: "value", label: "Qiymat (raqam)", type: "number" },
        { key: "suffix", label: "Qo'shimcha belgi", type: "text" },
        { key: "icon", label: "Ikonka", type: "select", options: ICON_OPTIONS },
      ],
    },
  },

  {
    key: "courses",
    label: "Yo'nalishlar",
    icon: "book",
    fields: [
      { key: "title", label: "Sarlavha", type: "text" },
      { key: "subtitle", label: "Tavsif", type: "textarea" },
    ],
    list: {
      key: "items",
      label: "Yo'nalishlar",
      addLabel: "Yo'nalish qo'shish",
      titleField: "title",
      subtitleField: "tagline",
      newItem: {
        category: "asosiy", title: "", tagline: "", desc: "", duration: "",
        weekly: "", price: "", level: "", book: "", teacher: "", program: [],
      },
      fields: [
        { key: "title", label: "Nomi", type: "text" },
        { key: "tagline", label: "Qisqa shior", type: "text" },
        {
          key: "category", label: "Toifa", type: "select",
          options: [
            { value: "asosiy", label: "Asosiy fanlar" },
            { value: "qoshimcha", label: "Qo'shimcha fanlar" },
            { value: "til", label: "Til" },
          ],
        },
        { key: "desc", label: "Tavsif", type: "textarea" },
        { key: "level", label: "Daraja", type: "text" },
        { key: "duration", label: "Davomiyligi", type: "text" },
        { key: "weekly", label: "Haftalik darslar", type: "text" },
        { key: "price", label: "Narxi (so'm)", type: "text" },
        { key: "book", label: "Kitob", type: "text" },
        { key: "teacher", label: "Ustoz", type: "text" },
        { key: "program", label: "Dastur bandlari", type: "tags", hint: "Har bandni alohida qatorga yozing" },
      ],
    },
  },

  {
    key: "results",
    label: "Natijalar",
    icon: "trophy",
    fields: [
      { key: "title", label: "Sarlavha", type: "text" },
      { key: "subtitle", label: "Tavsif", type: "textarea" },
    ],
    list: {
      key: "items",
      label: "Natijalar",
      addLabel: "Natija qo'shish",
      titleField: "name",
      subtitleField: "type",
      newItem: { name: "", type: "Biologiya", prev: "", result: "" },
      fields: [
        { key: "name", label: "O'quvchi ismi", type: "text" },
        { key: "type", label: "Fan / turi", type: "text" },
        { key: "prev", label: "Avvalgi natija", type: "text" },
        { key: "result", label: "Yangi natija", type: "text" },
      ],
    },
  },

  {
    key: "teachers",
    label: "Ustozlar",
    icon: "users",
    fields: [
      { key: "title", label: "Sarlavha", type: "text" },
      { key: "subtitle", label: "Tavsif", type: "textarea" },
    ],
    list: {
      key: "items",
      label: "Ustozlar",
      addLabel: "Ustoz qo'shish",
      titleField: "name",
      subtitleField: "subject",
      mediaField: "photo",
      mediaKind: "image",
      newItem: { name: "", subject: "", exp: "", cert: "", bio: "", photo: "" },
      fields: [
        { key: "photo", label: "Surat (ixtiyoriy)", type: "image" },
        { key: "name", label: "Ism familiya", type: "text" },
        { key: "subject", label: "Fan", type: "text" },
        { key: "exp", label: "Tajriba", type: "text" },
        { key: "cert", label: "Sertifikat / ma'lumot", type: "text" },
        { key: "bio", label: "Qisqacha", type: "textarea" },
      ],
    },
  },

  {
    key: "whyUs",
    label: "Nega aynan biz",
    icon: "sparkles",
    fields: [
      { key: "title", label: "Sarlavha", type: "text" },
      { key: "subtitle", label: "Tavsif", type: "textarea" },
    ],
    list: {
      key: "items",
      label: "Afzalliklar",
      addLabel: "Afzallik qo'shish",
      titleField: "title",
      newItem: { icon: "sparkles", title: "", desc: "" },
      fields: [
        { key: "title", label: "Sarlavha", type: "text" },
        { key: "desc", label: "Tavsif", type: "textarea" },
        { key: "icon", label: "Ikonka", type: "select", options: ICON_OPTIONS },
      ],
    },
  },

  {
    key: "process",
    label: "O'qish jarayoni",
    icon: "steps",
    fields: [{ key: "title", label: "Sarlavha", type: "text" }],
    list: {
      key: "items",
      label: "Bosqichlar",
      addLabel: "Bosqich qo'shish",
      titleField: "title",
      newItem: { title: "", desc: "" },
      fields: [
        { key: "title", label: "Bosqich nomi", type: "text" },
        { key: "desc", label: "Tavsif", type: "textarea" },
      ],
    },
  },

  {
    key: "branches",
    label: "Filiallar",
    icon: "map",
    fields: [
      { key: "title", label: "Sarlavha", type: "text" },
      { key: "subtitle", label: "Tavsif", type: "textarea" },
    ],
    list: {
      key: "items",
      label: "Filiallar",
      addLabel: "Filial qo'shish",
      titleField: "name",
      subtitleField: "address",
      newItem: { name: "", address: "", phone: "", hours: "", isMain: false },
      fields: [
        { key: "name", label: "Filial nomi", type: "text" },
        { key: "address", label: "Manzil", type: "text" },
        { key: "phone", label: "Telefon", type: "text" },
        { key: "hours", label: "Ish vaqti", type: "text" },
        { key: "isMain", label: "Asosiy filial", type: "switch" },
      ],
    },
  },

  {
    key: "faq",
    label: "Savol-javob",
    icon: "help",
    fields: [{ key: "title", label: "Sarlavha", type: "text" }],
    list: {
      key: "items",
      label: "Savollar",
      addLabel: "Savol qo'shish",
      titleField: "q",
      newItem: { q: "", a: "" },
      fields: [
        { key: "q", label: "Savol", type: "text" },
        { key: "a", label: "Javob", type: "textarea" },
      ],
    },
  },

  {
    key: "form",
    label: "Ariza formasi",
    icon: "form",
    fields: [
      { key: "title", label: "Sarlavha", type: "text" },
      { key: "subtitle", label: "Tavsif", type: "textarea" },
      { key: "levels", label: "Daraja variantlari", type: "tags" },
      { key: "times", label: "Qulay vaqt variantlari", type: "tags" },
      { key: "successTitle", label: "Muvaffaqiyat sarlavhasi", type: "text" },
      { key: "successText", label: "Muvaffaqiyat matni", type: "textarea" },
    ],
  },

  {
    key: "cta",
    label: "Pastki chaqiruv bloki",
    icon: "megaphone",
    fields: [
      { key: "title", label: "Sarlavha", type: "text" },
      { key: "subtitle", label: "Tavsif", type: "textarea" },
      { key: "primary", label: "Asosiy tugma", type: "text" },
      { key: "secondary", label: "Ikkinchi tugma", type: "text" },
    ],
  },

  {
    key: "footer",
    label: "Pastki qism",
    icon: "footer",
    fields: [
      { key: "about", label: "Markaz haqida qisqacha", type: "textarea" },
      { key: "copyright", label: "Mualliflik yozuvi", type: "text" },
    ],
  },
];
