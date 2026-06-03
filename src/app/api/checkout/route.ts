import { NextRequest, NextResponse } from "next/server";
import { createCheckoutIntent } from "@/lib/atlas";
import type { CheckoutPayload } from "@/types";

const STORE_ID =
  process.env.ATLAS_STORE ?? "robustponds-shop";

/**
 * POST /api/checkout
 * Creates a checkout intent via Atlas Core.
 *
 * Expected body:
 * {
 *   method: "card" | "multibanco" | "mbway" | "crypto",
 *   customer: { email, nif?, birthDate? },
 *   items: [{ productId, name, quantity, unitPrice }]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { method, customer, items } = body as {
      method?: string;
      customer?: { email?: string; name?: string; nif?: string; birthDate?: string };
      items?: { productId: string; name: string; quantity: number; unitPrice: number }[];
    };

    // ── Validation ──
    if (!method || !["card", "multibanco", "mbway", "crypto"].includes(method)) {
      return NextResponse.json(
        { success: false, error: "Método de pagamento inválido" },
        { status: 400 },
      );
    }

    if (!customer?.email) {
      return NextResponse.json(
        { success: false, error: "Email é obrigatório" },
        { status: 400 },
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Carrinho vazio" },
        { status: 400 },
      );
    }

    // Calculate total amount
    const amount = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
    const roundedAmount = Math.round(amount * 100) / 100;

    // Build payload
    const payload: CheckoutPayload = {
      store: STORE_ID,
      method: method as CheckoutPayload["method"],
      amount: roundedAmount,
      customer: {
        email: customer.email,
        name: customer.name ?? "",
        nif: customer.nif,
        birthDate: customer.birthDate,
      },
      items,
    };

    // Call Atlas Core
    const result = await createCheckoutIntent(payload);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("[API /checkout] Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao processar o pagamento",
      },
      { status: 502 },
    );
  }
}
