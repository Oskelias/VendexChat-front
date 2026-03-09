type EventParams = Record<string, string | number | boolean | undefined>;

export const trackEvent = (eventName: string, params: EventParams = {}) => {
  if (typeof window === "undefined") return;
  const payload = { event: eventName, ...params };
  (window as any).dataLayer?.push(payload);
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, params);
  }
  if (typeof (window as any).fbq === "function") {
    (window as any).fbq("trackCustom", eventName, params);
  }
};
