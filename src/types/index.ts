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

// ── Payment Methods (Atlas Core Banking API) ──
export type PaymentMethod = 'card' | 'multibanco' | 'mbway' | 'bizum';

// ── Checkout Payload (Atlas Core Banking - /checkout/intent) ──
// Required: store, method, amount, customer
// Method enum: card, multibanco, mbway, bizum
// Customer: email, phone (obrigatório para mbway/bizum)
export interface CheckoutPayload {
  store: string;
  method: PaymentMethod;
  amount: number;
  customer: {
    email: string;
    nif?: string;       // Opcional
    birthDate?: string;  // Opcional
  };
}

export interface CheckoutResponse {
  actionType: string;
  payload: {
    clientSecret?: string;
    entity?: string;     // Multibanco
    reference?: string;  // Multibanco
    redirect?: string;
    url?: string;        // Card / Bizum redirect
    qr_code?: string;
    address?: string;
    transaction_id?: string;  // MB WAY / Bizum
    network?: string;         // Network info
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
