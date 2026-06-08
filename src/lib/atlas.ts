import type {
  Product,
  BootstrapResponse,
  CheckoutPayload,
  CheckoutResponse,
} from "@/types";

// ──────────────────────────────────────────────
// Atlas Core API Client
// OpenAPI 2.0 — BASE: https://api.atlasglobal.digital/api/v1
// ──────────────────────────────────────────────

const ATLAS_BASE = process.env.ATLAS_BASE ?? "https://api.atlasglobal.digital/api/v1";
const STORE_ID = process.env.ATLAS_STORE ?? "robustponds-shop";
const ATLAS_TIMEOUT = 15_000; // 15 seconds

/** Generic fetch wrapper with timeout and error handling */
async function atlasFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ATLAS_TIMEOUT);

  try {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${ATLAS_BASE}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(
        `Atlas API error ${response.status}: ${body || response.statusText}`,
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Atlas API request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

// ── Safe Parsers ──

/**
 * Safely parse the images field from Atlas Core.
 * Atlas may return images as a JSON string, an array, or null/undefined.
 */
export function safeParseImages(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.filter((img): img is string => typeof img === "string" && img.length > 0);
  }

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((img): img is string => typeof img === "string" && img.length > 0);
      }
    } catch {
      // Single URL string — return as single-element array
      if (raw.length > 0) return [raw];
    }
  }

  return [];
}

/**
 * Safely parse the price field from Atlas Core.
 * Atlas may return price as a number, numeric string, or null/undefined.
 */
export function safeParsePrice(raw: unknown): number {
  if (typeof raw === "number" && isFinite(raw)) {
    return Math.round(raw * 100) / 100; // 2 decimal places
  }

  if (typeof raw === "string") {
    const num = Number(raw);
    if (isFinite(num)) {
      return Math.round(num * 100) / 100;
    }
  }

  return 0;
}

// ── Normalizers ──

/** Normalize a raw Atlas product into our typed Product interface */
export function normalizeProduct(raw: Record<string, unknown>): Product {
  const images = safeParseImages(raw.images);
  const priceEur = safeParsePrice(raw.price ?? raw.priceEur ?? raw.price_eur);

  return {
    id: String(raw.id ?? ""),
    name: String(raw.name ?? "Untitled"),
    slug: String(raw.slug ?? raw.name?.toString().toLowerCase().replace(/\s+/g, "-") ?? ""),
    description: String(raw.description ?? raw.longDescription ?? ""),
    shortDescription: String(raw.shortDescription ?? raw.short_description ?? raw.description ?? ""),
    category: String(raw.category ?? "Complementos") as Product["category"],
    images,
    priceEur,
    sku: raw.sku ? String(raw.sku) : undefined,
    stock: typeof raw.stock === "number" ? raw.stock : undefined,
    featured: Boolean(raw.featured),
  };
}

// ── API Methods ──

/**
 * GET /storefront/bootstrap?store=robustponds-shop
 * Fetches store config and product catalog.
 */
export async function fetchBootstrap(): Promise<BootstrapResponse> {
  const data = await atlasFetch<Record<string, unknown>>(
    `/storefront/bootstrap?store=${encodeURIComponent(STORE_ID)}`,
  );

  const rawProducts = Array.isArray(
    (data.catalog as Record<string, unknown>)?.products,
  )
    ? ((data.catalog as Record<string, unknown>).products as Record<string, unknown>[])
    : [];

  return {
    store: data.store as BootstrapResponse["store"],
    catalog: {
      products: rawProducts.map(normalizeProduct),
    },
    checkout: (data.checkout as BootstrapResponse["checkout"]) ?? {
      enabled: false,
      methods: [],
    },
  };
}

/**
 * POST /checkout/intent
 * Creates a checkout intent with Atlas Core.
 */
export async function createCheckoutIntent(
  payload: CheckoutPayload,
): Promise<CheckoutResponse> {
  return atlasFetch<CheckoutResponse>("/checkout/intent", {
    method: "POST",
    body: JSON.stringify({
      store: payload.store,
      method: payload.method,
      amount: payload.amount,
      customer: payload.customer,
    }),
  });
}

/**
 * POST /storefront/contact
 * Sends a contact form submission to Atlas Core.
 */
export async function sendContactForm(params: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean }> {
  return atlasFetch<{ success: boolean }>("/storefront/contact", {
    method: "POST",
    body: JSON.stringify({
      store: STORE_ID,
      ...params,
    }),
  });
}
