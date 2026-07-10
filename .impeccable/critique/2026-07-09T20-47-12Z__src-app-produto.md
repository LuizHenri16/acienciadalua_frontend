---
target: /produto
total_score: 23
p0_count: 2
p1_count: 2
timestamp: 2026-07-09T20-47-12Z
slug: src-app-produto
---
# Critique: Product Detail Page (`/produto/[id]`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Button says "Aguarde..." but no step indication. No success state on-page. |
| 2 | Match System / Real World | 4 | Natural Portuguese, BRL formatting, clear labels. No issues. |
| 3 | User Control & Freedom | 2 | No confirmation before redirecting to Mercado Pago. Once clicked, user loses control. |
| 4 | Consistency & Standards | 2 | CTA uses `bg-marinho` — design system specifies turquesa-dark for primary CTAs. Button has `shadow-lg` at rest, violating flat-by-default rule. Trust signal hover colors inconsistent (shield→turquesa, zap→ouro). |
| 5 | Error Prevention | 2 | Button disables on submit (good). No confirmation step, no guard against double-purchase. |
| 6 | Recognition vs Recall | 4 | All info visible. Breadcrumb gives context. No recall demands. |
| 7 | Flexibility & Efficiency | 1 | No accelerators for repeat buyers, no keyboard shortcuts, no related products. |
| 8 | Aesthetic & Minimalist | 3 | Clean layout. Docked for: gradient text on price, false affordances on trust signals, description treated as afterthought. |
| 9 | Error Recovery | 2 | Error says what happened but not why. No support link. In-page handling is just tiny red text. |
| 10 | Help & Documentation | 0 | Zero help entry points. No FAQ, no "Como funciona", no support contact. |
| **Total** | | **23/40** | **Acceptable** |

## Anti-Patterns Verdict

**AI-generated tells found (2):**

1. **Gradient text on price** — `bg-linear-to-r from-turquesa-dark to-turquesa bg-clip-text text-transparent`. DESIGN.md explicitly says "Don't use gradient text — exception in price tolerated," but it's still an AI tell that dilutes the brand.

2. **"SOBRE ESTE MATERIAL" eyebrow** — `text-[0.7rem] uppercase tracking-[0.15em]` above the description is the textbook AI scaffold pattern. This section should *sell* the product, not look like a legal footnote.

**Deterministic scan**: Empty (no automated issues detected).

**LLM assessment**: Beyond the two tells, the page feels considered but cautious. The layout is clean and the product photography area is well-proportioned. However, several micro-decisions (wrong button color, dead click targets, de-emphasized value proposition) suggest the polish pass prioritized aesthetics over usability.

## Overall Impression

A clean, well-structured product page that's held back by design system inconsistencies and a lack of empathy for the buyer's emotional journey. The biggest opportunity: **turn the CTA into the brand's action color** (turquesa-dark) and **fix the false affordances on the trust signals** before launch. Together these two fixes would significantly improve conversion trust.

## What's Working

1. **Two-column layout with generous whitespace** — The image-left / content-right split on desktop is well-proportioned. Good use of `max-w-xl` to keep text lines readable.

2. **Category badge encodes the grid mental model** — Rose for teacher / turquoise for student extends the product grid's visual language, creating system coherence.

3. **Micro-interaction polish** — Back arrow translate on hover, button `active:scale-[0.98]`, fade-in entrance. Small touches that signal care.

## Priority Issues

### P0 — CTA button color violates design system
- **What**: Button uses `bg-marinho` (dark navy) with `shadow-lg shadow-[#68B999]/20` at rest
- **Why it matters**: The most important element on the page doesn't use the brand's action color. Marinho reads as secondary/heavy. `shadow-lg` violates Regra Plana-por-Padrão. `#68B999` is a non-token color.
- **Fix**: `bg-turquesa-dark`, `shadow-md` at rest (no custom shadow color), `hover:opacity-90`
- **Command**: `$impeccable colorize`

### P0 — Trust signals have false affordance
- **What**: Shield and Zap divs have `cursor-pointer` + hover color change but zero onClick handlers
- **Why it matters**: At the payment moment, users may click trust signals expecting details about security or delivery. Getting nothing erodes trust. Violates WCAG SC 2.5.3.
- **Fix**: Remove `cursor-pointer` and hover color classes. Keep as static indicators.
- **Command**: `$impeccable polish`

### P1 — "Sobre este material" is an AI eyebrow
- **What**: Tiny uppercase heading (`text-[0.7rem]`, `tracking-[0.15em]`) with `opacity-75` on body text
- **Why it matters**: This section sells the product. Making it visually weak undermines conversion. The eyebrow pattern says "template, not content."
- **Fix**: `text-sm font-bold text-texto-principal` for heading, `text-texto-secundario` for body (no opacity override)
- **Command**: `$impeccable typeset`

### P1 — Image container has wrong radius + false affordance
- **What**: Uses `rounded-r-lg` (8px) instead of design system's 2rem squircle. Has `cursor-pointer` with no click handler.
- **Fix**: `rounded-r-[2rem]`, remove `cursor-pointer`
- **Command**: `$impeccable polish`

### P2 — No brand presence in header
- **What**: Header uses `bg-white/80` with no logo. The brand identity that brought the user here vanishes at purchase.
- **Fix**: Add "A Ciência da Lua" in Unkempt to the centered breadcrumb area
- **Command**: `$impeccable bolder`

### P2 — Weak in-page error recovery
- **What**: Payment error renders as bare `text-xs text-coral-dark text-center` — tiny, unstyled, easy to miss
- **Fix**: Add structured error banner with icon + retry button + support link
- **Command**: `$impeccable harden`

## Persona Red Flags

### Jordan (First-timer)
- **Trust signals**: Tiny, muted, non-interactive — can't explore for reassurance
- **No post-purchase info**: No idea what happens after "Comprar agora"
- **Brand absent from header**: Can't confirm who they're buying from
- **Error state**: Tiny red text with no retry path

### Casey (Mobile)
- **Hover states stick**: Trust signals stay highlighted after tap with no action — confusing dead state
- **Fixed header consumes space**: `pt-[65px]` feels tight on small viewports

### Riley (Edge cases)
- **No cover image fallback**: Product ID in `text-white/10` — nearly invisible
- **Null description**: Section renders as heading with nothing below
- **Long title**: No truncation — could break layout

## Minor Observations

1. `rounded-r-lg` should match squircle system (`rounded-r-[2rem]`)
2. "Valor" label is formal/receipt-like — "Preço" is warmer
3. Button `transition-all` has no explicit duration (defaults to 150ms, design system says 200ms)
4. No `text-balance` on h1 — multi-line titles will have awkward rag
5. Decorative gradient overlay on image right edge (`from-white/5`) may wash out dark images

## Questions to Consider

1. **The CTA uses marinho (dark navy) instead of turquesa-dark (the brand's action color).** If the user's eye isn't drawn to the buy button, what is it drawn to?

2. **Trust signals look clickable but aren't.** At the exact moment a first-time buyer most needs reassurance, there are dead click targets. What message does that send?

3. **The brand vanishes from the header at the purchase moment.** No logo, no Unkempt signature. The trust that brought the user here is unacknowledged.

4. **"Sobre este material" is formatted as a legal disclaimer**, not a value proposition. If that's the section that converts browsers into buyers, why minimize it?
