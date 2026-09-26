import "./globals.css";

export const metadata = {
  title: "Gaji Belum Turun — Game Tanggal Tua",
  description:
    "Bisakah kamu bertahan dari tanggal 25 sampai tanggal 1 tanpa berutang? Game absurd tentang survival tanggal tua.",
  metadataBase: new URL("https://gaji-belum-turun.vercel.app"),
  openGraph: {
    title: "Gaji Belum Turun 💸",
    description: "Survive tanggal tua. Jangan bangkrut sebelum gajian.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaji Belum Turun 💸",
    description: "Survive tanggal tua. Jangan bangkrut sebelum gajian.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
