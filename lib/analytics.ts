"use client";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (
      command: "event" | "config" | "js" | "set",
      targetIdOrEventName: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Dispatches custom events to Google Tag Manager (GTM dataLayer) and GA4 (gtag).
 * Safely executes in the browser without throwing errors.
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params,
    });

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
  } catch {
    // Fail silently in restricted environments
  }
}

/** Track WhatsApp booking clicks (Key Event: book_whatsapp) */
export function trackWhatsAppClick(label = "General WhatsApp Booking", service = "") {
  trackEvent("book_whatsapp", {
    event_category: "Conversion",
    event_label: label,
    service_name: service,
  });
}

/** Track phone call clicks (Key Event: book_call) */
export function trackPhoneClick(phone = "+233244716535", label = "Primary Line") {
  trackEvent("book_call", {
    event_category: "Conversion",
    event_label: label,
    phone_number: phone,
  });
}

/** Track consultation/booking form submissions (Key Event: book_form) */
export function trackFormSubmit(formName = "Contact Form", service = "") {
  trackEvent("book_form", {
    event_category: "Conversion",
    form_name: formName,
    service_name: service,
  });
}
