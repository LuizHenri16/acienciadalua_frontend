### 1. Visão Geral

Serviço Full Stack do contexto de vendas.

**A Ciência da Lua** é uma plataforma SaaS (Software as a Service) desenvolvida sob medida para a digitalização e comercialização de materiais didáticos. O ecossistema visa transformar o catálogo de conteúdos da criadora em uma experiência centralizada, profissional e automatizada — atendendo tanto **alunos** (materiais de estudo) quanto **professores** (materiais didáticos para uso em sala de aula).
### 2. Objetivos Principais

- **Exposição Estratégica:** Vitrine dinâmica para exibição de produtos (PDFs de estudo) com foco em conversão e experiência do usuário (UX).
- **Gestão Autônoma:** Painel administrativo robusto que permite ao administrador gerenciar o ciclo de vida dos produtos (upload, edição e métricas) sem necessidade de suporte técnico.
- **Automação de Entrega:** Integração nativa com o **Mercado Pago (Checkout Pro)**, utilizando webhooks para a liberação instantânea e segura de conteúdos após a confirmação do pagamento.

### 3. Decisões Técnicas

Esta seção detalha o raciocínio por trás das escolhas tecnológicas implementadas no projeto "A Ciência da Lua".

*   **Por que PostgreSQL?**
    *   **Robustez e Integridade Referencial:** Essencial para gerenciar dados sensíveis como transações financeiras, permissões de acesso e o relacionamento entre usuários, produtos e compras. PostgreSQL oferece garantias ACID (Atomicidade, Consistência, Isolamento, Durabilidade) que minimizam o risco de perda de dados.
    *   **Escalabilidade:** Suporta o crescimento futuro da plataforma, lidando com um volume crescente de dados e requisições.
    *   **Funcionalidades Avançadas:** Permite o uso de tipos de dados complexos, extensões e funções que podem otimizar consultas e lógica de negócio.

*   **Por que usar NestJS para o backend?**
    *   **Estrutura Robusta e Escalável:** NestJS oferece uma arquitetura modular e escalável, ideal para construir APIs complexas e manter a organização do código.
    *   **Desenvolvimento Eficiente:** Com TypeScript e padrões de design consolidados (como Inversão de Controle e Orientação a Objetos), o desenvolvimento se torna mais rápido e com menos erros.
    *   **Performance:** Construído sobre Express.js (ou Fastify), o NestJS garante alta performance para o processamento de webhooks, autenticação e outras lógicas de negócio.
    *   **Separação Clara de Responsabilidades:** Permite manter uma separação clara entre o frontend (Next.js) e o backend (NestJS), facilitando a manutenção e o desenvolvimento paralelo.

### 4. Arquitetura e Stack

As tecnologias para esse projeto terão como objetivo tornar a aplicação simples e funcional, sendo performática no backend e no frontend.

**Diagrama de Arquitetura:**
*(Sugestão: Adicionar um diagrama de alto nível aqui para visualização rápida do sistema)*

##### Infraestrutura
*   **Docker & Docker Compose:** A aplicação será orquestrada via Docker, garantindo que o ambiente de desenvolvimento (WSL2) seja idêntico ao de produção (VPS). Isso isola dependências e facilita migrações.
*   **VPS (Servidor Virtual Privado):** Hospedagem para rodar os contêineres em produção.
*   **Nginx Proxy Manager:** Atuará como a camada de entrada, gerenciando certificados SSL (HTTPS) e o roteamento para os containers do Next.js (frontend) e NestJS (backend).

##### Stack Tecnológica Principal
*   **Frontend & UI/UX:**
    *   **Next.js:** Framework React para desenvolvimento frontend, oferecendo renderização no servidor (SSR), geração estática (SSG) e otimizações de performance.
    *   **TailwindCSS:** Framework utilitário para construção de uma interface responsiva, com suporte nativo a `dark mode`, garantindo uma experiência moderna tanto para o account (aluno ou professor) quanto para o administrador.
    *   **Lucide React (Sugestão):** Para ícones leves e consistentes com o estilo do Tailwind.
*   **Backend & Persistência:**
    *   **NestJS:** Framework robusto para a construção da API backend, responsável por processar webhooks, gerenciar autenticação e interagir com o banco de dados.
    *   **PostgreSQL:** Banco de dados relacional robusto para dados transacionais e de usuário.
    *   **Storage (Local/Volume):** Inicialmente, os PDFs serão armazenados em um volume Docker mapeado diretamente no disco da VPS, otimizando o custo de armazenamento.

### 5. Roadmap

##### fase 0: Design & Prototipação (Excalidraw/Figma)
  O foco é mapear todas as telas e fluxos antes de escrever qualquer linha de código.

*   **Protótipo no Figma:** Criação do design de alta fidelidade das telas principais (Realizado em 2026-05-07).
*   **Vitrine (público):**
    *   Tela inicial com listagem de produtos, cards com capa e botão de compra.
*   **Página de Detalhe do Produto:**
    *   Layout com descrição, prévia e call-to-action de compra.
*   **Fluxo de Compra:**
    *   Diagrama do caminho do visitante até a confirmação de acesso (Mercado Pago → Webhook → Liberação).
*   **Fluxo de Acesso do Account (Magic Link):**
    *   Diagrama completo desde o clique em "Já sou account" até o dashboard.
*   **Dashboard do Account:**
    *   Tela pós-login com os materiais liberados e botão de download, separados por categoria (aluno / professor).
*   **Painel Admin — Login:**
    *   Tela de autenticação do administrador.
*   **Painel Admin — Produtos:**
    *   Listagem com ações de editar e excluir.
*   **Painel Admin — Cadastro/Edição de Produto:**
    *   Formulário com campos de título, descrição, upload de PDF e capa.
*   **Navegação entre telas:**
    *   Mapa de fluxo mostrando como as telas se conectam (links, redirecionamentos pós-login, etc.).

> 📎 Protótipos iniciais feitos no Excalidraw e salvos na pasta `Excalidraw/` do vault.
> [[A Ciência da Lua - Telas.excalidraw]]
>
> 🎨 Protótipo de alta fidelidade desenvolvido no Figma.

---

##### fase 1.1: Ambiente de desenvolvimento
  Aqui o foco é preparar o terreno onde tudo irá rodar localmente

*   **Docker Compose local**: Configurar `docker-compose.yml` para rodar instâncias do Postgre, o serviço de storage (MinIO ou volume local) e o projeto NestJS no WSL
*   **Backend Setup**: Iniciar projeto Nest.JS e configurar configuração com banco local.
*   **Migrations & Seed**: Criar script para gerar as tabelas e povoar com produtos de teste.
*   **Simular Webhook**: Configurar o **ngrok** ou similar para expor o WSL à internet e permitir que o Mercado Pago envie notificações de webhook durante os testes de integração.

##### fase 1.2: Infraestrutura de Produção (VPS)
  O foco aqui é o _deploy_ e o endurecimento (hardening) da segurança.

*   **Provisionamento da VPS:** Configurar o acesso SSH, firewall (UFW) e atualizar pacotes.
*   **Reverse Proxy:** Instalar e configurar o **Nginx Proxy Manager** via Docker para gerenciar os domínios e o SSL, roteando para os containers do Next.js (frontend) e NestJS (backend).
*   **Variáveis de Ambiente:** Configurar os arquivos `.env` de produção (chaves do banco, `access_token` e `webhook_secret` do Mercado Pago).
*   **CI/CD Pipeline:** Configurar o GitHub Actions or GitLab CI para automatizar o build e o deploy sempre que acontecer um `push` para o github ou GitLab CI (decidir ainda qual usar).

##### fase 2: Gestão de Conteúdo (O "Painel Admin")
  Aqui o foco é criar as ferramentas para o cliente gerenciar os materiais.

*   **Autenticação Admin:** Login seguro para a o cliente acessar o painel.
*   **CRUD de Produtos:** Tela para cadastrar, editar e excluir materiais.
*   **Storage Engine:** Implementação do sistema de upload de PDFs para a VPS e geração de capas.

##### fase 3: A Vitrine & Venda (O "Frontend")
  A parte que o público e os usuários avulsos vão ver. Iniciado em 2026-05-09.

**Stack do Frontend:**
*   **Framework:** Next.js (App Router)
*   **Estilização:** TailwindCSS
*   **Fontes:** DM Serif Display (títulos) + DM Sans (UI) via `next/font/google`
*   **Ícones:** Lucide React

**Estrutura de rotas prevista (`/app`):**
```
app/
├── page.tsx                      → Vitrine (Home pública)
├── produto/[id]/page.tsx         → Detalhe do produto
├── minha-conta/
│   ├── page.tsx                  → Dashboard do account 
│   └── signin/page.tsx           → Login do account (Magic Link)
└── panel/
    ├── signin/page.tsx           → Login admin
    ├── page.tsx                  → Dashboard
    └── produtos/[id]/page.tsx    → Cadastro / Edição de produto
```

**Decisões de arquitetura frontend:**
*   Páginas públicas (vitrine, detalhe) usam **SSR / SSG** para SEO e performance.
*   Dashboard do account e painel admin são **Client Components** protegidos por middleware de autenticação.
*   Chamadas à API do NestJS feitas via `fetch` nativo com revalidação controlada pelo Next.js.

**Tarefas:**
*   **Catálogo de Produtos:** Listagem dinâmica dos PDFs cadastrados no banco, separados por categoria (Para estudar / Para dar aula).
*   **Integração Mercado Pago (Checkout Pro):** Botão de compra chama o backend NestJS, que gera uma preferência de pagamento via API do Mercado Pago e retorna o link do Checkout Pro para redirecionar o usuário.
*   **Páginas de Detalhes:** Informações sobre cada material de estudo com prévia e CTA de compra.
*   **Responsividade:** Layout mobile-first conforme wireframes (390px base).

##### fase 4: Automação & Entrega (A "Mágica")
  A parte da criação de ferramentas finais e entrega da aplicação MVP.

*   **Preferência de Pagamento:** Endpoint no NestJS (`POST /payments/create-preference`) que recebe o `productId`, busca o produto no banco, e chama a API do Mercado Pago para criar uma preferência — passando `title`, `price`, `external_reference` (UUID do produto) e as URLs de retorno. Devolve o link do Checkout Pro para o frontend.
*   **Webhook Listener:** Endpoint no NestJS (`POST /payments/webhook`) para receber as notificações do Mercado Pago. O payload chega apenas com o `data.id` do pagamento — retornar `200` imediatamente e processar de forma assíncrona para respeitar o timeout de 22s do Mercado Pago.
*   **Lógica de Liberação:** Após receber o webhook, o NestJS consulta `GET /v1/payments/{id}` na API do Mercado Pago para obter os dados completos. Os campos usados são:
    *   `status` → verificar se é `approved` antes de qualquer ação
    *   `payer.email` → e-mail do comprador, usado para criar ou localizar o `Customer`
    *   `external_reference` → UUID do produto no banco, usado para criar a `Purchase`
    *   `id` → `mercadoPagoPaymentId`, salvo na `Purchase` para garantir idempotência
*   **Idempotência:** Antes de processar, verificar se já existe uma `Purchase` com o `mercadoPagoPaymentId` recebido — o Mercado Pago pode enviar o mesmo webhook mais de uma vez.
*   **E-mail de Boas-vindas:** Envio automático do e-mail após a liberação, informando ao account que pode acessar seus materiais.
*   **Magic Link (Autenticação do Account):** O account não cria senha. Ao clicar em "Minha conta" na vitrine (frontend), informa o e-mail → sistema (backend NestJS) envia um link temporário (válido por 15 minutos) que autentica diretamente e redireciona para o dashboard.
*   **Dashboard do Account:** Área autenticada via Magic Link para o account baixar os PDFs que comprou, organizados em abas: **Para estudar** (materiais de aluno) e **Para dar aula** (materiais de professor).
*   **Segurança (Signed URLs):** Implementação dos links temporários para download dos PDFs.

---

### 6. Design System

##### Tipografia

| Elemento                 | Fonte   | Tamanho | Peso |
| ------------------------ | ------- | ------- | ---- |
| Nome da marca (topbar)   | DM Sans | 18px    | 500  |
| Título banner            | Sora    | 28px    | 400  |
| Subtítulo banner         | Sora    | 15px    | 400  |
| Títulos de seção         | Sora    | 20px    | 500  |
| Nome do produto (card)   | Sora    | 15px    | 500  |
| Preço (card)             | Sora    | 15px    | 400  |
| Descrição / corpo        | Sora    | 15px    | 400  |
| Preço destaque (comprar) | Sora    | 26px    | 500  |
| Botões                   | Sora    | 16px    | 500  |
| Labels / datas / hints   | Sora    | 12px    | 400  |
| Footer                   | Sora    | 12px    | 400  |

> Fontes via Google Fonts — sem custo. Unkempt Display para títulos expressivos; Sora para toda a UI.

##### Estrutura Geral (Mobile — 390px)

| Elemento                            | Valor |
| ----------------------------------- | ----- |
| Margem lateral (padding horizontal) | 16px  |
| Área útil de conteúdo               | 358px |
| Espaçamento entre seções            | 32px  |
| Espaçamento interno de cards        | 16px  |

##### Componentes

| Elemento                        | Altura           |
| ------------------------------- | ---------------- |
| Status bar                      | 44px             |
| Topbar / navbar                 | 56px             |
| Botão principal (CTA)           | 52px             |
| Input de texto                  | 52px             |
| Barra de compra (sticky bottom) | 80px + safe area |
| Home indicator (safe area)      | 34px             |

##### Cards e Imagens

| Elemento | Tamanho |
|---|---|
| Card de produto (carrossel) | 160 × 220px |
| Thumb do produto no card | 160 × 110px |
| Capa full-width (detalhe do produto) | 390 × 260px |
| Foto da professora | 390 × 180px |
| Thumb no dashboard / admin | 48 × 48px |
| Thumb admin lista | 44 × 44px |

##### Raios de Borda

| Elemento | Border Radius |
|---|---|
| Cards | 12px |
| Botões | 12px |
| Inputs | 10px |
| Badges / pills | 99px |
| Imagens internas de card | 8px |

---

> **Fluxo completo de acesso do account:**
> ```
> Usuário clica em "Comprar" na vitrine
>         ↓
> Frontend chama NestJS → NestJS cria preferência no Mercado Pago
> (passa external_reference = UUID do produto no banco)
>         ↓
> Usuário é redirecionado para o Checkout Pro (Mercado Pago)
>         ↓
> Pagamento confirmado → Mercado Pago envia webhook para NestJS
> (payload mínimo: apenas data.id do pagamento)
>         ↓
> NestJS retorna 200 imediatamente e processa de forma assíncrona
>         ↓
> NestJS consulta GET /v1/payments/{id} → obtém status, payer.email e external_reference
>         ↓
> Verifica idempotência (mercadoPagoPaymentId já existe na Purchase?)
>         ↓
> Cria Customer pelo payer.email (se não existir)
> Cria Purchase (customerId + productId via external_reference + mercadoPagoPaymentId)
>         ↓
> E-mail de boas-vindas é enviado automaticamente
>         ↓
> Account clica em "Minha conta" na vitrine
>         ↓
> Informa o e-mail → sistema (NestJS) envia Magic Link
>         ↓
> Account clica no link (válido por 15 min) → autenticado
>         ↓
> Redirecionado para o dashboard com seus materiais organizados por categoria
> ```

---
