# 🏭 Robustponds.shop — Loja Online B2B

**Plataforma de e-commerce institucional da Robustponds®**, fabricante de portas isotérmicas, frigoríficas e soluções industriais.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Atlas Core](https://img.shields.io/badge/Atlas_Core-2.0-C52023)

---

## 📋 Índice

- [Arquitetura](#-arquitetura)
- [Tech Stack](#-tech-stack)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Design System](#-design-system)
- [Integração Atlas Core Banking](#-integração-atlas-core-banking)
- [Regra B2B — Preço Sob Consulta](#-regra-b2b--preço-sob-consulta)
- [API Routes](#-api-routes)
- [Rotas & Navegação](#-rotas--navegação)
- [Compliance & Legal](#-compliance--legal)
- [Instalação](#-instalação)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Deploy](#-deploy)

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────┐
│                  Browser                     │
│   SPA Navigation via Zustand Store          │
│   (Single route: / — client-side routing)   │
├─────────────────────────────────────────────┤
│              Next.js 16 App Router            │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│   │  Layout   │  │  Pages   │  │ Sections │ │
│   │ Navbar    │  │ PLP/PDP  │  │ Hero     │ │
│   │ Footer    │  │ Cart     │  │ CTA Bar  │ │
│   │          │  │ Checkout │  │ Products │ │
│   │          │  │ Contact  │  │ About    │ │
│   │          │  │ Quote    │  │ Quote    │ │
│   │          │  │ Terms    │  │          │ │
│   │          │  │ Privacy  │  │          │ │
│   │          │  │ Cookies  │  │          │ │
│   └──────────┘  └──────────┘  └──────────┘ │
├─────────────────────────────────────────────┤
│              API Routes (Next.js)             │
│   GET  /api/bootstrap                      │
│   POST /api/checkout                        │
│   POST /api/contact                         │
├─────────────────────────────────────────────┤
│           Atlas Core API v2.0                │
│   https://api.atlasglobal.digital/api/v1    │
│   ├── GET  /storefront/bootstrap             │
│   ├── POST /checkout/intent                 │
│   └── POST /storefront/contact              │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Tecnologia | Versão |
|-------|-----------|--------|
| **Framework** | Next.js (App Router) | 16.x |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **UI Library** | shadcn/ui (New York) | latest |
| **State Management** | Zustand (persist) | 5.x |
| **Server State** | TanStack React Query | 5.x |
| **Forms** | React Hook Form + Zod | 7.x / 4.x |
| **Animations** | Framer Motion | 12.x |
| **Icons** | Lucide React | latest |
| **Notifications** | Sonner | 2.x |
| **API Backend** | Atlas Core Banking | v2.0 |

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── bootstrap/route.ts    # Proxy: GET → Atlas /storefront/bootstrap
│   │   ├── checkout/route.ts     # Proxy: POST → Atlas /checkout/intent
│   │   └── contact/route.ts     # Proxy: POST → Atlas /storefront/contact
│   ├── globals.css               # Design System tokens (brand colors)
│   ├── layout.tsx                # Root layout (SEO, fonts, Toaster)
│   └── page.tsx                  # SPA Router + App Shell
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky nav, mobile menu, cart badge
│   │   └── Footer.tsx            # 4-col footer + Livro de Reclamações
│   ├── sections/
│   │   ├── HeroSection.tsx       # 6-slide hero (real images from site)
│   │   ├── CtaBar.tsx           # Red CTA bar (3 columns)
│   │   ├── ProductsPreview.tsx   # 6 category cards grid
│   │   ├── AboutSection.tsx      # 4 feature cards
│   │   └── QuoteSection.tsx      # "Orçamento Gratuito" CTA
│   └── pages/
│       ├── ProductListingPage.tsx  # PLP with filters + QuoteModal
│       ├── ProductDetailPage.tsx   # PDP with specs + related
│       ├── CartPage.tsx            # Cart with qty controls
│       ├── CheckoutPage.tsx        # 4 payment methods (Atlas)
│       ├── ContactPage.tsx         # Contact form + info
│       ├── QuotePage.tsx           # Quote request (auto-fill)
│       ├── TermsPage.tsx           # Termos e Condições
│       ├── PrivacyPage.tsx         # RGPD/GDPR Privacy Policy
│       └── CookiesPage.tsx         # Cookie Policy
├── lib/
│   ├── atlas.ts                   # Atlas Core API client
│   └── utils.ts                   # shadcn/ui cn() helper
├── store/
│   ├── cart.ts                    # Zustand cart store (persisted)
│   └── navigation.ts              # Zustand SPA routing store
└── types/
    └── index.ts                    # TypeScript types + CATEGORIES
```

---

## 🎨 Design System

### Paleta de Cores (clonada de robustponds.pt)

| Token | Cor | Uso |
|-------|-----|-----|
| `brand` / `#C52023` | Vermelho Robustponds | Primary, badges, highlights |
| `brand-dark` / `#BE312C` | Vermelho Escuro | CTA buttons, bars |
| `brand-heading` / `#161922` | Azul-Escuro | Headings H2/H3 |
| `brand-footer` / `#2C2C2C` | Cinza Escuro | Footer background |
| `brand-grey-section` / `#ECECEC` | Cinza Claro | Section backgrounds |
| `brand-grey-bar` / `#7E7E7C` | Cinza Médio | Info bars |

### Tipografia

- **Primary**: Montserrat (300–900 weights)
- **Hero Slider**: Open Sans (700 weight, uppercase)
- **Body**: 14px, Montserrat 400

### Layout

- **Container max-width**: 1220px
- **Navbar**: Sticky, shadow on scroll, 70px height
- **Hero**: 300px (mobile) → 400px (tablet) → 500px (desktop)
- **Grid Products**: 1 → 2 → 3 columns responsive

---

## 💳 Integração Atlas Core Banking

### API Base
```
Production: https://api.atlasglobal.digital/api/v1
```

### Endpoints Utilizados

#### 1. Bootstrap (`GET /storefront/bootstrap?store=robustponds-shop`)

Carregamento inicial do catálogo:
```typescript
interface BootstrapResponse {
  store: { id, name, logo, currency };
  catalog: { products: Product[] };
  checkout: Record<string, unknown>;
}
```

#### 2. Checkout Intent (`POST /checkout/intent`)

Payload conforme OpenAPI 2.0 do Atlas Core:
```json
{
  "store": "robustponds-shop",
  "method": "card",
  "amount": 1500.00,
  "customer": {
    "email": "cliente@empresa.pt",
    "name": "Nome da Empresa",
    "nif": "500123456",
    "birthDate": "1980-01-01"
  }
}
```

**Métodos de pagamento disponíveis:**

| Method | Campos Obrigatórios | Notas |
|--------|-------------------|-------|
| `card` | email, name | Stripe Elements |
| `multibanco` | email, name | Devolve entity + reference |
| `mbway` | email, name, phone | Espera confirmação |
| `crypto` | email, name, nif, birthDate | KYC/AML obrigatório |

#### 3. Contact Form (`POST /storefront/contact`)

Formulário de contacto e pedidos de orçamento.

### Higienização de Dados

```typescript
// Imagens: podem vir como string JSON ou array
function safeParseImages(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.filter(Boolean);
  try { return JSON.parse(raw as string); }
  catch { return []; }
}

// Preço: pode vir como string
function safeParsePrice(raw: unknown): number {
  return Number(raw) || 0;
}
```

---

## 💰 Regra B2B — Preço Sob Consulta

Produtos industriais sem preço público:

```typescript
if (product.priceEur === 0) {
  // UI: Mostra "Preço Sob Consulta" (vermelho)
  // Botão: "Pedir Orçamento" (em vez de "Adicionar ao Carrinho")
  // Ação: Abre QuoteModal ou redireciona para /orcamento
}
```

---

## 🔌 API Routes

| Route | Method | Descrição |
|-------|--------|-----------|
| `/api/bootstrap` | GET | Proxy para Atlas /storefront/bootstrap |
| `/api/checkout` | POST | Proxy para Atlas /checkout/intent |
| `/api/contact` | POST | Proxy para Atlas /storefront/contact |

---

## 🧭 Rotas & Navegação

A aplicação utiliza **SPA client-side routing** via Zustand. Todas as páginas são renderizadas na rota `/`:

| Rota Virtual | Componente | Descrição |
|-------------|-----------|-----------|
| `home` | HomePage | Hero + CTA + Products Preview + About + Quote |
| `produtos` | ProductListingPage | PLP com filtros de categoria |
| `produto` | ProductDetailPage | PDP com specs e relacionados |
| `carrinho` | CartPage | Carrinho de compras |
| `checkout` | CheckoutPage | Checkout com 4 métodos de pagamento |
| `contactos` | ContactPage | Formulário de contacto |
| `orcamento` | QuotePage | Pedido de orçamento (auto-fill) |
| `termos` | TermsPage | Termos e Condições |
| `privacidade` | PrivacyPage | Política de Privacidade (RGPD) |
| `cookies` | CookiesPage | Política de Cookies |

---

## ⚖️ Compliance & Legal

- **Livro de Reclamações Eletrónico**: Link no Footer apontando para https://www.livroreclamacoes.pt/
- **RGPD/GDPR**: Política de Privacidade completa com menção ao Atlas Core como processador
- **Cookies**: Política de Cookies com 3 categorias (Essential, Analytical, Marketing)
- **Termos e Condições**: T&C completo para e-commerce B2B de equipamentos industriais
- **KYC/AML**: Campos obrigatórios para pagamentos Crypto (NIF + Data Nascimento)

---

## 🚀 Instalação

```bash
# Clone
git clone https://github.com/nexflowx-hub/robustponds.git
cd robustponds

# Instalar dependências
bun install

# Iniciar desenvolvimento
bun run dev
```

---

## 🔑 Variáveis de Ambiente

```env
# Atlas Core (configurado em src/lib/atlas.ts)
ATLAS_API_URL=https://api.atlasglobal.digital/api/v1
ATLAS_STORE_ID=robustponds-shop
```

---

## 📦 Deploy

```bash
# Build
bun run build

# Start produção
bun run start
```

O output é `standalone` — inclui tudo num único diretório `.next/standalone/`.

---

## 📄 Licença

Propriedade da Robustponds®. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para a Robustponds® | Powered by Atlas Core Banking v2.0**
