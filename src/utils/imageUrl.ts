// Cloudflare R2 public dev URL — replaced with custom domain via env var for CDN
const CF_IMAGES_BASE = import.meta.env.VITE_CF_IMAGES_URL as string | undefined;

const R2_DEV_PATTERN = /https:\/\/pub-[a-f0-9]+\.r2\.dev/;

export function getProductImageUrl(url: string | null | undefined, _width: number): string {
    if (!url) return "";

    // Cloudflare R2 dev URL → swap to custom CDN domain if configured
    if (CF_IMAGES_BASE && R2_DEV_PATTERN.test(url)) {
        return url.replace(R2_DEV_PATTERN, CF_IMAGES_BASE.replace(/\/$/, ""));
    }

    return url;
}
