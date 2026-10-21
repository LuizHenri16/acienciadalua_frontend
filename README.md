# A Ciência da Lua — Frontend

Plataforma de **e-commerce de materiais didáticos de Ciências** criada para **estudantes do Ensino Fundamental/Médio e vestibulandos** e para **professores** que buscam materiais prontos para a sala de aula — mapas conceituais, resumos, exercícios, slides, jogos e planos de aula, todos autorais e produzidos pela Profa. Lua (UFRN).

O foco do produto é conversão: o visitante descobre a marca na home, navega o catálogo, conhece a professora e finaliza a compra de materiais em PDF.

- 🔗 **Protótipo (testes de UX/UI):** https://acienciadalua-frontend.vercel.app/
- 🌐 **Produção:** https://acienciadalua.com.br

---

## 📑 Índice

- [Visão geral](#-visão-geral)
- [Stack](#-stack)
- [Pré-requisitos](#-pré-requisitos)
- [Como rodar localmente](#-como-rodar-localmente)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Scripts disponíveis](#-scripts-disponíveis)
- [Arquitetura](#-arquitetura)
- [Mapa de rotas](#-mapa-de-rotas)
- [Qualidade e acessibilidade](#-qualidade-e-acessibilidade)
- [SEO](#-seo)
- [Build e deploy](#-build-e-deploy)
- [Roadmap](#-roadmap)
- [Autor](#-autor)

---

## 🚀 Visão geral

**A Ciência da Lua** é uma plataforma de e-commerce dedicada à comercialização de materiais de ensino e aprendizagem, desenvolvida para atender às necessidades de estudantes e professores. O objetivo é facilitar o acesso a recursos educacionais de alta qualidade por meio de uma interface moderna, intuitiva e responsiva.

O frontend consome a API do projeto (repositório `acienciadalua_backend` — NestJS + PostgreSQL), responsável por produtos, autenticação, compras e pagamentos.

---

## 🧱 Stack

| Tecnologia | Versão (`package.json`) | Papel no projeto |
| --- | --- | --- |
| [Next.js](https://nextjs.org) | `^16.2.9` | Framework React com App Router, SSR/ISR e Route Handlers |
| [React](https://react.dev) / React DOM | `^19.2.7` | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org) | `^5` | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com) | `^4.3.1` | Estilização utilitária (v4, via `@tailwindcss/postcss` `^4`) |
| [framer-motion](https://motion.dev) | `^12.38.0` | Animações e transições de página |
| [lucide-react](https://lucide.dev) | `^1.14.0` | Ícones |
| [react-icons](https://react-icons.github.io/react-icons/) | `^5.7.0` | Ícones adicionais |
| [react-spinners](https://www.davidhu.io/react-spinners/) | `^0.17.0` | Indicadores de carregamento |
| [babel-plugin-react-compiler](https://react.dev/learn/react-compiler) | `1.0.0` | React Compiler (ativado em `next.config.ts` via `reactCompiler: true`) |

**Ferramentas de desenvolvimento:** `eslint` `^9` + `eslint-config-next` `16.2.6` (presets `core-web-vitals` e `typescript`), `@types/node` `^20`, `@types/react` `^19`, `@types/react-dom` `^19`.

> As versões acima são as declaradas em `package.json`. O lockfile (`package-lock.json`) pode resolver patch/minor mais recentes dentro do range.

---

## ✅ Pré-requisitos

- **Node.js `>= 20.9.0`** — requisito declarado em `engines` do Next.js 16 (`node_modules/next/package.json`). O `Dockerfile` do projeto usa `node:22-alpine`, então **Node 22 é a versão recomendada**.
- **npm** — o projeto versiona `package-lock.json`, então use npm (`npm ci` no Docker). Gerenciadores alternativos não são suportados oficialmente pelo lockfile.
- **API backend em execução** — sem ela o catálogo, o login e o checkout não funcionam. Por padrão a API roda em `http://localhost:3000` (ver [Variáveis de ambiente](#-variáveis-de-ambiente) e o conflito de porta abaixo).

---

## 🛠️ Como rodar localmente

### 1. Clone e instale

```bash
git clone https://github.com/LuizHenri16/acienciadalua_frontend.git
cd acienciadalua_frontend
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo **`.env.local`** na raiz (arquivos `.env*` são ignorados pelo `.gitignore`, então nada sensível vai para o repositório):

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_MP_PUBLIC_KEY=sua-chave-publica-do-mercado-pago
```

Detalhes de cada variável em [Variáveis de ambiente](#-variáveis-de-ambiente).

### 3. Suba o servidor de desenvolvimento

```bash
npm run dev
```

Por padrão o Next sobe em **http://localhost:3000**.

### ⚠️ Conflito de porta com a API

Tanto o Next quanto a API usam **3000** por padrão (no backend: `app.listen(process.env.PORT ?? 3000)`). Se você rodar os dois na mesma porta, um deles falha.

Escolha uma das opções:

```bash
# Opção A (recomendada): mantém a API em 3000 (que é o fallback do frontend)
# e sobe o Next em outra porta.
npm run dev -- -p 3001
# o app fica em http://localhost:3001 e continua falando com a API em http://localhost:3000
```

```bash
# Opção B: mantém o Next em 3000 e muda a API de porta.
# No backend: PORT=3001 npm run start:dev
# E no .env.local do frontend:
# NEXT_PUBLIC_API_URL=http://localhost:3001
```

> A forma alternativa de trocar a porta no Next é via variável de ambiente: `PORT=3001 npm run dev`.

### 🔁 Reinício obrigatório ao mudar variáveis

`NEXT_PUBLIC_API_URL` é lida de forma **literal e proposital** em `src/lib/config/env.ts` para que o Next consiga *inline*-á-la em tempo de build (requisito do build no Docker). Consequência prática: **alterar essa variável exige reiniciar o servidor de dev** (ou refazer o build em produção).

---

## 🔑 Variáveis de ambiente

| Variável | Obrigatória | Descrição | Exemplo |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Recomendada (há fallback) | URL base da API backend. Usada por `apiUrl()`/`uploadUrl()` em `src/lib/api/client.ts`. **Fallback:** `http://localhost:3000` (`src/lib/config/env.ts`). | `http://localhost:3000` |
| `NEXT_PUBLIC_MP_PUBLIC_KEY` | Não | Chave **pública** do Mercado Pago. Presente no ambiente local e no workflow de deploy, mas **não há referência a ela em `src/`** — o checkout vigente usa o fluxo de PIX via API. Mantenha apenas se for integrar o SDK do Mercado Pago no cliente. | `sua-chave-publica-do-mercado-pago` |

Bloco de exemplo (`.env.local` — **não versionar**):

```dotenv
# Base da API backend
NEXT_PUBLIC_API_URL=http://localhost:3000

# Chave pública do Mercado Pago (opcional / reservada)
NEXT_PUBLIC_MP_PUBLIC_KEY=sua-chave-publica-do-mercado-pago
```

> ⚠️ Nunca versione chaves reais nem coloque segredos (tokens, `client_secret`) em variáveis `NEXT_PUBLIC_*`: tudo com esse prefixo é embutido no bundle do cliente e fica visível no navegador.

---

## 📜 Scripts disponíveis

| Script | Comando | Descrição |
| --- | --- | --- |
| `dev` | `next dev` | Servidor de desenvolvimento (porta 3000 por padrão). |
| `build` | `next build` | Build de produção (gera `.next/standalone`). |
| `start` | `next start` | Serve o build de produção. |
| `lint` | `eslint src` | Lint do código em `src/`. |
| `typecheck` | `tsc --noEmit` | Verificação de tipos sem emitir arquivos. |

```bash
npm run lint
npm run typecheck
npm run build
```

---

## 🏗️ Arquitetura

O projeto usa o **App Router** do Next.js, com **route groups** (pastas entre parênteses, que não aparecem na URL) para separar domínios e escopos de layout:

```
src/
├── app/
│   ├── (catalog)/        # Vitrine pública: /produtos, /produto/[id]
│   ├── (account)/        # Conta do cliente: /minha-conta/**
│   ├── (checkout)/       # Pós-pagamento: /pagamento/{pendente,sucesso,erro}
│   ├── (admin)/          # Painel: /painel/**
│   ├── api/contact/      # Route Handler (proxy de contato para a API)
│   ├── apresentacao/gratis/
│   ├── login/            # Redirect para /minha-conta/signin
│   ├── layout.tsx        # Layout raiz (fontes, metadata, skip link, JSON-LD)
│   ├── globals.css       # Tema Tailwind v4 (@theme) e utilitários globais
│   ├── error.tsx         # Error boundary global
│   ├── not-found.tsx     # Página 404
│   └── sitemap.ts        # Sitemap dinâmico
├── components/           # Componentes por domínio
│   ├── account/ catalog/ admin/ checkout/ home/ product/
│   ├── layout/           # Headers, footer, shells, transição de página
│   ├── seo/              # Injeção de JSON-LD
│   └── ui/               # Primitivos (Button, Input, Loading, etc.)
├── content/              # Conteúdo estático (ex.: FAQ)
├── hooks/                # Hooks reutilizáveis (ex.: use-count-up)
├── lib/
│   ├── api/              # Camada isomórfica de acesso à API
│   ├── auth/             # Cookies, rotas e constantes de autenticação
│   ├── config/           # env.ts e site.ts
│   ├── format/           # Formatadores (moeda, tipo de material)
│   └── seo/              # Schemas JSON-LD
├── types/                # Tipos/interfaces (material, payment, forms)
└── proxy.ts              # Guard de rotas (middleware do Next 16)
```

### Route groups

| Grupo | Escopo | Observações |
| --- | --- | --- |
| `(catalog)` | Vitrine pública | Cada página monta seu próprio shell (`CatalogShell`) com header + footer. `src/app/(catalog)/produtos/page.tsx` usa `export const dynamic = "force-dynamic"`. |
| `(account)` | Área do cliente | Subgrupo `(protected)` com layout que exige `customer_token`. |
| `(checkout)` | Pós-pagamento | Layout próprio (`pagamento/layout.tsx`) com `main#main-content`. |
| `(admin)` | Painel administrativo | Subgrupo `(protected)` com layout que exige `admin_token`; tem `loading.tsx` e `error.tsx` próprios. |

### `src/lib/api` — acesso à API (isomórfico)

- `client.ts` — helpers `apiUrl(path)` e `uploadUrl(file)`; concentram a concatenação da base da API.
- `http-error.ts` — classe `HttpError` (mensagem + `status`) usada para erros HTTP tipados.
- `auth.ts` / `customers.ts` — autenticação de admin e de cliente (signin, senha, perfil, compras, download).
- `products.ts` — catálogo público (com `next: { revalidate: 3600 }` → ISR).
- `admin-products.ts` — CRUD de produtos autenticado (usa `cache: "no-store"`).
- `payments.ts` — criação de preferências e pagamento PIX.

### `src/lib/auth` — autenticação

- `constants.ts` — cookies e rotas protegidas:
  - `customer_token` (área do cliente)
  - `admin_token` + `admin_refresh_token` (painel)
- `cookies.ts` — leitura/escrita/limpeza dos cookies **no cliente** (`document.cookie`, `SameSite=Strict`). Não importar em Server Components.
- `routes.ts` — rotas de signin (`/minha-conta/signin` e `/painel/signin`).

A proteção acontece em **duas camadas**:

1. **`src/proxy.ts`** (o *middleware* do Next 16, com matcher para `/minha-conta/:path*` e `/painel/:path*`) redireciona quem não tem o cookie para o signin correspondente, ignorando as rotas de signin/recuperação.
2. **Layouts server-side** dos grupos `(protected)` — `(account)/minha-conta/(protected)/layout.tsx` e `(admin)/painel/(protected)/layout.tsx` — releem o cookie via `next/headers` e chamam `redirect()` como segunda barreira.

### Demais pastas de `lib`

- `config/env.ts` — resolve `NEXT_PUBLIC_API_URL` (com fallback).
- `config/site.ts` — `SITE_URL`, `SITE_NAME`, descrição padrão e imagem OG.
- `format/currency.ts` e `format/material.ts` — formatação de preço (BRL) e rótulos/formato do material.
- `seo/schemas.ts` — schemas JSON-LD (`Organization`, `WebSite`, `Person`, `Product`).

---

## 🗺️ Mapa de rotas

| Rota | Arquivo | Acesso |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | 🌐 Público (home/vitrine) |
| `/produtos` | `(catalog)/produtos/page.tsx` | 🌐 Público (catálogo, `force-dynamic`) |
| `/produto/[id]` | `(catalog)/produto/[id]/page.tsx` | 🌐 Público (detalhe; `notFound()` se não existir) |
| `/minha-conta/signin` | `(account)/minha-conta/signin/page.tsx` | 🌐 Público (aceita `?email=`) |
| `/minha-conta/esqueci-senha` | `(account)/minha-conta/esqueci-senha/page.tsx` | 🌐 Público |
| `/minha-conta/redefinir-senha` | `(account)/minha-conta/redefinir-senha/page.tsx` | 🌐 Público (token via query) |
| `/minha-conta` | `(account)/minha-conta/(protected)/page.tsx` | 🔒 Protegida (`customer_token`) |
| `/painel/signin` | `(admin)/painel/signin/page.tsx` | 🌐 Público |
| `/painel` | `(admin)/painel/(protected)/page.tsx` | 🔒 Protegida (`admin_token`) |
| `/painel/produto` | `(admin)/painel/(protected)/produto/page.tsx` | 🔒 Protegida (criar produto) |
| `/painel/produto/[id]` | `(admin)/painel/(protected)/produto/[id]/page.tsx` | 🔒 Protegida (editar produto) |
| `/pagamento/pendente` | `(checkout)/pagamento/pendente/page.tsx` | 🌐 Público |
| `/pagamento/sucesso` | `(checkout)/pagamento/sucesso/page.tsx` | 🌐 Público (aceita `?email=`) |
| `/pagamento/erro` | `(checkout)/pagamento/erro/page.tsx` | 🌐 Público |
| `/apresentacao/gratis` | `src/app/apresentacao/gratis/page.tsx` | 🌐 Público (landing de captura de lead) |
| `/login` | `src/app/login/page.tsx` | ↩️ Redirect → `/minha-conta/signin` |
| `404` (qualquer rota inexistente) | `src/app/not-found.tsx` | Especial |
| Erro global / por rota | `src/app/error.tsx`, `(admin)/painel/error.tsx`, `(catalog)/produto/[id]/error.tsx` | Especial (error boundaries) |
| `/api/contact` | `src/app/api/contact/route.ts` | Route Handler (proxy `POST` → API) |
| `/sitemap.xml` | `src/app/sitemap.ts` | Público (gerado dinamicamente) |

> Rotas protegidas redirecionam para o signin correspondente quando o cookie exigido está ausente.

---

---

## 🔍 SEO

- **Metadata** no layout raiz (`src/app/layout.tsx`): `title` com template, `description`, `keywords`, `metadataBase`, `canonical`, Open Graph, Twitter Card, `robots` e ícone.
- **Metadata por página** — ex.: `/produtos` e `/produto/[id]` definem `title`, `description`, `canonical` e Open Graph próprios (`generateMetadata`).
- **Dados estruturados (JSON-LD)** — `Organization`, `WebSite` e `Person` no layout raiz; `Product` na página de produto (`src/lib/seo/schemas.ts`, injetados via `src/components/seo/json-ld.tsx`).
- **Sitemap dinâmico** — `src/app/sitemap.ts` inclui home, `/produtos` (com filtros), `/login`, `/minha-conta` e todos os produtos ativos.
- **`robots.txt`** estático em `public/`.

---

## 🚢 Build e deploy

### Configuração (`next.config.ts`)

- **`output: "standalone"`** — o build gera um servidor autocontido em `.next/standalone`.
- **`reactCompiler: true`** — React Compiler habilitado.
- **Redirect `www` → domínio canônico** — requisições ao host `www.acienciadalua.com.br` são redirecionadas de forma **permanente** para `https://acienciadalua.com.br/:path*` (`permanent: true`).
- **`images.remotePatterns`** — imagens remotas permitidas apenas de `https://api.acienciadalua.com.br/uploads/**`.

### Build e execução manual (standalone)

```bash
npm run build

# O servidor standalone não inclui os estáticos automaticamente:
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

node .next/standalone/server.js   # porta 3000 (PORT configurável)
```

### Docker

O repositório inclui um `Dockerfile` multi-stage baseado em `node:22-alpine`:

1. **deps** — `npm ci`;
2. **build** — recebe `NEXT_PUBLIC_API_URL` como *build arg* e roda `npm run build`;
3. **runner** — copia apenas `.next/standalone`, `.next/static` e `public`, roda como usuário **não-root** (`nextjs`) e expõe a porta **3000**.

### CI/CD

O workflow `.github/workflows/deploy.yml` roda **em push para a branch `main`**:

1. builda a imagem e faz *push* para o Docker Hub (`<usuario>/acienciadalua-frontend:latest`), passando `NEXT_PUBLIC_API_URL` e `NEXT_PUBLIC_MP_PUBLIC_KEY` como *build args*;
2. conecta na **VPS via SSH** e atualiza o container com `docker compose pull/up`.

### Infraestrutura

O deploy final roda em **VPS Linux com nginx como proxy reverso e SSL**, servindo `acienciadalua.com.br` (canônico) e redirecionando o `www`.

---

## 📍 Roadmap

O desenvolvimento foi dividido em fases. Itens concluídos:

- [x] **Wireframes e ideias iniciais** — brainstorming do site no Excalidraw.
- [x] **Prototipagem no Figma** — criação do protótipo de UI.
- [x] **Interface do cliente (storefront)** — toda a parte visual e de navegação do usuário final.
- [x] **Painel administrativo (admin)** — módulo de gestão de produtos.
- [x] **Integração com as APIs do backend** — conexão completa do frontend com a API.
- [x] **SEO** — otimização com boas práticas (metadata, JSON-LD, sitemap).
- [x] **Deploy do projeto protótipo na Vercel** + **teste de UX/UI** e coleta de feedback.
- [x] **Deploy final** — VPS Linux com nginx e SSL.
- [x] **Produto final no ar** — com pequenos ajustes ainda pendentes.

---

## 👤 Autor

Desenvolvido com ❤️ por [Luiz Henrique](https://github.com/LuizHenri16).
