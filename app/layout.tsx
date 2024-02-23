import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cookify",
  description: "Vyhledejte a nebo přidejte své oblíbené recepty a připojte se do skupiny nadšených domácích kuchařů",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={lexend.className}>
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
