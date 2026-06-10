import { NextRequest, NextResponse } from "next/server";
import { createCheckoutIntent } from "@/lib/atlas";
import type { CheckoutPayload } from "@/types";

const STORE_ID =
  process.env.ATLAS_STORE ?? "robustponds-shop";

/**
 * POST /api/checkout
 * Creates a checkout intent via Atlas Core Banking.
 *
 * Atlas Core Banking — POST /checkout/intent
 * Required fields: store, method, amount, customer
 * Method enum: card, multibanco, mbway, bizum
 * Customer fields: email (obrigatório)
 *
 * Expected body:
 * {
 *   method: "card" | "multibanco" | "mbway" | "bizum",
 *   amount: number,
 *   customer: { email, nif?, birthDate? }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { method, amount, customer } = body as {
      method?: string;
      amount?: number;
      customer?: { email?: string; nif?: string; birthDate?: string };
    };

    // ── Validation ──
    const validMethods = ["card", "multibanco", "mbway", "bizum"];
    if (!method || !validMethods.includes(method)) {
      return NextResponse.json(
        { success: false, error: `Método de pagamento inválido. Métodos aceites: ${validMethods.join(", ")}` },
        { status: 400 },
      );
    }

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Montante inválido" },
        { status: 400 },
      );
    }

    if (!customer?.email) {
      return NextResponse.json(
        { success: false, error: "Email é obrigatório" },
        { status: 400 },
      );
    }

    // Build payload per Atlas Core Banking spec
    const payload: CheckoutPayload = {
      store: STORE_ID,
      method: method as CheckoutPayload["method"],
      amount: Math.round(amount * 100) / 100,
      customer: {
        email: customer.email,
        nif: customer.nif || undefined,
        birthDate: customer.birthDate || undefined,
      },
    };

    // Call Atlas Core Banking API
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
            : "Erro ao processar o pagamento. Por favor, tente novamente.",
      },
      { status: 502 },
    );
  }
}
