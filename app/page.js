"use client";

import { useMemo, useState } from "react";

const STARTING_BALANCE = 327500;
const DAYS = [25, 26, 27, 28, 29, 30];

const EVENTS = [
  {
    icon: "☕",
    title: "Teman ngajak ngopi",
    text: '"Ngopi bentar yuk. Cuma 35 ribu kok." Kalimat yang terdengar murah sebelum tanggal tua.',
    choices: [
      { label: "Gas, hidup cuma sekali", money: -35000, mental: 14, social: 12, coffee: 1, result: "Kopi enak. Saldo menangis pelan." },
      { label: "Pura-pura ketiduran", mental: -4, social: -9, result: "Saldo aman, reputasi sebagai manusia sibuk naik." },
    ],
  },
  {
    icon: "🛒",
    title: "FLASH SALE 90%",
    text: "Barang yang tidak kamu butuhkan mendadak terasa seperti kebutuhan primer.",
    choices: [
      { label: "Checkout. Mumpung diskon!", money: -79000, mental: 8, impulse: 1, result: "Hemat 90% dari harga yang sebenarnya tidak perlu kamu bayar." },
      { label: "Tutup aplikasi sekarang", mental: -5, result: "Kamu menang melawan algoritma. Untuk sementara." },
    ],
  },
  {
    icon: "⛽",
    title: "Bensin tinggal doa",
    text: "Jarum bensin sudah lebih rendah daripada ekspektasimu terhadap hidup.",
    choices: [
      { label: "Isi Rp30.000", money: -30000, mental: 6, result: "Motor selamat. Dompet sedikit lebih ringan." },
      { label: "Naik motor pakai keyakinan", mental: -14, result: "Kamu menemukan arti sebenarnya dari eco driving." },
    ],
  },
  {
    icon: "💡",
    title: "Token listrik kritis",
    text: "Meteran berbunyi bip bip seperti sedang mengejek kondisi keuanganmu.",
    choices: [
      { label: "Beli token Rp50.000", money: -50000, mental: 10, result: "Lampu menyala. Masa depan belum tentu." },
      { label: "Mode hemat ekstrem", mental: -18, result: "Kipas mati. Kamu belajar meditasi lewat keringat." },
    ],
  },
  {
    icon: "💍",
    title: "Teman menikah",
    text: "Undangan datang. Ternyata cinta orang lain juga berdampak ke rekeningmu.",
    choices: [
      { label: "Datang + amplop Rp100.000", money: -100000, social: 22, mental: 6, result: "Pertemanan +22. Saldo terkena damage critical." },
      { label: "Doakan dari story saja", social: -18, mental: -3, result: "Kamu mengirim emoji ❤️ dengan kekuatan finansial penuh." },
    ],
  },
  {
    icon: "📦",
    title: "Paket COD misterius",
    text: "Kurir datang membawa paket. Kamu samar-samar ingat checkout jam 01:37.",
    choices: [
      { label: "Bayar Rp68.000", money: -68000, impulse: 1, mental: 5, result: "Selamat datang, barang yang kemarin terasa penting." },
      { label: "Tatap kurir dengan rasa bersalah", mental: -12, result: "Paket kembali. Harga diri ikut sedikit terkirim." },
    ],
  },
  {
    icon: "🍜",
    title: "Makan malam",
    text: "Perut lapar. Aplikasi delivery dengan sopan menawarkan makanan Rp47.000.",
    choices: [
      { label: "Pesan makanan proper", money: -47000, hunger: 28, mental: 8, result: "Perut bahagia. Rekening mempertanyakan prioritas." },
      { label: "Indomie lagi", money: -6500, hunger: 16, mental: -4, noodles: 1, result: "Indomie ke sekian. Tubuhmu mulai 12% micin." },
    ],
  },
  {
    icon: "👩",
    title: "Ibu chat",
    text: '"Nak, ada uang lebih?" Pertanyaan sederhana dengan damage emosional besar.',
    choices: [
      { label: "Kirim Rp100.000 ❤️", money: -100000, mental: 18, social: 8, result: "Saldo turun. Hati naik." },
      { label: "Matikan centang biru", mental: -20, social: -7, result: "Kamu aman secara finansial, tidak secara batin." },
    ],
  },
  {
    icon: "🎂",
    title: "Teman kantor ulang tahun",
    text: "Grup kantor mulai: 'Patungan 25 ribu ya teman-teman 🙏'.",
    choices: [
      { label: "Ikut patungan", money: -25000, social: 13, result: "Kue bukan kamu yang makan banyak, tapi kamu ikut membayar." },
      { label: "Mute grup 8 jam", social: -12, mental: 3, result: "Notifikasi hilang. Masalah secara teknis belum." },
    ],
  },
  {
    icon: "💸",
    title: "Teman nagih utang",
    text: '"Bro yang 20 ribu kemarin..." Dia masih ingat. Tentu saja dia ingat.',
    choices: [
      { label: "Bayar sekarang", money: -20000, social: 10, mental: 5, result: "Utang lunas. Integritas finansial terselamatkan." },
      { label: '"Besok ya bro"', social: -8, mental: -9, result: "Besok adalah konsep yang sangat fleksibel." },
    ],
  },
  {
    icon: "🍔",
    title: "Gebetan ngajak makan",
    text: '"Laper nih 🥺" Satu emoji yang berpotensi mengubah APBN pribadi.',
    choices: [
      { label: "Ajak makan Rp85.000", money: -85000, social: 24, mental: 15, result: "Chemistry naik. Likuiditas turun." },
      { label: '"Aku lagi intermittent fasting"', social: -13, mental: -6, result: "Metode diet baru: tidak punya uang." },
    ],
  },
  {
    icon: "🏦",
    title: "Biaya admin muncul",
    text: "Rp6.500. Kecil saat gajian, terasa seperti pajak kerajaan saat tanggal tua.",
    choices: [
      { label: "Terima kenyataan", money: -6500, mental: -4, result: "Tidak ada tombol menolak. Realistis sekali." },
      { label: "Marah ke aplikasi 30 detik", money: -6500, mental: 2, result: "Uang tetap hilang, tapi kamu merasa didengar." },
    ],
  },
  {
    icon: "🎮",
    title: "Game favorit lagi diskon",
    text: "Diskon 70%. Otakmu menghitung ini sebagai investasi kebahagiaan.",
    choices: [
      { label: "Beli Rp59.000", money: -59000, mental: 18, impulse: 1, result: "Library bertambah satu. Waktu bermain tetap nol." },
      { label: "Wishlist sampai kaya", mental: -7, result: "Disiplin finansial +1. Kesedihan +7." },
    ],
  },
  {
    icon: "🚕",
    title: "Hujan deras pas pulang",
    text: "Pilihan hidup mengecil menjadi: basah atau bayar.",
    choices: [
      { label: "Pesan ojol Rp42.000", money: -42000, mental: 9, result: "Sampai rumah kering. Saldo ikut mengering." },
      { label: "Tunggu hujan reda", mental: -11, hunger: -7, result: "Satu jam kemudian kamu hafal semua lagu minimarket." },
    ],
  },
  {
    icon: "🥤",
    title: "Promo BUY 1 GET 1",
    text: "Kamu cuma butuh satu, tetapi kapitalisme punya rencana lain.",
    choices: [
      { label: "Ambil dong, untung!", money: -36000, mental: 7, impulse: 1, result: "Kamu menghemat dengan cara mengeluarkan uang." },
      { label: "Lewati dengan kepala tegak", mental: 2, result: "Marketing team gagal hari ini." },
    ],
  },
  {
    icon: "📱",
    title: "Kuota internet habis",
    text: "Internet mati. Dunia mendadak tahun 2004.",
    choices: [
      { label: "Beli paket Rp45.000", money: -45000, mental: 10, result: "Kamu kembali terhubung ke internet dan masalahnya." },
      { label: "Numpang Wi-Fi tetangga", mental: -8, social: -4, result: "Sinyal satu bar. Martabat setengah bar." },
    ],
  },
  {
    icon: "🧺",
    title: "Laundry menumpuk",
    text: "Baju bersih tersisa satu. Dan itu kaos event 2019.",
    choices: [
      { label: "Laundry Rp28.000", money: -28000, mental: 8, result: "Kehidupan terasa sedikit lebih tertata." },
      { label: "Cuci manual tengah malam", mental: -12, result: "Gratis secara finansial, mahal secara emosional." },
    ],
  },
  {
    icon: "💳",
    title: "PayLater menggoda",
    text: '"Bayar bulan depan aja." Bulan depan kamu membaca kalimat yang sama.',
    choices: [
      { label: "Ambil Rp100.000 dulu", money: 100000, debt: 120000, mental: 12, result: "Saldo bernafas. Masa depan menagih bunga." },
      { label: "Tidak. Kita harus kuat.", mental: -8, result: "Karakter berkembang melalui penderitaan." },
    ],
  },
];

const clamp = (value) => Math.max(0, Math.min(100, value));
const rupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getEnding(stats) {
  if (stats.debt >= 250000) {
    return { emoji: "🤡", title: "PAYLATER ENJOYER", text: "Kamu sampai tanggal 1... ditemani tagihan dari masa depan." };
  }
  if (stats.noodles >= 3) {
    return { emoji: "🍜", title: "INDOMIE SURVIVOR", text: "Secara teknis kamu bertahan. Secara nutrisi, kita tidak bahas." };
  }
  if (stats.impulse >= 3) {
    return { emoji: "🛍️", title: "FINANCIAL CLOWN", text: "Bukan boros. Kamu hanya sangat mendukung pertumbuhan ekonomi." };
  }
  if (stats.balance >= 180000 && stats.social <= 45) {
    return { emoji: "🧘", title: "FINANCIAL MONK", text: "Saldo utuh, pergaulan tinggal kenangan." };
  }
  if (stats.mental <= 25) {
    return { emoji: "🫠", title: "TANGGAL TUA VETERAN", text: "Dompet selamat. Mental meninggalkan grup." };
  }
  if (stats.balance >= 100000 && stats.debt === 0) {
    return { emoji: "👑", title: "SULTAN TANGGAL TUA", text: "Kamu berhasil sampai gajian tanpa menjual ginjal." };
  }
  return { emoji: "🏁", title: "SURVIVOR TANGGAL TUA", text: "Tipis, dramatis, tapi kamu sampai tanggal 1." };
}

function Meter({ icon, label, value }) {
  return (
    <div className="meter">
      <div className="meterTop">
        <span>{icon} {label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="meterTrack">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState("intro");
  const [dayIndex, setDayIndex] = useState(0);
  const [eventOrder, setEventOrder] = useState([]);
  const [picked, setPicked] = useState(null);
  const [reaction, setReaction] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    balance: STARTING_BALANCE,
    mental: 100,
    hunger: 80,
    social: 70,
    debt: 0,
    noodles: 0,
    impulse: 0,
    coffee: 0,
  });

  const currentEvent = eventOrder[dayIndex];
  const ending = useMemo(() => getEnding(stats), [stats]);
  const score = Math.max(
    0,
    Math.round(stats.balance + stats.mental * 800 + stats.hunger * 350 + stats.social * 250 - stats.debt)
  );

  function startGame() {
    setStats({
      balance: STARTING_BALANCE,
      mental: 100,
      hunger: 80,
      social: 70,
      debt: 0,
      noodles: 0,
      impulse: 0,
      coffee: 0,
    });
    setEventOrder(shuffle(EVENTS).slice(0, DAYS.length));
    setDayIndex(0);
    setPicked(null);
    setReaction("");
    setCopied(false);
    setScreen("game");
  }

  function choose(choice, index) {
    if (picked !== null) return;

    setStats((prev) => {
      let balance = prev.balance + (choice.money || 0);
      let extraDebt = 0;

      if (balance < 0) {
        extraDebt = Math.abs(balance);
        balance = 0;
      }

      return {
        balance,
        mental: clamp(prev.mental + (choice.mental || 0)),
        hunger: clamp(prev.hunger + (choice.hunger || -4)),
        social: clamp(prev.social + (choice.social || 0)),
        debt: prev.debt + (choice.debt || 0) + extraDebt,
        noodles: prev.noodles + (choice.noodles || 0),
        impulse: prev.impulse + (choice.impulse || 0),
        coffee: prev.coffee + (choice.coffee || 0),
      };
    });

    setPicked(index);
    setReaction(choice.result);
  }

  function nextDay() {
    if (dayIndex === DAYS.length - 1) {
      setScreen("result");
      return;
    }
    setDayIndex((value) => value + 1);
    setPicked(null);
    setReaction("");
  }

  async function shareResult() {
    const text = `💸 GAJI BELUM TURUN

Aku dapat: ${ending.title}
💰 Saldo akhir: ${rupiah(stats.balance)}
💳 Utang: ${rupiah(stats.debt)}
🍜 Indomie: ${stats.noodles}x
🏆 Skor: ${score.toLocaleString("id-ID")}

Bisa lebih survive dari aku?`;

    try {
      if (navigator.share) {
        await navigator.share({ title: "Gaji Belum Turun", text, url: window.location.href });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  if (screen === "intro") {
    return (
      <main className="appShell introShell">
        <section className="hero">
          <div className="eyebrow">GAME SURVIVAL PALING RELATE 💸</div>
          <div className="walletArt" aria-hidden="true">
            <span className="walletFace">🥲</span>
            <span className="coin coinOne">🪙</span>
            <span className="coin coinTwo">🪙</span>
          </div>
          <h1>GAJI<br /><span>BELUM TURUN</span></h1>
          <p className="heroText">
            Bertahan dari tanggal <strong>25</strong> sampai tanggal <strong>1</strong>.
            Jangan bangkrut. Jangan banyak gaya.
          </p>
          <div className="startingCard">
            <span>Modal hidupmu</span>
            <strong>{rupiah(STARTING_BALANCE)}</strong>
            <small>dan keputusan finansial yang meragukan</small>
          </div>
          <button className="primaryButton" onClick={startGame}>
            MULAI BERTAHAN HIDUP →
          </button>
          <p className="microcopy">Tidak ada edukasi finansial serius di sini. Cuma penderitaan.</p>
        </section>
      </main>
    );
  }

  if (screen === "result") {
    return (
      <main className="appShell resultShell">
        <section className="resultCard">
          <div className="paydayBanner">🎉 TANGGAL 1 — GAJI TURUN!</div>
          <div className="endingEmoji">{ending.emoji}</div>
          <p className="resultKicker">HASIL SURVIVAL KAMU</p>
          <h1>{ending.title}</h1>
          <p className="endingText">{ending.text}</p>

          <div className="resultStats">
            <div><span>💰 Saldo akhir</span><strong>{rupiah(stats.balance)}</strong></div>
            <div><span>💳 Utang</span><strong>{rupiah(stats.debt)}</strong></div>
            <div><span>🍜 Makan Indomie</span><strong>{stats.noodles}x</strong></div>
            <div><span>🛍️ Khilaf</span><strong>{stats.impulse}x</strong></div>
          </div>

          <div className="scoreBox">
            <span>SURVIVAL SCORE</span>
            <strong>{score.toLocaleString("id-ID")}</strong>
          </div>

          <button className="primaryButton" onClick={shareResult}>
            {copied ? "HASIL DISALIN! ✓" : "SHARE HASIL KE TEMAN ↗"}
          </button>
          <button className="secondaryButton" onClick={startGame}>MAIN LAGI</button>
          <p className="challengeText">Kirim ke temanmu yang selalu bilang: “Masih ada uang kok.”</p>
        </section>
      </main>
    );
  }

  return (
    <main className="appShell">
      <section className="gameWrap">
        <header className="topbar">
          <div>
            <span className="dayLabel">TANGGAL</span>
            <strong className="dayNumber">{DAYS[dayIndex]}</strong>
          </div>
          <div className="balanceBox">
            <span>SALDO</span>
            <strong>{rupiah(stats.balance)}</strong>
            {stats.debt > 0 && <small>Utang: {rupiah(stats.debt)}</small>}
          </div>
        </header>

        <div className="progressDays" aria-label="Progress tanggal tua">
          {DAYS.map((day, index) => (
            <span key={day} className={index <= dayIndex ? "active" : ""}>{day}</span>
          ))}
          <span className="paydayDot">1 💸</span>
        </div>

        <div className="metersGrid">
          <Meter icon="❤️" label="Mental" value={stats.mental} />
          <Meter icon="🍜" label="Kenyang" value={stats.hunger} />
          <Meter icon="👥" label="Sosial" value={stats.social} />
        </div>

        {currentEvent && (
          <article className="eventCard">
            <div className="eventIcon">{currentEvent.icon}</div>
            <p className="eventKicker">KEJADIAN HARI INI</p>
            <h2>{currentEvent.title}</h2>
            <p className="eventText">{currentEvent.text}</p>

            <div className="choices">
              {currentEvent.choices.map((choice, index) => (
                <button
                  key={choice.label}
                  className={`choiceButton ${picked === index ? "selected" : ""} ${picked !== null && picked !== index ? "muted" : ""}`}
                  onClick={() => choose(choice, index)}
                  disabled={picked !== null}
                >
                  <span>{choice.label}</span>
                  {choice.money !== undefined && choice.money !== 0 && (
                    <strong className={choice.money < 0 ? "cost" : "gain"}>
                      {choice.money < 0 ? "-" : "+"}{rupiah(Math.abs(choice.money))}
                    </strong>
                  )}
                </button>
              ))}
            </div>

            {picked !== null && (
              <div className="reactionBox">
                <p>{reaction}</p>
                <button className="nextButton" onClick={nextDay}>
                  {dayIndex === DAYS.length - 1 ? "MENUJU TANGGAL 1 →" : "LANJUT BESOK →"}
                </button>
              </div>
            )}
          </article>
        )}

        <p className="footerJoke">Target utama: jangan buka PayLater. Target realistis: semoga.</p>
      </section>
    </main>
  );
}
