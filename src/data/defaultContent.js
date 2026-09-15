/**
 * SAYTNING BOSHLANG'ICH (DEFAULT) MA'LUMOTLARI
 * -------------------------------------------------------------
 * Bu fayl — saytdagi barcha matn va ro'yxatlarning zaxira nusxasi.
 * Admin panel orqali kiritilgan o'zgarishlar serverdagi
 * `data/content.json` faylida saqlanadi va shu defaultlar ustiga qo'yiladi.
 * Server ishlamayotgan bo'lsa ham sayt shu ma'lumotlar bilan ochiladi.
 */

export const DEFAULT_CONTENT = {
  site: {
    name: "Buxoro Med Academy",
    short: "BMA",
    tagline: "Tibbiyot institutiga tayyorlov markazi",
    phone: "+998 65 223 10 10",
    phone2: "+998 90 123 45 67",
    address: "Buxoro shahri, Mustaqillik ko'chasi, 24-uy",
    hours: "Dush–Shan: 08:00–20:00",
    telegram: "https://t.me/",
    instagram: "https://instagram.com/",
    youtube: "",
    mapQuery: "Buxoro, Mustaqillik ko'chasi",
  },

  hero: {
    badge: "2013-yildan buyon tibbiyotga tayyorlaymiz",
    title: "Oq xalatga birinchi qadam shu yerdan boshlanadi.",
    subtitle:
      "Biologiya, kimyo va ona tilidan chuqurlashtirilgan tayyorgarlik. Har bir o'quvchi uchun aniq reja, jonli amaliyot va o'lchanadigan natija.",
    primaryCta: "Qabulga yozilish",
    secondaryCta: "Yo'nalishlarni ko'rish",
    trust: [
      { id: "h1", icon: "users", text: "500+ o'quvchi" },
      { id: "h2", icon: "award", text: "300+ sertifikat" },
      { id: "h3", icon: "trending", text: "100+ yuqori natija" },
    ],
  },

  admissions: {
    title: "Bizning talabalarimiz qayerga o'qishga kirdi",
    subtitle:
      "Har bir karta — markazimizda tayyorlanib, tibbiyot oliygohiga hujjat topshirgan va grantga o'qishga kirgan o'quvchi.",
    speed: 46,
    items: [
      { id: "a1", student: "Diyora Ergasheva", university: "Buxoro davlat tibbiyot instituti", program: "Davolash ishi", year: "2025", badge: "Grant" },
      { id: "a2", student: "Jasurbek Qodirov", university: "Toshkent tibbiyot akademiyasi", program: "Pediatriya", year: "2025", badge: "Grant" },
      { id: "a3", student: "Sevinch Nazarova", university: "Samarqand davlat tibbiyot universiteti", program: "Stomatologiya", year: "2025", badge: "Kontrakt" },
      { id: "a4", student: "Islom Rahmatov", university: "Buxoro davlat tibbiyot instituti", program: "Farmatsevtika", year: "2024", badge: "Grant" },
      { id: "a5", student: "Malika Yusupova", university: "Andijon davlat tibbiyot instituti", program: "Davolash ishi", year: "2024", badge: "Grant" },
      { id: "a6", student: "Doston Aliyev", university: "Toshkent pediatriya tibbiyot instituti", program: "Pediatriya", year: "2024", badge: "Kontrakt" },
      { id: "a7", student: "Nilufar Sattorova", university: "Urganch filiali, TTA", program: "Hamshiralik ishi", year: "2025", badge: "Grant" },
      { id: "a8", student: "Bekzod To'rayev", university: "Buxoro davlat tibbiyot instituti", program: "Tibbiy profilaktika", year: "2025", badge: "Grant" },
      { id: "a9", student: "Zilola Hasanova", university: "Samarqand davlat tibbiyot universiteti", program: "Davolash ishi", year: "2024", badge: "Kontrakt" },
      { id: "a10", student: "Sardor Umarov", university: "Toshkent tibbiyot akademiyasi", program: "Stomatologiya", year: "2025", badge: "Grant" },
      { id: "a11", student: "Kamola Rustamova", university: "Buxoro davlat tibbiyot instituti", program: "Pediatriya", year: "2024", badge: "Grant" },
      { id: "a12", student: "Aziz Shodiyev", university: "Farg'ona jamoat salomatligi tibbiyot instituti", program: "Davolash ishi", year: "2025", badge: "Kontrakt" },
    ],
  },

  parentVideos: {
    title: "Ota-onalardan samimiy tilaklar",
    subtitle:
      "Farzandlari markazimizda tayyorlangan ota-onalarning o'z so'zlari. Videolarni ko'rish uchun kartani bosing.",
    items: [
      // { id, src, poster, name, role, quote }
      // Videolar admin panel -> Ota-onalar videosi bo'limidan galereyadan yuklanadi.
    ],
  },

  gallery: {
    title: "Markazimizdan lavhalar",
    subtitle: "Darslar, laboratoriya mashg'ulotlari va markaz hayotidan suratlar.",
    speed: 55,
    items: [
      // { id, src, caption }
      // Rasmlar admin panel -> Galereya bo'limidan yuklanadi.
    ],
  },

  stats: {
    title: "Raqamlarda markazimiz",
    items: [
      { id: "s1", label: "O'quvchi", value: 500, suffix: "+", icon: "users" },
      { id: "s2", label: "Sertifikat", value: 300, suffix: "+", icon: "award" },
      { id: "s3", label: "Yuqori natija", value: 100, suffix: "+", icon: "trending" },
      { id: "s4", label: "Yo'nalish", value: 8, suffix: "", icon: "layers" },
    ],
  },

  courses: {
    title: "Tayyorlov yo'nalishlari",
    subtitle: "Har bir yo'nalish aniq dastur, tajribali ustoz va o'lchanadigan natija bilan.",
    filters: [
      { id: "barcha", label: "Barchasi" },
      { id: "asosiy", label: "Asosiy fanlar" },
      { id: "qoshimcha", label: "Qo'shimcha fanlar" },
      { id: "til", label: "Til" },
    ],
    items: [
      {
        id: "biologiya",
        category: "asosiy",
        title: "Biologiya — Intensiv",
        tagline: "Tibbiyot uchun asosiy fan",
        desc: "Botanika, zoologiya, odam anatomiyasi va genetika bo'yicha to'liq tayyorgarlik. Har mavzudan test va amaliy mashg'ulot.",
        duration: "9 oy",
        weekly: "Haftasiga 3 kun, 120 daqiqa",
        price: "650 000",
        level: "10–11 sinf va abituriyent",
        book: "Biologiya, DTM abituriyentlar uchun to'plam",
        teacher: "Nodira Rasulova",
        program: [
          "Hujayra biologiyasi va sitologiya",
          "Odam anatomiyasi va fiziologiyasi",
          "Genetika masalalarini yechish",
          "Botanika va zoologiya bo'limlari",
          "Haftalik blok-testlar va xatolar tahlili",
        ],
      },
      {
        id: "kimyo",
        category: "asosiy",
        title: "Kimyo — Intensiv",
        tagline: "Masala yechish ustida ishlaymiz",
        desc: "Umumiy, anorganik va organik kimyo. Formulalar yodlash emas, masala yechish mantiqini shakllantiramiz.",
        duration: "9 oy",
        weekly: "Haftasiga 3 kun, 120 daqiqa",
        price: "650 000",
        level: "10–11 sinf va abituriyent",
        book: "Kimyo masalalar to'plami, 4-nashr",
        teacher: "Shoxrux Qambarov",
        program: [
          "Atom tuzilishi va davriy qonun",
          "Eritmalar va konsentratsiya masalalari",
          "Organik kimyo sinflari",
          "Reaksiya tenglamalarini tuzish",
          "Imtihon formatidagi mock testlar",
        ],
      },
      {
        id: "ona-tili",
        category: "asosiy",
        title: "Ona tili va Adabiyot",
        tagline: "Majburiy blok uchun",
        desc: "Imlo, punktuatsiya va matn tahlili. Majburiy fan blokidan maksimal ball olishga qaratilgan kurs.",
        duration: "6 oy",
        weekly: "Haftasiga 2 kun, 90 daqiqa",
        price: "420 000",
        level: "11 sinf va abituriyent",
        book: "Ona tili amaliyoti, DTM to'plami",
        teacher: "Gulnora Sattorova",
        program: [
          "Imlo va tinish belgilari qoidalari",
          "Grammatik tahlil turlari",
          "Adabiy asarlar va mualliflar",
          "DTM formatidagi haftalik testlar",
        ],
      },
      {
        id: "anatomiya",
        category: "qoshimcha",
        title: "Anatomiya asoslari",
        tagline: "Institutga birinchi kursdan tayyor kiring",
        desc: "Muljallar, sistemalar va tibbiy terminologiya. Muljallangan modellar bilan amaliy mashg'ulotlar.",
        duration: "4 oy",
        weekly: "Haftasiga 2 kun, 90 daqiqa",
        price: "480 000",
        level: "Abituriyent va 1-kurs",
        book: "Odam anatomiyasi atlasi",
        teacher: "Otabek Nazarov",
        program: [
          "Tayanch-harakat sistemasi",
          "Ichki a'zolar tuzilishi",
          "Nerv sistemasi va sezgi organlari",
          "Lotin tilidagi asosiy terminlar",
        ],
      },
      {
        id: "medical-english",
        category: "til",
        title: "Medical English",
        tagline: "Tibbiy ingliz tili",
        desc: "Tibbiy matnlarni o'qish, terminologiya va bemor bilan muloqot uchun ingliz tili.",
        duration: "6 oy",
        weekly: "Haftasiga 3 kun, 80 daqiqa",
        price: "590 000",
        level: "Pre-Intermediate — Advanced",
        book: "English for Medicine, Oxford",
        teacher: "Madina Yusupova",
        program: [
          "Tibbiy terminologiya asoslari",
          "Ilmiy maqolalarni o'qish",
          "Bemor bilan muloqot senariylari",
          "Speaking club va prezentatsiya",
        ],
      },
      {
        id: "matematika",
        category: "qoshimcha",
        title: "Matematika",
        tagline: "Mantiqiy fikrlashni mustahkamlash",
        desc: "Farmatsevtika va tibbiy biologiya yo'nalishlari uchun zarur matematik tayyorgarlik.",
        duration: "6 oy",
        weekly: "Haftasiga 2 kun, 90 daqiqa",
        price: "450 000",
        level: "9–11 sinf",
        book: "Matematika praktikum, 3-nashr",
        teacher: "Jasur Tojiboyev",
        program: [
          "Algebraik ifodalar va tenglamalar",
          "Foiz va nisbat masalalari",
          "Funksiyalar va grafiklar",
          "Haftalik nazorat ishlari",
        ],
      },
    ],
  },

  results: {
    title: "Natijalarimiz gapirsin",
    subtitle: "O'quvchilarimizning kirish oldi va keyingi ball natijalari.",
    filters: ["Barchasi", "Biologiya", "Kimyo", "Ona tili", "Boshqa"],
    items: [
      { id: "r1", name: "Diyora Ergasheva", type: "Biologiya", prev: "62%", result: "94%" },
      { id: "r2", name: "Jasurbek Qodirov", type: "Kimyo", prev: "55%", result: "91%" },
      { id: "r3", name: "Sevinch Nazarova", type: "Biologiya", prev: "70%", result: "96%" },
      { id: "r4", name: "Islom Rahmatov", type: "Ona tili", prev: "68%", result: "92%" },
      { id: "r5", name: "Malika Yusupova", type: "Kimyo", prev: "48%", result: "88%" },
      { id: "r6", name: "Doston Aliyev", type: "Boshqa", prev: "B1", result: "C1 (Ingliz tili)" },
    ],
  },

  teachers: {
    title: "Markaz ustozlari",
    subtitle: "Har biri tibbiyot oliygohini bitirgan yoki o'z sohasida sertifikatlangan mutaxassis.",
    items: [
      { id: "t1", name: "Nodira Rasulova", subject: "Biologiya", exp: "12 yil tajriba", cert: "BuxDTI, oliy toifa", bio: "Yuzlab o'quvchini tibbiyot oliygohiga tayyorlagan, genetika bo'yicha mutaxassis.", photo: "" },
      { id: "t2", name: "Shoxrux Qambarov", subject: "Kimyo", exp: "8 yil tajriba", cert: "Respublika olimpiada murabbiyi", bio: "Masala yechish metodikasi bo'yicha o'z uslubini ishlab chiqqan ustoz.", photo: "" },
      { id: "t3", name: "Gulnora Sattorova", subject: "Ona tili va adabiyot", exp: "15 yil tajriba", cert: "Oliy toifali o'qituvchi", bio: "Majburiy fan blokidan yuqori ball olishda katta tajribaga ega.", photo: "" },
      { id: "t4", name: "Otabek Nazarov", subject: "Anatomiya / Medical English", exp: "6 yil tajriba", cert: "TTA bitiruvchisi", bio: "Amaliy modellar va vizual materiallar bilan o'rgatish uslubi bilan tanilgan.", photo: "" },
    ],
  },

  whyUs: {
    title: "Nega aynan biz?",
    subtitle: "",
    items: [
      { id: "w1", icon: "stethoscope", title: "Faqat tibbiyot yo'nalishi", desc: "Barcha kuchimiz bitta maqsadga — tibbiyot oliygohiga kirishga qaratilgan." },
      { id: "w2", icon: "trending", title: "O'lchanadigan natija", desc: "Har oyda progress-test va ota-onaga yozma hisobot." },
      { id: "w3", icon: "microscope", title: "Amaliy mashg'ulotlar", desc: "Anatomik modellar va laboratoriya ishlari bilan jonli darslar." },
      { id: "w4", icon: "layers", title: "Kichik guruhlar", desc: "Guruhda 10–12 nafar o'quvchi, har biriga alohida e'tibor." },
      { id: "w5", icon: "users", title: "Individual reja", desc: "Kirish testidan so'ng har bir o'quvchiga shaxsiy yo'l xaritasi." },
      { id: "w6", icon: "award", title: "Bitiruvchilar jamoasi", desc: "Institutga kirgan o'quvchilarimiz bilan doimiy aloqa va yordam." },
    ],
  },

  process: {
    title: "Qanday o'qiymiz",
    items: [
      { id: "p1", title: "Ariza qoldirasiz", desc: "Formani to'ldirasiz, administrator bir ish kuni ichida bog'lanadi." },
      { id: "p2", title: "Kirish testi", desc: "Biologiya va kimyodan joriy darajangiz aniqlanadi." },
      { id: "p3", title: "Guruhga joylashish", desc: "Darajangiz va qulay vaqtingizga mos guruh tanlanadi." },
      { id: "p4", title: "Tayyorgarlik boshlanadi", desc: "Reja asosida o'qiysiz, har oyda natija o'lchanadi." },
    ],
  },

  branches: {
    title: "Filiallarimiz",
    subtitle: "Sizga eng qulay filialni tanlang.",
    items: [
      { id: "br1", name: "Markaziy filial", isMain: true, address: "Buxoro shahri, Mustaqillik ko'chasi, 24-uy", phone: "+998 65 223 10 10", hours: "Dush–Shan: 08:00–20:00" },
      { id: "br2", name: "G'ijduvon filiali", isMain: false, address: "G'ijduvon tumani, Navoiy ko'chasi, 7-uy", phone: "+998 65 223 20 20", hours: "Dush–Shan: 09:00–19:00" },
      { id: "br3", name: "Kogon filiali", isMain: false, address: "Kogon shahri, Amir Temur ko'chasi, 15-uy", phone: "+998 65 223 30 30", hours: "Dush–Shan: 09:00–19:00" },
    ],
  },

  faq: {
    title: "Ko'p so'raladigan savollar",
    items: [
      { id: "f1", q: "Kurs narxlari qancha?", a: "Yo'nalishga qarab 420 000 so'mdan 650 000 so'mgacha. Har bir yo'nalish kartasida aniq narx ko'rsatilgan." },
      { id: "f2", q: "Darajam qanday aniqlanadi?", a: "Ro'yxatdan o'tgach, biologiya va kimyodan qisqa kirish testi topshirasiz. Natijaga qarab mos guruh tavsiya etiladi." },
      { id: "f3", q: "Sinov darsi bormi?", a: "Ha, har bir yo'nalish bo'yicha bitta bepul sinov darsiga yozilishingiz mumkin. Ariza formasida izohda yozib qoldiring." },
      { id: "f4", q: "Bir guruhda nechta o'quvchi bo'ladi?", a: "Guruhlar 10–12 nafar o'quvchidan iborat. Bu har bir o'quvchiga yetarli e'tibor berish imkonini beradi." },
      { id: "f5", q: "Darslar qachon boshlanadi?", a: "Yangi guruhlar har oy boshida to'planadi. Aniq sana haqida administrator ma'lum qiladi." },
      { id: "f6", q: "Ota-onalar natijani qanday kuzatadi?", a: "Har oyda progress-test o'tkaziladi va natijalar ota-onaga yozma tarzda yetkaziladi." },
    ],
  },

  form: {
    title: "Qabulga yozilish",
    subtitle: "Formani to'ldiring, administratorimiz siz bilan bog'lanadi.",
    levels: ["Boshlang'ich", "O'rta", "Kuchli", "Abituriyent"],
    times: ["Ertalabki (08:00–11:00)", "Kunduzgi (11:00–15:00)", "Kechki (15:00–20:00)"],
    successTitle: "Arizangiz qabul qilindi",
    successText: "Administratorimiz bir ish kuni ichida siz bilan bog'lanadi.",
  },

  cta: {
    title: "Tibbiyotga yo'l bugundan boshlanadi.",
    subtitle: "Joylar cheklangan — guruhlar to'lgunicha ariza qoldiring.",
    primary: "Qabulga yozilish",
    secondary: "Yo'nalishlarni ko'rish",
  },

  footer: {
    about: "Tibbiyot oliygohiga tayyorlov markazi — bilimni natijaga aylantiramiz.",
    copyright: "Barcha huquqlar himoyalangan.",
  },
};

/** Navigatsiya havolalari — bo'lim id'lari bilan bog'liq, shuning uchun kodda turadi. */
export const NAV_LINKS = [
  { id: "hero", label: "Bosh sahifa" },
  { id: "qabul", label: "Talabalarimiz" },
  { id: "kurslar", label: "Yo'nalishlar" },
  { id: "tilaklar", label: "Ota-onalar" },
  { id: "lavhalar", label: "Lavhalar" },
  { id: "ustozlar", label: "Ustozlar" },
  { id: "aloqa", label: "Aloqa" },
];
