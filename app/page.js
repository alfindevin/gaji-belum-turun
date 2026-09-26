"use client";

import { useMemo, useState } from "react";
import {
  CHAOS_EVENTS,
  DAYS,
  DIFFICULTIES,
  EVENTS,
  clamp,
  rupiah,
  shuffle,
} from "./gameData";

const TOTAL_TURNS = DAYS.length * 2;

function initialStats(mode) {
  return {
    balance: mode.startingBalance,
    mental: 82,
    hunger: 74,
    social: 65,
    debt: 0,
    noodles: 0,
    impulse: 0,
    coffee: 0,
  };
}

function mergeEffects(...items) {
  return items.reduce((total, item) => {
    if (!item) return total;
    Object.entries(item).forEach(([key, value]) => {
      total[key] = (total[key] || 0) + value;
    });
    return total;
  }, {});
}

function resolveEffects(base, effects) {
  const next = {
    ...base,
    balance: base.balance + (effects.money || 0),
    mental: clamp(base.mental + (effects.mental || 0)),
    hunger: clamp(base.hunger + (effects.hunger || 0)),
    social: clamp(base.social + (effects.social || 0)),
    debt: Math.max(0, base.debt + (effects.debt || 0)),
    noodles: base.noodles + (effects.noodles || 0),
    impulse: base.impulse + (effects.impulse || 0),
    coffee: base.coffee + (effects.coffee || 0),
  };

  if (next.balance < 0) {
    const shortage = Math.abs(next.balance);
    next.balance = 0;
    next.debt += Math.ceil(shortage * 1.15);
  }

  return next;
}

function riskChance(risk, stats) {
  if (!risk) return null;
  const skillValue = stats[risk.skill] ?? 50;
  return Math.round(clamp(risk.chance + (skillValue - 50) * 0.25));
}

function getFatal(stats, mode) {
  if (stats.hunger <= 0) {
    return {
      emoji: "🫥",
      title: "TUMBANG KELAPARAN",
      text: "Kamu terlalu sering menjadikan tidur sebagai menu makan.",
    };
  }

  if (stats.mental <= 0) {
    return {
      emoji: "🫠",
      title: "MENTAL JEBOL",
      text: "Saldo belum tentu nol, tapi sistem operasimu sudah shutdown.",
    };
  }

  if (stats.debt >= mode.debtLimit) {
    return {
      emoji: "💳",
      title: "UTANG MELEDAK",
      text: "Limit utangmu kalah cepat dari masalah yang datang.",
    };
  }

  return null;
}

function getEnding(stats) {
  if (stats.debt >= 220000) {
    return {
      emoji: "🤡",
      title: "PAYLATER ENJOYER",
      text: "Sampai tanggal 1, tapi bulan depan sudah menunggu sambil bawa invoice.",
    };
  }
  if (stats.noodles >= 3) {
    return {
      emoji: "🍜",
      title: "INDOMIE SURVIVOR",
      text: "Kamu hidup, dompet hidup, ginjal tidak ikut memberi komentar.",
    };
  }
  if (stats.impulse >= 3) {
    return {
      emoji: "🛍️",
      title: "FINANCIAL CLOWN",
      text: "Kamu bukan boros. Kamu cuma terlalu aktif mendukung ekonomi.",
    };
  }
  if (stats.balance >= 150000 && stats.debt === 0) {
    return {
      emoji: "👑",
      title: "SULTAN TANGGAL TUA",
      text: "Masih punya saldo dan tanpa utang. Apakah kamu manusia sungguhan?",
    };
  }
  if (stats.mental <= 25 || stats.hunger <= 20) {
    return {
      emoji: "🪫",
      title: "SURVIVOR 1% BATTERY",
      text: "Kamu sampai gajian dengan tenaga yang secara teknis masih terdeteksi.",
    };
  }
  return {
    emoji: "🏁",
    title: "SURVIVOR TANGGAL TUA",
    text: "Tidak elegan. Tidak nyaman. Tapi kamu berhasil sampai tanggal 1.",
  };
}

function Meter({ icon, label, value, dangerAt = 25 }) {
  const danger = value <= dangerAt;
  return (
    <div className={"meter " + (danger ? "meterDanger" : "")}>
      <div className="meterTop">
        <span>{icon} {label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="meterTrack">
        <span style={{ width: value + "%" }} />
      </div>
    </div>
  );
}

function StatDelta({ effects }) {
  const bits = [];
  if (effects.money) bits.push((effects.money > 0 ? "+" : "") + rupiah(effects.money));
  if (effects.mental) bits.push("❤️ " + (effects.mental > 0 ? "+" : "") + effects.mental);
  if (effects.hunger) bits.push("🍜 " + (effects.hunger > 0 ? "+" : "") + effects.hunger);
  if (effects.social) bits.push("👥 " + (effects.social > 0 ? "+" : "") + effects.social);

  if (!bits.length) return <span className="choiceDelta neutral">tanpa efek langsung</span>;

  return (
    <span className={"choiceDelta " + ((effects.money || 0) < 0 ? "negative" : "")}>
      {bits.join(" · ")}
    </span>
  );
}

export default function Home() {
  const [screen, setScreen] = useState("intro");
  const [difficultyId, setDifficultyId] = useState("realistis");
  const [turnIndex, setTurnIndex] = useState(0);
  const [eventOrder, setEventOrder] = useState([]);
  const [picked, setPicked] = useState(null);
  const [reaction, setReaction] = useState(null);
  const [fatal, setFatal] = useState(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState(initialStats(DIFFICULTIES.realistis));

  const mode = DIFFICULTIES[difficultyId];
  const dayIndex = Math.floor(turnIndex / 2);
  const currentDay = DAYS[Math.min(dayIndex, DAYS.length - 1)];
  const phase = turnIndex % 2 === 0 ? "PAGI" : "MALAM";
  const currentEvent = eventOrder[turnIndex];

  const ending = useMemo(() => getEnding(stats), [stats]);
  const score = Math.max(
    0,
    Math.round(
      (
        stats.balance -
        stats.debt +
        stats.mental * 650 +
        stats.hunger * 420 +
        stats.social * 260 +
        Math.min(turnIndex + 1, TOTAL_TURNS) * 6500
      ) * mode.scoreMultiplier
    )
  );

  const pressure = Math.round(
    clamp(
      (100 - stats.mental) * 0.28 +
      (100 - stats.hunger) * 0.24 +
      Math.min(100, (stats.debt / mode.debtLimit) * 100) * 0.34 +
      (100 - stats.social) * 0.14
    )
  );

  function startGame() {
    const selected = DIFFICULTIES[difficultyId];
    setStats(initialStats(selected));
    setEventOrder(shuffle(EVENTS).slice(0, TOTAL_TURNS));
    setTurnIndex(0);
    setPicked(null);
    setReaction(null);
    setFatal(null);
    setCopied(false);
    setScreen("game");
  }

  function choose(choice, index) {
    if (picked !== null) return;

    let effects = mergeEffects(choice.effects, { hunger: -6, mental: -2 });
    let riskText = "";
    let rollText = "";
    let chaos = null;
    let chaosText = "";
    let maintenanceText = "";
    let interestText = "";

    if (choice.risk) {
      const chance = riskChance(choice.risk, stats);
      const roll = Math.floor(Math.random() * 100) + 1;
      const success = roll <= chance;
      effects = mergeEffects(
        effects,
        success ? choice.risk.success : choice.risk.failure
      );
      riskText = success ? choice.risk.successText : choice.risk.failureText;
      rollText = "Dadu: " + roll + " / peluang " + chance + "% — " + (success ? "BERHASIL" : "GAGAL");
    }

    const isNight = turnIndex % 2 === 1;

    if (isNight) {
      effects = mergeEffects(effects, { money: -mode.dailyCost, hunger: -4, mental: -3 });
      maintenanceText = "Biaya hidup minimum malam ini: -" + rupiah(mode.dailyCost);
    }

    let nextStats = resolveEffects(stats, effects);

    if (isNight && nextStats.debt > 0) {
      const interest = Math.ceil(nextStats.debt * mode.interest);
      nextStats = { ...nextStats, debt: nextStats.debt + interest };
      interestText = "Bunga utang " + Math.round(mode.interest * 100) + "%: +" + rupiah(interest);
    }

    if (isNight && Math.random() < 0.44) {
      chaos = CHAOS_EVENTS[Math.floor(Math.random() * CHAOS_EVENTS.length)];
      nextStats = resolveEffects(nextStats, chaos.effects);
      chaosText = chaos.icon + " " + chaos.title + " — " + chaos.text;
    }

    const fatalState = getFatal(nextStats, mode);

    setStats(nextStats);
    setPicked(index);
    setFatal(fatalState);
    setReaction({
      main: riskText || choice.label + " dipilih. Semoga ini tidak jadi keputusan yang kamu ingat jam 2 pagi.",
      rollText,
      maintenanceText,
      interestText,
      chaosText,
      danger: Boolean(fatalState),
    });
  }

  function nextTurn() {
    if (fatal) {
      setScreen("gameover");
      return;
    }

    if (turnIndex >= TOTAL_TURNS - 1) {
      setScreen("result");
      return;
    }

    setTurnIndex((value) => value + 1);
    setPicked(null);
    setReaction(null);
  }

  async function shareResult(isGameOver = false) {
    const label = isGameOver && fatal ? fatal.title : ending.title;
    const progress = isGameOver
      ? "Tumbang di tanggal " + currentDay + " " + phase.toLowerCase()
      : "Berhasil sampai tanggal 1";

    const text = [
      "💸 GAJI BELUM TURUN",
      "",
      "Mode: " + mode.label,
      progress,
      "Gelar: " + label,
      "💰 Saldo: " + rupiah(stats.balance),
      "💳 Utang: " + rupiah(stats.debt),
      "❤️ Mental: " + stats.mental + "%",
      "🍜 Kenyang: " + stats.hunger + "%",
      "🏆 Skor: " + score.toLocaleString("id-ID"),
      "",
      "Bisa lebih survive dari aku?",
    ].join("\n");

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Gaji Belum Turun",
          text,
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(text + "\n" + window.location.href);
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
          <div className="eyebrow">SURVIVAL TANGGAL TUA — HARD MODE 💸</div>
          <div className="walletArt" aria-hidden="true">
            <span className="walletFace">😵‍💫</span>
            <span className="coin coinOne">🪙</span>
            <span className="coin coinTwo">🪙</span>
          </div>

          <h1>GAJI<br /><span>BELUM TURUN</span></h1>

          <p className="heroText">
            Sekarang bukan cuma pilih A atau B. Ada <strong>12 ronde</strong>,
            biaya hidup harian, bunga utang, random crisis, dan keputusan berisiko.
          </p>

          <div className="difficultyBlock">
            <p className="difficultyTitle">PILIH TINGKAT PENDERITAAN</p>
            <div className="difficultyGrid">
              {Object.values(DIFFICULTIES).map((item) => (
                <button
                  key={item.id}
                  className={"difficultyCard " + (difficultyId === item.id ? "selected" : "")}
                  onClick={() => setDifficultyId(item.id)}
                >
                  <span className="difficultyEmoji">{item.emoji}</span>
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                  <b>{rupiah(item.startingBalance)}</b>
                </button>
              ))}
            </div>
          </div>

          <div className="ruleStrip">
            <span>☀️ Pagi + 🌙 Malam</span>
            <span>🎲 Risiko dinamis</span>
            <span>💳 Utang berbunga</span>
            <span>💥 Bisa game over</span>
          </div>

          <button className="primaryButton" onClick={startGame}>
            MULAI PENDERITAAN →
          </button>

          <p className="microcopy">
            Tujuan: sampai tanggal 1. Bonus: masih punya harga diri.
          </p>
        </section>
      </main>
    );
  }

  if (screen === "gameover") {
    return (
      <main className="appShell resultShell">
        <section className="resultCard gameOverCard">
          <div className="gameOverBanner">💥 GAME OVER — TANGGAL {currentDay} {phase}</div>
          <div className="endingEmoji">{fatal?.emoji}</div>
          <p className="resultKicker">KAMU TIDAK SAMPAI GAJIAN</p>
          <h1>{fatal?.title}</h1>
          <p className="endingText">{fatal?.text}</p>

          <div className="resultStats">
            <div><span>💰 Saldo</span><strong>{rupiah(stats.balance)}</strong></div>
            <div><span>💳 Utang</span><strong>{rupiah(stats.debt)}</strong></div>
            <div><span>❤️ Mental</span><strong>{stats.mental}%</strong></div>
            <div><span>🍜 Kenyang</span><strong>{stats.hunger}%</strong></div>
          </div>

          <div className="scoreBox dangerScore">
            <span>SCORE SEBELUM TUMBANG</span>
            <strong>{score.toLocaleString("id-ID")}</strong>
          </div>

          <button className="primaryButton" onClick={() => shareResult(true)}>
            {copied ? "HASIL DISALIN! ✓" : "SHARE KEGAGALAN ↗"}
          </button>
          <button className="secondaryButton" onClick={startGame}>BALAS DENDAM</button>
        </section>
      </main>
    );
  }

  if (screen === "result") {
    return (
      <main className="appShell resultShell">
        <section className="resultCard">
          <div className="paydayBanner">🎉 TANGGAL 1 — GAJI AKHIRNYA TURUN!</div>
          <div className="endingEmoji">{ending.emoji}</div>
          <p className="resultKicker">KAMU SELAMAT</p>
          <h1>{ending.title}</h1>
          <p className="endingText">{ending.text}</p>

          <div className="resultStats">
            <div><span>💰 Saldo akhir</span><strong>{rupiah(stats.balance)}</strong></div>
            <div><span>💳 Utang</span><strong>{rupiah(stats.debt)}</strong></div>
            <div><span>🍜 Indomie</span><strong>{stats.noodles}x</strong></div>
            <div><span>🛍️ Khilaf</span><strong>{stats.impulse}x</strong></div>
          </div>

          <div className="scoreBox">
            <span>{mode.label} SURVIVAL SCORE</span>
            <strong>{score.toLocaleString("id-ID")}</strong>
          </div>

          <button className="primaryButton" onClick={() => shareResult(false)}>
            {copied ? "HASIL DISALIN! ✓" : "PAMER HASIL ↗"}
          </button>
          <button className="secondaryButton" onClick={startGame}>MAIN LAGI</button>
          <p className="challengeText">
            Coba mode NEKAT kalau hidupmu kurang masalah.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="appShell">
      <section className="gameWrap">
        <header className="topbar">
          <div className="dateBox">
            <span className="dayLabel">{phase}</span>
            <strong className="dayNumber">{currentDay}</strong>
            <small>Ronde {turnIndex + 1}/{TOTAL_TURNS}</small>
          </div>

          <div className="balanceBox">
            <span>SALDO · {mode.label}</span>
            <strong>{rupiah(stats.balance)}</strong>
            <small>
              Utang {rupiah(stats.debt)} / limit {rupiah(mode.debtLimit)}
            </small>
          </div>
        </header>

        <div className="pressureCard">
          <div>
            <span>TINGKAT PANIK</span>
            <strong>{pressure}%</strong>
          </div>
          <div className="pressureTrack">
            <span style={{ width: pressure + "%" }} />
          </div>
          <small>
            {pressure < 35 ? "Masih sok tenang." : pressure < 70 ? "Mulai cek saldo tiap 10 menit." : "DOMPET DALAM KONDISI DARURAT."}
          </small>
        </div>

        <div className="progressDays" aria-label="Progress tanggal tua">
          {DAYS.map((day, index) => {
            const finished = index < dayIndex;
            const active = index === dayIndex;
            return (
              <span key={day} className={(finished ? "done " : "") + (active ? "active" : "")}>
                {finished ? "✓ " : ""}{day}
              </span>
            );
          })}
          <span className="paydayDot">1 💸</span>
        </div>

        <div className="metersGrid">
          <Meter icon="❤️" label="Mental" value={stats.mental} />
          <Meter icon="🍜" label="Kenyang" value={stats.hunger} />
          <Meter icon="👥" label="Sosial" value={stats.social} dangerAt={18} />
        </div>

        {currentEvent && (
          <article className={"eventCard " + (reaction?.danger ? "eventDanger" : "")}>
            <div className="eventMeta">
              <span>{phase === "PAGI" ? "☀️" : "🌙"} {phase}</span>
              <span>💥 Chaos malam: 44%</span>
            </div>

            <div className="eventIcon">{currentEvent.icon}</div>
            <p className="eventKicker">MASALAH RONDE INI</p>
            <h2>{currentEvent.title}</h2>
            <p className="eventText">{currentEvent.text}</p>

            <div className="choices">
              {currentEvent.choices.map((choice, index) => {
                const chance = riskChance(choice.risk, stats);
                return (
                  <button
                    key={choice.label}
                    className={
                      "choiceButton " +
                      (picked === index ? "selected " : "") +
                      (picked !== null && picked !== index ? "muted " : "") +
                      (choice.danger ? "dangerChoice" : "")
                    }
                    onClick={() => choose(choice, index)}
                    disabled={picked !== null}
                  >
                    <span className="choiceMain">
                      <strong>{choice.label}</strong>
                      <small>{choice.hint}</small>
                      {choice.risk && (
                        <em>🎲 Peluang aktualmu: {chance}%</em>
                      )}
                    </span>
                    <StatDelta effects={choice.effects || {}} />
                  </button>
                );
              })}
            </div>

            {reaction && (
              <div className={"reactionBox " + (reaction.danger ? "reactionDanger" : "")}>
                <strong className="reactionHeadline">
                  {reaction.danger ? "🚨 KEPUTUSAN FATAL" : "📌 AKIBATNYA"}
                </strong>
                <p>{reaction.main}</p>

                <div className="reactionDetails">
                  {reaction.rollText && <span>🎲 {reaction.rollText}</span>}
                  {reaction.maintenanceText && <span>🧾 {reaction.maintenanceText}</span>}
                  {reaction.interestText && <span>💳 {reaction.interestText}</span>}
                  {reaction.chaosText && <span className="chaosLine">💥 RANDOM CRISIS: {reaction.chaosText}</span>}
                </div>

                <button className="nextButton" onClick={nextTurn}>
                  {fatal
                    ? "LIHAT NASIBMU →"
                    : turnIndex === TOTAL_TURNS - 1
                      ? "MENUJU TANGGAL 1 →"
                      : phase === "PAGI"
                        ? "LANJUT KE MALAM →"
                        : "COBA BERTAHAN BESOK →"}
                </button>
              </div>
            )}
          </article>
        )}

        <div className="dangerLegend">
          <span>🌙 Setiap malam: biaya hidup -{rupiah(mode.dailyCost)}</span>
          <span>💳 Bunga utang: {Math.round(mode.interest * 100)}% / malam</span>
          <span>☠️ Game over: mental/lapar 0 atau utang {rupiah(mode.debtLimit)}</span>
        </div>
      </section>
    </main>
  );
}
