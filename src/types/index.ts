// ── Product Types ──
export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: string;
  images: string[];
  priceEur: number;
  sku?: string;
  stock?: number;
  featured?: boolean;
  ref?: string;
  specs?: Record<string, string>;
}

// ── Cart Types ──
export interface CartItem {
  product: Product;
  quantity: number;
}

// ── Page Navigation ──
export type PageView =
  | 'home'
  | 'produtos'
  | 'produto'
  | 'carrinho'
  | 'checkout'
  | 'contactos'
  | 'orcamento'
  | 'termos'
  | 'privacidade'
  | 'cookies';

// ── Robustponds Categories (matching original site) ──
export const CATEGORIES = [
  'Todos',
  'Complementos',
  'Cortina de Lamelas',
  'Painel',
  'Portas',
  'Proteção',
  'Revestimentos Higiénicos',
] as const;

export type Category = (typeof CATEGORIES)[number];

// ── Payment Methods (Atlas Core API v2.0) ──
export type PaymentMethod = 'card' | 'multibanco' | 'mbway' | 'crypto';

// ── Checkout Payload (Atlas Core OpenAPI 3.0 - /checkout/intent) ──
// Required: store, method, amount, customer
// Method enum: card, multibanco, mbway, crypto
// Customer: email, nif (obrigatório para crypto), birthDate (obrigatório para crypto)
export interface CheckoutPayload {
  store: string;
  method: PaymentMethod;
  amount: number;
  customer: {
    email: string;
    nif?: string;       // Obrigatório para crypto (KYC)
    birthDate?: string;  // Obrigatório para crypto (AML) - format date
  };
}

export interface CheckoutResponse {
  actionType: string;
  payload: {
    clientSecret?: string;
    entity?: string;     // Multibanco
    reference?: string;  // Multibanco
    redirect?: string;
    url?: string;        // Card redirect
    qr_code?: string;
    address?: string;
    transaction_id?: string;  // MB WAY / Crypto
    network?: string;         // Crypto
  };
  message?: string;
}

// ── Store / Bootstrap ──
export interface StoreConfig {
  id: string;
  name: string;
  logo?: string;
  currency: string;
}

export interface BootstrapResponse {
  store: StoreConfig;
  catalog: {
    products: Product[];
  };
  checkout: Record<string, unknown>;
}
