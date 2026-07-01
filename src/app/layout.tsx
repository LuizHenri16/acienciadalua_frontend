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

const siteUrl = "https://acienciadalua.com.br";

export const metadata: Metadata = {
  title: {
    default: "A Ciência da Lua - Materiais de Estudos",
    template: "%s | A Ciência da Lua",
  },
  description: "Materiais didáticos de Ciências para Ensino Fundamental e Médio. Mapas conceituais, resumos e exercícios para alunos e professores. Aprovação garantida!",
  keywords: ["ciências", "ensino fundamental", "ensino médio", "materiais de estudos", "vestibulares", "enem", "estudos", "química", "professora luana"],
  icons: {
    icon: '/acienciadalua-logo-var1.svg',
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "A Ciência da Lua - Materiais de Estudos",
    description: "Materiais didáticos de Ciências para Ensino Fundamental e Médio. Mapas conceituais, resumos e exercícios.",
    url: siteUrl,
    siteName: "A Ciência da Lua",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/acienciadalua-logo-var1.svg", width: 256, height: 256 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Ciência da Lua - Materiais de Estudos",
    description: "Materiais didáticos de Ciências para Ensino Fundamental e Médio.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning className={`${sora.variable} ${unkempt.variable} bg-marinho h-full antialiased scroll-smooth`} style={{ scrollPaddingTop: '64px' }}>
      <body className="min-h-full flex flex-col ">
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
