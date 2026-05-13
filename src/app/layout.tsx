import type { Metadata } from "next";
import { Sora, Unkempt } from "next/font/google";
import "./globals.css";
import PageTransition from "@/hooks/framerMotion/PageTransition";

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
  title: "A Ciência da Lua - Materiais de Estudos",
  description: "E-commerce de materiais de estudos para o Ensino Fundamental e Médio para alunos e professores. ",
  keywords: ["ciências", "ensino fundamental", "ensino médio", "materiais de estudos", "vestibulares", "enem", "estudos"],
  icons: {
    icon: '/acienciadalua-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning className={`${sora.variable} ${unkempt.variable} bg-[#fafafa]  h-full antialiased`}>
      <body className="min-h-full flex flex-col ">
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
