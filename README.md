# Gaji Belum Turun 💸

Game browser absurd tentang bertahan hidup dari tanggal 25 sampai tanggal 1.

## Gameplay v2 — Hard Mode

Versi ini dibuat lebih menantang dan lebih replayable:

- 12 ronde: pagi + malam dari tanggal 25 sampai 30
- 3 difficulty: Santuy, Realistis, Nekat
- 20+ random event dengan 3 pilihan
- Risk roll dengan peluang sukses dinamis
- Stat sosial/mental ikut memengaruhi beberapa peluang
- Drain lapar dan mental setiap ronde
- Biaya hidup otomatis setiap malam
- Utang berbunga setiap malam
- Kekurangan saldo otomatis berubah menjadi utang darurat + fee
- 44% peluang random crisis setiap malam
- Game over jika mental/lapar habis atau utang melewati limit
- Tingkat Panik yang berubah sesuai kondisi pemain
- Banyak ending dan survival score
- Web Share API + fallback copy
- Responsive untuk HP dan desktop

## Difficulty

### 😌 Santuy
Modal lebih besar, biaya hidup dan bunga lebih rendah.

### 😬 Realistis
Mode default. Kesalahan mulai terasa dan utang cepat berkembang.

### 💀 Nekat
Modal tipis, biaya hidup tinggi, bunga brutal, tetapi multiplier skor lebih besar.

## Jalankan lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Deploy ke Vercel

Import repository ini ke Vercel. Framework akan terdeteksi otomatis sebagai Next.js dan versi ini tidak membutuhkan environment variable atau database.

## Kandidat fitur berikutnya

- Daily Challenge dengan seed yang sama untuk semua pemain
- Leaderboard
- Share card hasil berbentuk gambar
- Achievement tersembunyi
- Sound effect dan haptic feedback
- Event berantai yang mengingat keputusan sebelumnya
- Statistik global pilihan pemain
