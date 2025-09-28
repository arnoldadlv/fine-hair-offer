import { NextRequest, NextResponse } from "next/server";

import { facebookConversion } from "@/lib/facebook-conversion";
import { ClientEventData } from "@/types/facebook-conversion";

export async function POST(request: NextRequest) {
  try {
    const eventData: ClientEventData = await request.json();

    // Get client IP address
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    // Create Facebook event payload
    const event = facebookConversion.createEventPayload(eventData, clientIp);

    // Send to Facebook
    const result = await facebookConversion.sendEvents([event]);

    return NextResponse.json({
      success: true,
      message: "Event sent successfully",
      data: result,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Facebook Conversion API route error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}
