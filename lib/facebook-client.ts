import { ClientEventData } from "@/types/facebook-conversion";

export async function sendFacebookEvent(eventData: ClientEventData) {
  try {
    const response = await fetch("/api/facebook-conversion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`Failed to send event: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending Facebook event:", error);
    throw error;
  }
}

export function trackViewContent() {
  const eventData: ClientEventData = {
    eventName: "ViewContent",
    eventSourceUrl: window.location.href,
    userAgent: navigator.userAgent,
    customData: {
      content_name: "Fine Hair Volume Guide Landing Page",
      content_category: "landing_page",
    },
  };

  sendFacebookEvent(eventData).catch((error) => {
    console.error("ViewContent tracking failed:", error);
  });
}

export function trackInitiateCheckout() {
  const eventData: ClientEventData = {
    eventName: "InitiateCheckout",
    eventSourceUrl: window.location.href,
    userAgent: navigator.userAgent,
    customData: {
      content_name: "Fine Hair Volume Guide - Purchase",
      content_category: "checkout",
    },
  };

  sendFacebookEvent(eventData).catch((error) => {
    console.error("InitiateCheckout tracking failed:", error);
  });
}

export function trackPurchase(purchaseData: {
  transactionId: string;
  value: number;
  currency: string;
  customerInfo?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}) {
  const eventData: ClientEventData = {
    eventName: "Purchase",
    eventSourceUrl: window.location.href,
    userAgent: "server", // Server-side tracking
    eventId: `purchase_${purchaseData.transactionId}`,
    customData: {
      content_name: "Fine Hair Volume Guide",
      content_category: "digital_product",
      value: purchaseData.value.toString(),
      currency: purchaseData.currency,
    },
    customerInfo: purchaseData.customerInfo,
  };

  return sendFacebookEvent(eventData);
}
