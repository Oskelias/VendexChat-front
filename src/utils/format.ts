export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(price);
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
