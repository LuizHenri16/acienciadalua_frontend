import { SITE_URL } from "@/lib/config/site";
import type { Material } from "@/types/material";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "A Ciência da Lua",
  url: SITE_URL,
  logo: `${SITE_URL}/acienciadalua-logo-var1.svg`,
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

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "A Ciência da Lua",
  url: SITE_URL,
  description:
    "Materiais didáticos de Ciências para Ensino Fundamental e Médio. Mapas conceituais, resumos e exercícios para alunos e professores.",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?busca={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export const personSchema = {
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
  url: SITE_URL,
};

export function buildProductSchema(product: Material) {
  const productUrl = `${SITE_URL}/produto/${product.id}`;
  const imageUrl = product.coverUrl ?? `${SITE_URL}/acienciadalua-logo-var1.svg`;
  const price = (product.price / 100).toFixed(2);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description:
      product.description ??
      `${product.title} — Material didático de Ciências para Ensino Fundamental e Médio.`,
    image: imageUrl,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: "A Ciência da Lua",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "BRL",
      price: price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "A Ciência da Lua",
      },
    },
  };
}
