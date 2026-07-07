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

// ─── JSON-LD Schemas ─────────────────────────────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "A Ciência da Lua",
  url: siteUrl,
  logo: `${siteUrl}/acienciadalua-logo-var1.svg`,
  description:
    "Plataforma de materiais didáticos de Ciências para Ensino Fundamental e Médio, criada pela Professora Lua.",
  founder: {
    "@type": "Person",
    name: "Professora Lua",
    jobTitle: "Professora de Química",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidade Federal do Rio Grande do Norte (UFRN)",
    },
    knowsAbout: ["Química", "Ciências", "Ensino Fundamental", "Ensino Médio", "ENEM"],
  },
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "A Ciência da Lua",
  url: siteUrl,
  description:
    "Materiais didáticos de Ciências para Ensino Fundamental e Médio. Mapas conceituais, resumos e exercícios para alunos e professores.",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/?busca={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Professora Lua",
  jobTitle: "Professora de Química",
  worksFor: { "@type": "Organization", name: "A Ciência da Lua" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidade Federal do Rio Grande do Norte (UFRN)",
  },
  knowsAbout: ["Química", "Ciências", "Ensino Fundamental", "Ensino Médio", "Mapas Conceituais", "ENEM", "Estudos"],
  url: siteUrl,
};

export const metadata: Metadata = {
  title: {
    default: "A Ciência da Lua - Materiais Didáticos",
    template: "%s | A Ciência da Lua",
  },
  description:
    "Materiais didáticos de Ciências criados pela Profa. Lua (UFRN) para Ensino Fundamental e Médio. Mapas conceituais, resumos, exercícios e planos de aula. Estude para o ENEM com método e intenção!",
  keywords: [
    "ciências", "química", "ensino fundamental", "ensino médio",
    "materiais de estudos", "vestibulares", "enem", "mapas conceituais",
    "professora lua", "plano de aula", "UFRN", "resumos de química",
    "exercícios de ciências", "material didático",
  ],
  icons: {
    icon: '/acienciadalua-logo-var1.svg',
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "A Ciência da Lua - Materiais Didáticos",
    description:
      "Materiais didáticos de Ciências para Ensino Fundamental e Médio. Mapas conceituais, resumos e exercícios criados pela Profa. Lua (UFRN).",
    url: siteUrl,
    siteName: "A Ciência da Lua",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/acienciadalua-logo-var1.svg", width: 256, height: 256, alt: "Logo A Ciência da Lua" }],
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
    <html lang="pt-br" suppressHydrationWarning className={`${sora.variable} ${unkempt.variable} bg-marinho h-full antialiased scroll-smooth`} style={{ scrollPaddingTop: '64px' }}>
      <head>
        <meta name="google-site-verification" content="YD35zo8xwFGcpXW6MNdRzOYPzlGGDpUbze6VeUahDPg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col ">
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
