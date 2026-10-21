import type { Metadata } from "next";
import { Caveat, Sora, Unkempt } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/layout/page-transition";
import { JsonLd } from "@/components/seo/json-ld";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/config/site";
import {
  organizationSchema,
  personSchema,
  websiteSchema,
} from "@/lib/seo/schemas";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const caveat = Caveat ({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

const unkempt = Unkempt({
  variable: "--font-unkempt",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: {
    default: "A Ciência da Lua - Materiais Didáticos",
    template: "%s | A Ciência da Lua",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "ciências", "química", "ensino fundamental", "ensino médio",
    "materiais de estudos", "vestibulares", "enem", "mapas conceituais",
    "professora lua", "plano de aula", "UFRN", "resumos de química",
    "exercícios de ciências", "material didático",
  ],
  icons: {
    icon: DEFAULT_OG_IMAGE,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "A Ciência da Lua - Materiais Didáticos",
    description:
      "Materiais didáticos de Ciências para Ensino Fundamental e Médio. Mapas conceituais, resumos e exercícios criados pela Profa. Lua (UFRN).",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 256, height: 256, alt: "Logo A Ciência da Lua" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Ciência da Lua - Materiais Didáticos",
    description:
      "Materiais didáticos de Ciências para Ensino Fundamental e Médio. Mapas conceituais, resumos e exercícios.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning className={`${sora.variable} ${unkempt.variable} ${caveat.variable} bg-marinho h-full antialiased scroll-smooth`} style={{ scrollPaddingTop: '64px' }}>
      <head>
        <meta name="google-site-verification" content="YD35zo8xwFGcpXW6MNdRzOYPzlGGDpUbze6VeUahDPg" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={personSchema} />
      </head>
      <body className="min-h-full flex flex-col ">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-turquesa-dark focus:text-white focus:rounded-xl focus:font-bold focus:text-sm">
          Pular para o conteúdo principal
        </a>
        <PageTransition>
          {children}
        </PageTransition>
      {process.env.NODE_ENV === 'development' && (
        // eslint-disable-next-line @next/next/no-sync-scripts -- livereload local, apenas em dev
        <script src="http://localhost:8400/live.js" />
      )}
</body>
    </html>
  );
}
