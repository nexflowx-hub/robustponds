import { NextResponse } from "next/server";
import { fetchBootstrap } from "@/lib/atlas";

/**
 * GET /api/bootstrap
 * Proxies the Atlas Core storefront bootstrap endpoint.
 * Returns store configuration and the full product catalog.
 */
export async function GET() {
  try {
    const bootstrap = await fetchBootstrap();

    return NextResponse.json({
      success: true,
      store: bootstrap.store,
      products: bootstrap.catalog.products,
      checkout: bootstrap.checkout,
    });
  } catch (error) {
    console.error("[API /bootstrap] Error fetching bootstrap:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch store data",
      },
      { status: 502 },
    );
  }
}
