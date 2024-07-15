import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agenda"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-[url('https://wallpapercave.com/wp/wp11850536.jpg')]
       backdrop-blur-[2px] backdrop-brightness-40 text-gray-100 h-screen shadow-lg">{children}</body>
    </html>
  );
}
