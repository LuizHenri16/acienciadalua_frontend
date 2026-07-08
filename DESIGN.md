---
name: "A Ciência da Lua"
description: "Materiais didáticos de Ciências para Ensino Fundamental e Médio"
colors:
  primary: "#2C9E95"
  neutral-bg: "#F7F5F0"
  neutral-ink: "#1C1C2E"
  brand-gold: "#F5A623"
  accent-rose: "#D4728A"
  surface-card: "#FFFFFF"
  surface-dark: "#1e1b4b"
  text-muted: "#8888AA"
  text-secondary: "#4A4A6A"
  border-light: "rgba(43,45,91,0.12)"
  coral-error: "#E8524A"
  turquesa-light: "#B6EBE5"
  azul-med: "#2D7D8A"
  ouro-light: "#FAD07A"
  petroleo: "#1F5C5C"
  menta: "#C8EEE9"
  cinza-azul: "#A8BFC4"
  turquesa: "#6DD5CA"
typography:
  display:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "normal"
  headline:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(1.25rem, 3vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "Sora, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Sora, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Sora, sans-serif"
    fontSize: "0.65rem"
    fontWeight: 700
    letterSpacing: "0.15em"
    textTransform: "uppercase"
  brand:
    fontFamily: "Unkempt, cursive"
    fontSize: "1.25rem"
    fontWeight: 400
rounded:
  sm: "1rem"
  md: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "16px 48px"
  button-secondary:
    backgroundColor: "{colors.azul-med}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "16px 48px"
  card-product:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
  input-text:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.md}"
---

# Design System: A Ciência da Lua

## 1. Overview

**Creative North Star: "O Mapa Conceitual"**

Um sistema visual que conecta ideias com clareza, como um mapa conceitual bem desenhado. A paleta escura e profunda (marinho) funciona como a lousa de um laboratório à noite; os acentos em turquesa, rosa-rose e ouro são os marcadores que destacam o que importa. Cada elemento tem seu lugar, cada cor carrega significado, e a hierarquia visual guia o olhar sem esforço — exatamente como um bom material didático.

Este sistema rejeita explicitamente o visual genérico de marketplaces de infoprodutos (Hotmart, Kiwify) e o formalismo de sites institucionais. A personalidade é de uma professora que explica com clareza e acolhe quem quer aprender — científica no rigor, não na formalidade.

**Key Characteristics:**
- Atmosfera lunar e científica — fundo marinho como céu noturno, cores que brilham contra o escuro
- Curvas generosas e consistentes (squircle de 1–2rem) que amaciam a precisão científica
- Tipografia limpa (Sora) com toque autoral (Unkempt no nome da marca)
- Movimento suave e intencional — revelações em fade-up, transições de estado sem exagero
- Cards como vitrine de produtos, cada um com identidade de categoria (teal para estudante, rosa para professor)

## 2. Colors

A paleta gira em torno de um fundo escuro profundo (marinho) com acentos que funcionam como realces numa lousa escura. A superfície de conteúdo (off-white) cria o contraste necessário para leitura prolongada.

### Primary
- **Turquesa Escuro** (#2C9E95): Cor de ação principal. Botões CTA, links, preço, headings decorados. É o verde-teal que ancora a identidade científica.

### Neutral
- **Marinho** (#1e1b4b): Fundo escuro principal — header, hero, footer, superfícies de destaque. Funciona como o "céu noturno" da atmosfera lunar.
- **Off White** (#F7F5F0): Fundo de página principal. Tom levemente quente que contrasta com o marinho sem ser um branco frio.
- **Branco** (#FFFFFF): Superfícies de cards, inputs, containers de conteúdo.
- **Texto Principal** (#1C1C2E): Corpo de texto, títulos em superfícies claras. Quase preto com tom azulado.
- **Texto Secundário** (#4A4A6A): Metadados, labels, texto de apoio.
- **Texto Terciário** (#6868A0): Placeholders, breadcrumbs, texto decorativo no hero.

### Secondary
- **Rosa Rose** (#D4728A): Identidade da categoria professor. Badges, tags, gradientes de cards de plano de aula, acentos na seção "Sobre".
- **Ouro** (#F5A623): Cor da marca no logotipo. Exclusiva para o nome "A Ciência da Lua". Também usada em ícones de pagamento pendente.

### Acento
- **Coral** (#E8524A): Estados de erro, mensagens de validação, feedback negativo.

### Surface
- **Azul Médio** (#2D7D8A): Botões secundários, links de navegação ("Minha Conta", "Sair").
- **Turquesa Claro** (#B6EBE5): Badge de categoria estudante, fundos de notificações.

### Named Rules
- **A Regra do Realce.** Acentos turquesa, rosa e ouro ocupam ≤15% de qualquer tela. Sua raridade é o que os faz destacar.
- **A Regra da Lousa.** Fundo marinho não é "dark mode" — é intencional. Conteúdo sobre marinho usa branco e turquesa claro; conteúdo sobre off-white usa texto principal escuro.

## 3. Typography

**Display Font:** Sora (sans-serif geométrica)
**Brand Font:** Unkempt (cursiva decorativa, peso 400 apenas)
**Body Font:** Sora (sans-serif)

**Caráter:** O contraste entre Sora (precisa, limpa, geométrica) e Unkempt (autoral, manuscrita, afetiva) traduz a personalidade da marca: rigor científico com acolhimento de professora. Sora carrega todo o conteúdo funcional; Unkempt é exclusiva do nome da marca, como uma assinatura.

### Hierarchy
- **Display** (800, clamp(2.25rem, 6vw, 4rem), 1.08, letter-spacing: -0.03em): Hero headings. Frases curtas de alto impacto. Reserve para a seção banner da home.
- **Headline** (700, clamp(1.25rem, 3vw, 1.75rem), 1.3): Títulos de seção ("Para Estudar", "Perguntas Frequentes"). Use `text-wrap: balance`.
- **Title** (700, 1rem, 1.4): Títulos de card, nomes de produto.
- **Body** (400, 0.875rem, 1.6): Texto corrido, descrições, blocos de conteúdo. Máximo de 70 caracteres por linha.
- **Label** (700, 0.65rem, letter-spacing 0.15em, uppercase): Badges de categoria, tags, metadados.
- **Brand** (400, 1.25rem, Unkempt): Exclusivo para "A Ciência da Lua" no header e footer.

### Named Rules
- **A Regra da Assinatura.** Unkempt é o equivalente tipográfico da caligrafia da Profa. Lua. Usada apenas no nome da marca. Nunca em headings funcionais, corpo de texto ou botões.

## 4. Elevation

O sistema é predominantemente plano com sombras suaves que aparecem apenas como resposta à interação. Cards em repouso têm `shadow-md` (0 4px 6px -1px rgb(0 0 0 / 0.1)). Ao hover, elementos interativos ganham `shadow-lg` (0 10px 15px -3px rgb(0 0 0 / 0.1)). A profundidade não é estrutural — ela comunica "isso é clicável" e desaparece quando o elemento está em repouso.

### Shadow Vocabulary
- **Card repouso** (`0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)`): Cards de produto em estado padrão.
- **Hover sutil** (`0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)`): Cards ao hover. Também usado no backdrop do header ao scroll (`backdrop-blur-3xl`).

### Named Rules
- **A Regra Plana-por-Padrão.** Superfícies são planas em repouso. Sombras aparecem apenas como resposta a estado (hover, foco). Nenhum elemento tem sombra decorativa em repouso.

## 5. Components

### Buttons
- **Shape:** Squircle — canto arredondado generoso (2rem / 32px).
- **Primary:** Fundo turquesa escuro (#2C9E95), texto branco, padding vertical 16px com 48px horizontal. `hover: opacity-90`.
- **Secondary:** Fundo azul médio (#2D7D8A), texto branco. `hover: opacity-90`.
- **Ghost / Link:** Texto azul médio com transição de gap no hover. Sem fundo.
- **Estados:** `hover` reduz opacidade; `active` escala para 0.98; `disabled` reduz opacidade para 0.7 com cursor not-allowed. Transição de 200ms em propriedades de cor.

### Cards / Product Cards
- **Corner Style:** Squircle (2rem / 32px) no container, squircle (2rem) apenas no topo para a área de imagem.
- **Background:** Branco (#FFFFFF). Cabeçalho com gradiente diagonal — teal (`from-[#2C9E95] via-[#249188] to-[#1a6e67]`) para estudante, rosa (`from-[#D4728A] via-[#b85c75] to-[#8c3a52]`) para professor.
- **Shadow:** `shadow-md` em repouso, `shadow-lg` ao hover. Transição de 300ms.
- **Border:** Nenhuma borda (a sombra define o limite do card).
- **Internal Padding:** 20px horizontal, 16–20px vertical no conteúdo.

### Inputs / Fields
- **Shape:** Squircle (2rem / 32px).
- **Background:** Branco (#FFFFFF).
- **Border:** 1px solid `rgba(43, 45, 91, 0.2)`.
- **Padding:** 16px interno.
- **Label:** Texto secundário (#4A4A6A), 0.875rem, Sora.
- **Focus State:** Padrão do navegador (outline azul). Sem glow ou borda customizada.
- **Error State:** Mensagem de erro em container com fundo coral/10, borda coral/30, texto coral escuro.

### Badges / Chips
- **Style:** Squircle (1rem / 16px) com `backdrop-blur-sm` e borda `border-white/40` em superfícies escuras. Fundo sólido (turquesa claro para estudante, rosa para professor) em superfícies claras.
- **Typography:** Label (0.65rem, 700, uppercase, tracking-widest).

### Navigation
- **Header:** Sticky com `backdrop-blur-3xl` após scroll. Fundo marinho no topo, transiciona para off-white translúcido. Logo com imagem SVG + texto em Unkempt ouro.
- **Footer:** Fundo branco, borda superior sutil. Links de navegação em texto terciário que mudam para turquesa escuro ao hover.

### Signature: FaqCard
- Accordion-style: pergunta clicável com ícone de seta que rotaciona. Conteúdo expande com `max-h` transition. Fundo branco, borda inferior sutil entre itens.

## 6. Do's and Don'ts

### Do:
- **Do** usar turquesa escuro como cor de ação principal (botões, links, CTAs).
- **Do** usar marinho como fundo de seções de destaque (hero, footer).
- **Do** limitar Unkempt ao nome da marca — nunca em texto funcional.
- **Do** preferir superfícies planas com sombras sutis de hover sobre bordas decorativas.
- **Do** usar squircle (2rem) consistentemente em cards, botões e inputs.
- **Do** usar gradientes diagonais nos cabeçalhos de cards para diferenciar categorias.

### Don't:
- **Don't** usar bordas laterais coloridas como decoração (side-stripe borders).
- **Don't** usar gradient text (`background-clip: text` com gradiente) — uma exceção no preço do produto detalhe é tolerada, mas não é padrão do sistema.
- **Don't** parecer com Hotmart, Kiwify ou qualquer marketplace genérico de infoprodutos.
- **Don't** parecer um site institucional sério, formal ou cinzento.
- **Don't** usar sombras decorativas em elementos que não são interativos.
- **Don't** usar Unkempt em placeholders, labels, descrições ou botões.
- **Don't** animar propriedades de layout (height, width, position). Prefira transform e opacity.
