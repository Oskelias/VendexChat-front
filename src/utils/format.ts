const CURRENCY_LOCALE_MAP: Record<string, string> = {
  ARS: 'es-AR',
  UYU: 'es-UY',
  CLP: 'es-CL',
  MXN: 'es-MX',
  EUR: 'es-ES',
  COP: 'es-CO',
  PEN: 'es-PE',
  PYG: 'es-PY',
  BOB: 'es-BO',
  USD: 'en-US',
}

export function formatPrice(price: number, currency = 'ARS'): string {
  const locale = CURRENCY_LOCALE_MAP[currency] ?? 'es-AR'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

export function getSocialLink(handle: string, platform: 'instagram' | 'facebook'): string {
  if (!handle) return "";

  const clean = handle.trim();
  if (clean.startsWith("http")) return clean;

  const handleWithoutAt = clean.replace(/^@/, "");

  // Platform specific cleaning if they put the domain but not the protocol
  const domain = platform === 'instagram' ? 'instagram.com' : 'facebook.com';

  // Si ya contiene el dominio (ej: facebook.com/usuario) le agregamos https://
  if (handleWithoutAt.toLowerCase().includes(domain)) {
    return `https://${handleWithoutAt}`;
  }

  // Si es solo el usuario, construimos la URL completa
  return `https://${domain}/${handleWithoutAt}`;
}

export function sanitizePhoneNumber(phone: string): string {
  if (!phone) return "";
  // Eliminar todo lo que no sea número
  return phone.replace(/\D/g, "");
}
