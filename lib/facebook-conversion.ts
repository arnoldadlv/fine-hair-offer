import { createHash } from "crypto";

import {
  FacebookConversionEvent,
  FacebookConversionPayload,
  ClientEventData,
} from "@/types/facebook-conversion";

export class FacebookConversionAPI {
  private pixelId: string;
  private accessToken: string;
  private apiVersion: string;
  private testEventCode?: string;

  constructor() {
    this.pixelId = process.env.FACEBOOK_PIXEL_ID!;
    this.accessToken = process.env.FACEBOOK_ACCESS_TOKEN!;
    this.apiVersion = process.env.FACEBOOK_API_VERSION || "v21.0";
    this.testEventCode = process.env.FACEBOOK_TEST_EVENT_CODE;
  }

  private hashData(data: string): string {
    return createHash("sha256").update(data.toLowerCase().trim()).digest("hex");
  }

  createEventPayload(
    eventData: ClientEventData,
    clientIp: string,
  ): FacebookConversionEvent {
    const event: FacebookConversionEvent = {
      event_name: eventData.eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      event_source_url: eventData.eventSourceUrl,
      user_data: {
        client_ip_address: clientIp,
        client_user_agent: eventData.userAgent,
      },
    };

    if (eventData.eventId) {
      event.event_id = eventData.eventId;
    }

    // Add customer information if provided (hash PII)
    if (eventData.customerInfo) {
      const { customerInfo } = eventData;

      if (customerInfo.email) {
        event.user_data!.em = [this.hashData(customerInfo.email)];
      }

      if (customerInfo.phone) {
        event.user_data!.ph = [this.hashData(customerInfo.phone)];
      }

      if (customerInfo.firstName) {
        event.user_data!.fn = [this.hashData(customerInfo.firstName)];
      }

      if (customerInfo.lastName) {
        event.user_data!.ln = [this.hashData(customerInfo.lastName)];
      }

      if (customerInfo.city) {
        event.user_data!.ct = [this.hashData(customerInfo.city)];
      }

      if (customerInfo.country) {
        event.user_data!.country = [this.hashData(customerInfo.country)];
      }

      if (customerInfo.dateOfBirth) {
        event.user_data!.db = [this.hashData(customerInfo.dateOfBirth)];
      }
    }

    if (eventData.customData) {
      event.custom_data = eventData.customData;
    }

    return event;
  }

  async sendEvents(events: FacebookConversionEvent[]): Promise<any> {
    const payload: FacebookConversionPayload = {
      data: events,
    };

    // Add test event code at payload level (for testing environment)
    if (this.testEventCode) {
      payload.test_event_code = this.testEventCode;
    }

    const url = `https://graph.facebook.com/${this.apiVersion}/${this.pixelId}/events`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          access_token: this.accessToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          `Facebook API Error: ${response.status} - ${JSON.stringify(errorData)}`,
        );
      }

      return await response.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Facebook Conversion API Error:", error);
      throw error;
    }
  }
}

export const facebookConversion = new FacebookConversionAPI();
