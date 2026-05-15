# Entidades — A Ciência da Lua

> Última revisão: 2026-05-15
> Revisão gerada após migração de Hotmart para Mercado Pago (Checkout Pro).

---

## User
> Login ao painel administrativo. Serviço de auth separado do Customer.

| Campo | Tipo | Observação |
|---|---|---|
| id | UUID | PK |
| email | string | único |
| password | string | hash bcrypt |
| created_at | timestamp | |

---

## Customer
> Aluno ou professor que comprou um material. Autenticação via Magic Link, sem senha.

| Campo | Tipo | Observação |
|---|---|---|
| id | UUID | PK |
| email | string | único, vindo do `payer.email` retornado pelo Mercado Pago |
| name | string | |
| isActive | boolean | para bloquear acesso se necessário |
| created_at | timestamp | |
| updated_at | timestamp | |

---

## AuthToken
> Token temporário do Magic Link. Deletar registros após 7 dias.

| Campo | Tipo | Observação |
|---|---|---|
| token | string | UUID ou hash único |
| expires_at | timestamp | validade de 15 minutos |
| usedAt | timestamp | nulo até ser consumido, invalida após uso |
| customerId | UUID | FK → Customer |

---

## Product
> Material didático à venda. `category` define se é para aluno ou professor.
> O `id` (UUID) é usado como `external_reference` na preferência de pagamento do Mercado Pago — isso permite identificar qual produto foi comprado ao receber o webhook.

| Campo       | Tipo      | Observação                                           |
| ----------- | --------- | ---------------------------------------------------- |
| id          | UUID      | PK — usado como `external_reference` no Mercado Pago |
| title       | string    |                                                      |
| description | string    |                                                      |
| price       | decimal   | usado ao criar a preferência de pagamento via API    |
| coverUrl    | string    | caminho no storage da VPS                            |
| fileUrl     | string    | caminho do PDF no storage da VPS                     |
| category    | enum      | `STUDENT` \| `TEACHER`                               |
| isActive    | boolean   | controla exibição na vitrine                         |
| createdAt   | timestamp |                                                      |
| updatedAt   | timestamp |                                                      |

---

## Purchase
> Registra qual Customer comprou qual Product. Criada após validação do webhook do Mercado Pago.
> `mercadoPagoPaymentId` garante idempotência — evita duplicar o acesso se o webhook chegar mais de uma vez.

| Campo | Tipo | Observação |
|---|---|---|
| id | UUID | PK |
| customerId | UUID | FK → Customer |
| productId | UUID | FK → Product — resolvido via `external_reference` do pagamento |
| mercadoPagoPaymentId | string | `id` retornado em `GET /v1/payments/{id}`, único |
| amountPaid | decimal | `transaction_amount` retornado pelo Mercado Pago |
| purchasedAt | timestamp | `date_approved` retornado pelo Mercado Pago |
| createdAt | timestamp | |

---

## Relacionamentos

```
Customer  1 ──── N  AuthToken
Customer  1 ──── N  Purchase
Product   1 ──── N  Purchase
User      (isolado — auth admin separado)
```

---

## Fluxo pós-compra (resumo)

```
Usuário finaliza pagamento no Checkout Pro (Mercado Pago)
    ↓
Mercado Pago envia webhook POST → NestJS
(payload mínimo: { data: { id: "payment_id" } })
    ↓
NestJS retorna 200 imediatamente
    ↓
NestJS consulta GET /v1/payments/{id} → obtém dados completos:
  - status          → deve ser "approved"
  - payer.email     → e-mail do comprador (cria ou localiza o Customer)
  - external_reference → UUID do Product no banco
  - id              → mercadoPagoPaymentId (idempotência)
  - transaction_amount → valor pago
  - date_approved   → data da confirmação
    ↓
Verifica idempotência: Purchase com mercadoPagoPaymentId já existe? → ignorar
    ↓
Cria Customer pelo payer.email (se não existir)
Cria Purchase (customerId + productId + mercadoPagoPaymentId + amountPaid + purchasedAt)
    ↓
Envia e-mail de boas-vindas com Magic Link
    ↓
Customer clica no link → AuthToken validado → dashboard
```

---

## Pendências / Decisões abertas

- [ ] Dashboard do aluno precisa separar as abas **Para estudar** (STUDENT) e **Para dar aula** (TEACHER) — wireframe ainda não reflete isso
- [ ] Signed URLs para download dos PDFs — implementar na Fase 4
- [ ] Validar assinatura HMAC-SHA256 do webhook do Mercado Pago antes de processar (segurança)
