import type { Metadata } from "next";
import { Sora, Unkempt } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const unkempt = Unkempt({
  variable: "--font-unkempt",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "A Ciência da Lua",
  description: "A Ciência da Lua",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning className={`${sora.variable} ${unkempt.variable}  h-full antialiased`}>
      <body className="min-h-full flex flex-col ">{children}</body>
    </html>
  );
}
