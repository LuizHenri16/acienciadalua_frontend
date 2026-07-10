---
target: /produto
total_score: 30
p0_count: 0
p1_count: 1
timestamp: 2026-07-09T20-59-33Z
slug: src-app-produto
---
# Re-Critique: Product Detail Page (`/produto/[id]`) — Round 2

## Design Health Score: 30/40 (+7 from 23)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Loading + disabled + error banner with retry |
| 2 | Match System / Real World | 4 | Natural language, BRL, clean |
| 3 | User Control & Freedom | 3 | Back to vitrine, retry on error. Missing: navigation to other products |
| 4 | Consistency & Standards | 3 | Squircle applied, CTA color correct, Unkempt on brand. Hover effect on non-interactive image is the main holdout |
| 5 | Error Prevention | 3 | Double-submit prevented, error recovery structured |
| 6 | Recognition vs Recall | 3 | Clear hierarchy on single scroll |
| 7 | Flexibility & Efficiency | 2 | Single-action page by design |
| 8 | Aesthetic & Minimalist | 3 | Clean layout. Image hover effect is noise |
| 9 | Error Recovery | 4 | Structured coral banner with retry |
| 10 | Help & Documentation | 1 | Zero purchase context or help |

## Previous Issues — All 8 Fixed ✅

| Issue | Status |
|-------|--------|
| CTA `bg-marinho shadow-lg` → `bg-turquesa-dark shadow-md` | ✅ Fixed |
| Trust signals `cursor-pointer` sem ação → estáticos | ✅ Fixed |
| "Sobre este material" eyebrow uppercase → heading normal | ✅ Fixed |
| Imagem `rounded-r-lg` + `cursor-pointer` → `rounded-r-[2rem]` | ✅ Fixed |
| Preço gradient text → turquesa-dark sólido | ✅ Fixed |
| Erro texto solto → banner com retry | ✅ Fixed |
| Header sem marca → Unkempt na breadcrumb | ✅ Fixed |
| Footer sem marca → Unkempt no copyright | ✅ Fixed |

## Remaining Issues

**P1 — Imagem tem hover:scale/shadow sem ser interativa** (linha 39)
`hover:scale-[1.01] hover:shadow-lg transition-transform` sugere que é clicável, mas não é. Remove.

**P2 — Nenhum contexto de compra na página**
Sem "material digital — acesso imediato", sem FAQ, sem "como funciona". O CTA fica isolado.

**P3 — Gradient overlay decorativo na imagem**
`bg-linear-to-l from-white/5 to-transparent` — camada extra sem função real.

## Verdict
30/40 — pronto para produção com 1-2 ajustes pequenos. Todas as críticas anteriores resolvidas.
