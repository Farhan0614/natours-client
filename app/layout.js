import { Lato } from "next/font/google";
import "../app/_styles/globals.css";
import Header from "./_components/layout/Header";
import Footer from "./_components/layout/Footer";

const lato = Lato({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Natours | Exciting tours for adventurous people",
  description: "Book your next outdoor adventure with Natours.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lato.className}>
      <head>
        <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />
      </head>
      {/* Set global slate background and text colors, and make body a full-height flex column */}
      <body className="bg-slate-50 text-slate-700 min-h-screen flex flex-col">
        <Header />
        {/* The wrapper ensures the main content stretches to push the footer down */}
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
