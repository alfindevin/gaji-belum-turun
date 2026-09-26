export const DAYS = [25, 26, 27, 28, 29, 30];

export const DIFFICULTIES = {
  santuy: {
    id: "santuy",
    label: "SANTUY",
    emoji: "😌",
    description: "Masih bisa salah 1–2 kali.",
    startingBalance: 420000,
    dailyCost: 7000,
    debtLimit: 520000,
    interest: 0.05,
    scoreMultiplier: 0.8,
  },
  realistis: {
    id: "realistis",
    label: "REALISTIS",
    emoji: "😬",
    description: "Salah keputusan mulai terasa.",
    startingBalance: 280000,
    dailyCost: 12000,
    debtLimit: 400000,
    interest: 0.08,
    scoreMultiplier: 1,
  },
  nekat: {
    id: "nekat",
    label: "NEKAT",
    emoji: "💀",
    description: "Dompet tipis, masalah tebal.",
    startingBalance: 190000,
    dailyCost: 16000,
    debtLimit: 320000,
    interest: 0.12,
    scoreMultiplier: 1.35,
  },
};

export const CHAOS_EVENTS = [
  {
    icon: "🛞",
    title: "Ban bocor dadakan",
    text: "Tukang tambal ban: 'Tiga puluh ribu, Mas.'",
    effects: { money: -30000, mental: -5 },
  },
  {
    icon: "🏦",
    title: "Biaya admin menyerang",
    text: "Angkanya kecil saat gajian. Sekarang terasa personal.",
    effects: { money: -6500, mental: -2 },
  },
  {
    icon: "🎁",
    title: "Cashback nyasar",
    text: "Akhirnya algoritma melakukan sesuatu yang berguna.",
    effects: { money: 18000, mental: 4 },
  },
  {
    icon: "🧾",
    title: "Patungan kantor",
    text: "Ada yang ulang tahun. Grup kantor tidak menerima kata 'nanti'.",
    effects: { money: -25000, social: 5 },
  },
  {
    icon: "💵",
    title: "Teman bayar utang",
    text: "Mukjizat finansial: dia ternyata ingat.",
    effects: { money: 40000, mental: 6 },
  },
  {
    icon: "🌧️",
    title: "Hujan + surge price",
    text: "Tarif ojol ikut naik bersama tingkat kepanikan.",
    effects: { money: -28000, mental: -4 },
  },
];

export const EVENTS = [
  {
    icon: "🍳",
    title: "Sarapan atau sok kuat?",
    text: "Jam 08.10. Perut bunyi, meeting jam 09.00, saldo mulai bikin minder.",
    choices: [
      { label: "Bubur + kopi", hint: "Aman, tapi dompet kena", effects: { money: -24000, hunger: 22, mental: 6 } },
      { label: "Roti minimarket", hint: "Sedang-sedang saja", effects: { money: -12000, hunger: 13, mental: 2 } },
      { label: "Skip. Minum air putih", hint: "Gratis, lapar makin brutal", effects: { hunger: -13, mental: -5 }, danger: true },
    ],
  },
  {
    icon: "☕",
    title: "Teman ngajak ngopi",
    text: "'Cuma bentar kok.' Kalimat yang sering berakhir dengan dua jam dan bill 48 ribu.",
    choices: [
      { label: "Ikut nongkrong", hint: "Sosial naik", effects: { money: -48000, mental: 10, social: 16, coffee: 1 } },
      { label: "Pesan es teh saja", hint: "Masih nongkrong, lebih hemat", effects: { money: -12000, mental: 4, social: 8 } },
      { label: "Pura-pura ada urusan", hint: "Saldo aman, circle curiga", effects: { social: -14, mental: -3 } },
    ],
  },
  {
    icon: "🛒",
    title: "Flash sale tinggal 04:59",
    text: "Barang tidak penting. Timer merah. Otakmu mendadak kehilangan fungsi eksekutif.",
    choices: [
      { label: "Checkout sekarang", hint: "Diskon 78% katanya", effects: { money: -79000, mental: 9, impulse: 1 } },
      { label: "Masukkan wishlist", hint: "Sedikit sakit, cukup aman", effects: { mental: -3 } },
      {
        label: "Coba jual barang lama dulu",
        hint: "🎲 60% laku",
        effects: { mental: -4 },
        risk: {
          chance: 60,
          skill: "social",
          successText: "Laku! Ternyata ada yang butuh barang itu.",
          failureText: "Yang masuk cuma chat: '30 ribu angkut sekarang kak?'",
          success: { money: 65000, mental: 8 },
          failure: { mental: -7 },
        },
      },
    ],
  },
  {
    icon: "💡",
    title: "Token listrik tinggal 3%",
    text: "Meteran bunyi bip. Rasanya seperti bom waktu, tapi lebih domestik.",
    choices: [
      { label: "Isi Rp50.000", hint: "Aman sampai gajian", effects: { money: -50000, mental: 9 } },
      { label: "Isi Rp20.000", hint: "Bisa cukup, bisa bip lagi", effects: { money: -20000, mental: 2 } },
      { label: "Matikan semuanya", hint: "Gratis, mental roasting", effects: { mental: -16, hunger: -3 }, danger: true },
    ],
  },
  {
    icon: "💻",
    title: "Ada freelance mendadak",
    text: "Deadline malam ini. Fee lumayan. Klien bilang: 'Revisi dikit kok.'",
    choices: [
      { label: "Ambil job", hint: "🎲 70% dibayar malam ini", effects: { mental: -14, hunger: -8 }, risk: {
        chance: 70,
        skill: "mental",
        successText: "Transfer masuk. Revisi ternyata cuma tiga belas kali.",
        failureText: "Klien: 'Invoice-nya aku proses minggu depan ya.'",
        success: { money: 85000, mental: 5 },
        failure: { mental: -12 },
      }},
      { label: "Nego DP 50%", hint: "🎲 50% deal", effects: { mental: -7 }, risk: {
        chance: 50,
        skill: "social",
        successText: "Deal. DP masuk sebelum kamu menyentuh file.",
        failureText: "Klien mencari 'yang lebih fleksibel'.",
        success: { money: 45000, social: 4 },
        failure: { social: -5, mental: -5 },
      }},
      { label: "Tolak demi kewarasan", hint: "Dompet sedih, mental aman", effects: { mental: 7 } },
    ],
  },
  {
    icon: "📦",
    title: "Paket COD misterius",
    text: "Kurir sudah di depan. Kamu baru ingat checkout jam 01.37 tiga hari lalu.",
    choices: [
      { label: "Bayar dan terima nasib", hint: "Damage besar", effects: { money: -68000, impulse: 1, mental: 5 } },
      { label: "Tolak paket", hint: "Awkward tapi gratis", effects: { mental: -8, social: -2 } },
      {
        label: "Jual lagi ke teman kantor",
        hint: "🎲 45% ada yang mau",
        effects: { mental: -2 },
        risk: {
          chance: 45,
          skill: "social",
          successText: "Terjual! Margin tipis, harga diri kembali.",
          failureText: "Tidak ada yang mau. Paket sekarang resmi jadi milikmu.",
          success: { money: 18000, social: 4 },
          failure: { money: -68000, impulse: 1, mental: -7 },
        },
      },
    ],
  },
  {
    icon: "🍜",
    title: "Jam makan malam",
    text: "Tubuh minta nutrisi. Aplikasi delivery minta biaya layanan.",
    choices: [
      { label: "Nasi ayam proper", hint: "Perut senang", effects: { money: -42000, hunger: 30, mental: 7 } },
      { label: "Indomie + telur", hint: "Murah, cukup efektif", effects: { money: -9500, hunger: 19, mental: -2, noodles: 1 } },
      { label: "Tidur biar lupa lapar", hint: "Berbahaya kalau hunger rendah", effects: { hunger: -18, mental: -8 }, danger: true },
    ],
  },
  {
    icon: "👩",
    title: "Ibu chat: 'Ada uang lebih?'",
    text: "Tidak ada pilihan yang benar-benar terasa ringan.",
    choices: [
      { label: "Kirim Rp100.000 ❤️", hint: "Hati hangat, rekening dingin", effects: { money: -100000, mental: 16, social: 10 } },
      { label: "Kirim Rp50.000", hint: "Kompromi manusia dewasa", effects: { money: -50000, mental: 8, social: 6 } },
      { label: "Balas: 'Tanggal 1 ya, Bu'", hint: "Tidak keluar uang sekarang", effects: { mental: -10, social: -3 } },
    ],
  },
  {
    icon: "💍",
    title: "Undangan nikah datang",
    text: "Kebahagiaan orang lain lagi-lagi muncul sebagai pos pengeluaran.",
    choices: [
      { label: "Datang + amplop 100k", hint: "Relasi aman", effects: { money: -100000, social: 20, mental: 5 } },
      { label: "Datang + amplop 50k", hint: "Semoga tidak dibuka depan umum", effects: { money: -50000, social: 10 } },
      { label: "Kirim doa lewat story", hint: "Hemat, tapi ketahuan", effects: { social: -18, mental: -4 } },
    ],
  },
  {
    icon: "🏍️",
    title: "Motor minta servis",
    text: "Ada suara 'krek-krek'. Mekanik menatapmu seperti dokter membawa hasil lab.",
    choices: [
      { label: "Servis sekarang", hint: "Mahal, aman", effects: { money: -85000, mental: 10 } },
      { label: "Ganti yang paling penting saja", hint: "Masih ada risiko", effects: { money: -35000, mental: -2 } },
      {
        label: "Tunda sampai gajian",
        hint: "🎲 55% motor bertahan",
        effects: {},
        risk: {
          chance: 55,
          skill: "mental",
          successText: "Motor bertahan. Suaranya sekarang jadi soundtrack.",
          failureText: "Mogok. Kamu tetap ke bengkel, sekarang plus ongkos derek.",
          success: { mental: -5 },
          failure: { money: -120000, mental: -18 },
        },
      },
    ],
  },
  {
    icon: "📱",
    title: "Kuota tinggal 200 MB",
    text: "Besok ada meeting online. Hari ini ada video kucing 4K.",
    choices: [
      { label: "Beli paket 45k", hint: "Aman", effects: { money: -45000, mental: 7 } },
      { label: "Paket hemat 18k", hint: "Cukup kalau disiplin", effects: { money: -18000, mental: 1 } },
      { label: "Hidup dari Wi-Fi publik", hint: "Gratis, bikin capek", effects: { mental: -12, social: -3 } },
    ],
  },
  {
    icon: "🍔",
    title: "Gebetan: 'Laper nih 🥺'",
    text: "Satu emoji. Potensi dampak fiskal: signifikan.",
    choices: [
      { label: "Ajak makan enak", hint: "Romantis, dompet traumatis", effects: { money: -92000, social: 24, mental: 12 } },
      { label: "Ajak ke kaki lima", hint: "Uji kompatibilitas", effects: { money: -32000, social: 12, mental: 5 } },
      {
        label: "Masak bareng di rumah",
        hint: "🎲 65% jadi sweet moment",
        effects: { money: -18000 },
        risk: {
          chance: 65,
          skill: "social",
          successText: "Ternyata seru. Budget aman, chemistry naik.",
          failureText: "Masakannya gosong. Akhirnya pesan delivery juga.",
          success: { social: 18, mental: 10 },
          failure: { money: -52000, mental: -6, social: -4 },
        },
      },
    ],
  },
  {
    icon: "🧺",
    title: "Baju bersih tinggal satu",
    text: "Dan itu kaos event 2019 dengan sponsor segede punggung.",
    choices: [
      { label: "Laundry kiloan", hint: "Praktis", effects: { money: -30000, mental: 8 } },
      { label: "Cuci sendiri malam ini", hint: "Gratis, tenaga habis", effects: { mental: -11, hunger: -4 } },
      { label: "Pakai ulang + parfum", hint: "Risiko sosial", effects: { social: -12, mental: -3 } },
    ],
  },
  {
    icon: "🎮",
    title: "Game wishlist diskon 70%",
    text: "Otak: 'Ini investasi kebahagiaan.' Dompet: tidak memberi komentar.",
    choices: [
      { label: "Beli Rp59.000", hint: "Bahagia sebentar", effects: { money: -59000, mental: 18, impulse: 1 } },
      { label: "Tahan sampai gajian", hint: "Sedih tapi dewasa", effects: { mental: -5 } },
      {
        label: "Jual skin lama",
        hint: "🎲 50% cepat laku",
        effects: {},
        risk: {
          chance: 50,
          skill: "social",
          successText: "Skin laku. Gamer economy menyelamatkanmu.",
          failureText: "Tidak laku. Ada yang cuma nawar tukar tambah.",
          success: { money: 52000, mental: 8 },
          failure: { mental: -5 },
        },
      },
    ],
  },
  {
    icon: "💳",
    title: "PayLater kasih limit baru",
    text: "'Selamat! Limitmu naik.' Kalimat yang terasa seperti hadiah dan ancaman sekaligus.",
    choices: [
      { label: "Ambil 150k sekarang", hint: "Balik 195k", effects: { money: 150000, debt: 195000, mental: 11 } },
      { label: "Ambil 75k saja", hint: "Balik 95k", effects: { money: 75000, debt: 95000, mental: 5 } },
      { label: "Tutup aplikasi", hint: "Mental kena FOMO", effects: { mental: -5 } },
    ],
  },
  {
    icon: "🧑‍💼",
    title: "Bos minta lembur",
    text: "Ada uang makan dan transport. Ada juga sisa kewarasan yang dipertaruhkan.",
    choices: [
      { label: "Lembur sampai malam", hint: "+45k, mental turun", effects: { money: 45000, mental: -18, hunger: -10, social: -5 } },
      { label: "Lembur 2 jam", hint: "+20k", effects: { money: 20000, mental: -9, hunger: -5 } },
      { label: "Pulang tepat waktu", hint: "Mental aman", effects: { mental: 6, social: -3 } },
    ],
  },
  {
    icon: "🎟️",
    title: "Teman jual tiket konser murah",
    text: "Harga teman. Artis favorit. Timing seperti sengaja menguji iman.",
    choices: [
      { label: "Ambil tiket", hint: "Kenangan mahal", effects: { money: -120000, mental: 24, social: 14, impulse: 1 } },
      { label: "Tolak dengan elegan", hint: "FOMO", effects: { mental: -9 } },
      {
        label: "Bantu jual ke orang lain",
        hint: "🎲 60% dapat fee 25k",
        effects: {},
        risk: {
          chance: 60,
          skill: "social",
          successText: "Tiket laku. Kamu dapat fee calo yang legal-ish.",
          failureText: "Tidak laku. Temanmu tetap spam 'UP'.",
          success: { money: 25000, social: 5 },
          failure: { mental: -3 },
        },
      },
    ],
  },
  {
    icon: "🛵",
    title: "Ada order sampingan",
    text: "Teman butuh bantuan antar barang. Bayaran 55k, hujan mulai gerimis.",
    choices: [
      {
        label: "Ambil order",
        hint: "🎲 75% lancar",
        effects: { hunger: -8, mental: -7 },
        risk: {
          chance: 75,
          skill: "mental",
          successText: "Order beres. Uang bensin berubah jadi uang makan.",
          failureText: "Alamatnya muter-muter. Ongkos bensin makan sebagian fee.",
          success: { money: 55000, mental: 4 },
          failure: { money: 12000, mental: -9 },
        },
      },
      { label: "Minta teman lain", hint: "Tidak capek, relasi turun", effects: { social: -8 } },
      { label: "Tolak dan istirahat", hint: "Mental pulih", effects: { mental: 9 } },
    ],
  },
  {
    icon: "🧋",
    title: "Promo BUY 1 GET 1",
    text: "Kamu hanya butuh satu. Marketing tahu kamu punya teman.",
    choices: [
      { label: "Beli. 'Kan hemat'", hint: "Logika promo", effects: { money: -38000, mental: 7, impulse: 1 } },
      { label: "Patungan teman", hint: "Lebih masuk akal", effects: { money: -19000, social: 5, mental: 3 } },
      { label: "Lewati tanpa menoleh", hint: "Menang kecil", effects: { mental: 2 } },
    ],
  },
  {
    icon: "🧾",
    title: "Tagihan streaming auto-renew",
    text: "Kamu lupa cancel. Platform tidak lupa menagih.",
    choices: [
      { label: "Biarkan aktif", hint: "Hiburan tetap ada", effects: { money: -59000, mental: 9 } },
      { label: "Cancel sekarang", hint: "Selamatkan bulan depan", effects: { money: -59000, mental: -2 } },
      {
        label: "Coba minta refund",
        hint: "🎲 40% dikabulkan",
        effects: { mental: -3 },
        risk: {
          chance: 40,
          skill: "mental",
          successText: "Refund disetujui. Customer service hari ini berpihak padamu.",
          failureText: "Ditolak dengan email template yang sangat sopan.",
          success: { mental: 8 },
          failure: { money: -59000, mental: -5 },
        },
      },
    ],
  },
  {
    icon: "🧑‍🤝‍🧑",
    title: "Teman mau pinjam 80k",
    text: "'Besok aku balikin.' Sejarah mencatat kalimat ini dengan mixed results.",
    choices: [
      { label: "Pinjami 80k", hint: "Sosial naik, saldo turun", effects: { money: -80000, social: 18 } },
      { label: "Kasih 20k saja", hint: "Bantu secukupnya", effects: { money: -20000, social: 7 } },
      { label: "Jujur: aku juga sekarat", hint: "Gratis, agak awkward", effects: { social: -5, mental: 3 } },
    ],
  },
  {
    icon: "🧠",
    title: "Mental mulai low-batt",
    text: "Kamu sudah menghitung saldo enam kali dalam 20 menit.",
    choices: [
      { label: "Keluar jalan sebentar", hint: "Biaya kecil, reset kepala", effects: { money: -15000, mental: 18, hunger: 4 } },
      { label: "Rebahan tanpa aplikasi", hint: "Gratis, cukup efektif", effects: { mental: 11 } },
      { label: "Doomscroll sampai 02.00", hint: "Gratis secara finansial", effects: { mental: -14, hunger: -6 }, danger: true },
    ],
  },
];

export const clamp = (value) => Math.max(0, Math.min(100, value));

export const rupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));

export function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
