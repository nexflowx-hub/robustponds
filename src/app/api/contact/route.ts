import { NextRequest, NextResponse } from "next/server";
import { sendContactForm } from "@/lib/atlas";

/**
 * POST /api/contact
 * Proxies contact form submissions to Atlas Core.
 *
 * Expected body:
 * {
 *   name: string,
 *   email: string,
 *   phone?: string,
 *   subject?: string,
 *   message: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      subject?: string;
      message?: string;
    };

    // ── Validation ──
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Nome é obrigatório" },
        { status: 400 },
      );
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Email é obrigatório" },
        { status: 400 },
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Email inválido" },
        { status: 400 },
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Mensagem é obrigatória" },
        { status: 400 },
      );
    }

    // Send to Atlas Core
    const result = await sendContactForm({
      name: name.trim(),
      email: email.trim(),
      phone: body.phone?.trim(),
      subject: body.subject?.trim(),
      message: message.trim(),
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("[API /contact] Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao enviar mensagem",
      },
      { status: 502 },
    );
  }
}
