import { createHmac } from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { trackPurchase } from "@/lib/facebook-client";
import { WhopWebhookEvent } from "@/types/facebook-conversion";

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
): boolean {
  const expectedSignature = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return `sha256=${expectedSignature}` === signature;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-whop-signature");
    const webhookSecret = process.env.WHOP_WEBHOOK_SECRET;

    if (!webhookSecret) {
      // eslint-disable-next-line no-console
      console.error("WHOP_WEBHOOK_SECRET not configured");

      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 },
      );
    }

    if (!signature) {
      // eslint-disable-next-line no-console
      console.error("Missing webhook signature");

      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature, webhookSecret)) {
      // eslint-disable-next-line no-console
      console.error("Invalid webhook signature");

      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event: WhopWebhookEvent = JSON.parse(body);

    // Handle payment succeeded event
    if (event.type === "payment.succeeded") {
      const payment = event.data;

      // eslint-disable-next-line no-console
      console.log("Processing payment succeeded webhook:", payment.id);

      // Track purchase with Facebook Conversions API
      await trackPurchase({
        transactionId: payment.id,
        value: payment.amount_after_fees / 100, // Convert cents to dollars
        currency: payment.currency.toUpperCase(),
        customerInfo: {
          // Note: Whop doesn't provide customer email/name in webhook by default
          // You might need to fetch user details using Whop API if needed
        },
      });

      // eslint-disable-next-line no-console
      console.log("Facebook Purchase event tracked successfully");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Whop webhook error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
