export interface FacebookConversionEvent {
  event_name: string;
  event_time: number;
  event_id?: string;
  action_source: "website";
  event_source_url?: string;
  user_data?: {
    client_ip_address?: string;
    client_user_agent?: string;
    em?: string[];
    ph?: string[];
    fn?: string[];
    ln?: string[];
    ct?: string[];
    country?: string[];
    db?: string[];
  };
  custom_data?: {
    currency?: string;
    value?: string;
    content_name?: string;
    content_category?: string;
  };
}

export interface FacebookConversionPayload {
  data: FacebookConversionEvent[];
  test_event_code?: string;
}

export interface FacebookConversionResponse {
  events_received: number;
  messages: string[];
  fbtrace_id: string;
}

export interface ClientEventData {
  eventName: "ViewContent" | "InitiateCheckout" | "Purchase" | "Lead";
  eventSourceUrl: string;
  userAgent: string;
  eventId?: string;
  customData?: {
    content_name?: string;
    content_category?: string;
    value?: string;
    currency?: string;
  };
  customerInfo?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    city?: string;
    country?: string;
    dateOfBirth?: string;
  };
}

export interface WhopWebhookPayment {
  id: string;
  user_id: string;
  subtotal: number;
  amount_after_fees: number;
  currency: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface WhopWebhookEvent {
  type: string;
  data: WhopWebhookPayment;
}
