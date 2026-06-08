import { NextRequest, NextResponse } from "next/server";
import { createCheckoutIntent } from "@/lib/atlas";
import type { CheckoutPayload } from "@/types";

const STORE_ID =
  process.env.ATLAS_STORE ?? "robustponds-shop";

/**
 * POST /api/checkout
 * Creates a checkout intent via Atlas Core.
 *
 * Atlas Core OpenAPI 3.0 — POST /checkout/intent
 * Required fields: store, method, amount, customer
 * Method enum: card, multibanco, mbway, crypto
 * Customer fields: email, nif (obrigatório para crypto), birthDate (obrigatório para crypto)
 *
 * Expected body:
 * {
 *   method: "card" | "multibanco" | "mbway" | "crypto",
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
    if (!method || !["card", "multibanco", "mbway", "crypto"].includes(method)) {
      return NextResponse.json(
        { success: false, error: "Método de pagamento inválido" },
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

    // Crypto-specific validation (KYC/AML)
    if (method === "crypto") {
      if (!customer.nif) {
        return NextResponse.json(
          { success: false, error: "NIF é obrigatório para pagamentos com criptomoedas" },
          { status: 400 },
        );
      }
      if (!customer.birthDate) {
        return NextResponse.json(
          { success: false, error: "Data de nascimento é obrigatória para pagamentos com criptomoedas" },
          { status: 400 },
        );
      }
    }

    // Build payload per Atlas Core OpenAPI 3.0 spec
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
