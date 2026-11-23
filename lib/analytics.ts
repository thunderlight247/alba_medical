"use client";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      targetIdOrEventName: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Dispatches a custom event to Google Analytics 4 (GA4).
 * Safely executes only when window.gtag is available in the browser.
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", eventName, params);
  } catch {
    // Fail silently in environments where GA is blocked
  }
}

/** Track WhatsApp booking clicks (GA4 Key Event: book_whatsapp) */
export function trackWhatsAppClick(label = "General WhatsApp Booking", service = "") {
  trackEvent("book_whatsapp", {
    event_category: "Conversion",
    event_label: label,
    service_name: service,
  });
}

/** Track phone call clicks (GA4 Key Event: book_call) */
export function trackPhoneClick(phone = "+233244716535", label = "Primary Line") {
  trackEvent("book_call", {
    event_category: "Conversion",
    event_label: label,
    phone_number: phone,
  });
}

/** Track consultation/booking form submissions (GA4 Key Event: book_form) */
export function trackFormSubmit(formName = "Contact Form", service = "") {
  trackEvent("book_form", {
    event_category: "Conversion",
    form_name: formName,
    service_name: service,
  });
}
