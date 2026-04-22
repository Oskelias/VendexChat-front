const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;

// Cloudflare R2 public dev URL — replace with custom domain via env var for production CDN
const CF_IMAGES_BASE = import.meta.env.VITE_CF_IMAGES_URL as string | undefined;

const R2_DEV_PATTERN = /https:\/\/pub-[a-f0-9]+\.r2\.dev/;

/**
 * Returns an optimized image URL. For Supabase Storage URLs, uses the built-in
 * image transform endpoint to resize. For R2 URLs, swaps to the custom CDN
 * domain if VITE_CF_IMAGES_URL is set.
 */
export function getProductImageUrl(url: string | null | undefined, width: number): string {
    if (!url) return "";

    // Supabase Storage → use image transform for resizing
    if (SUPABASE_URL && url.startsWith(SUPABASE_URL)) {
        const transformed = url.replace(
            "/storage/v1/object/public/",
            "/storage/v1/render/image/public/"
        );
        const sep = transformed.includes("?") ? "&" : "?";
        return `${transformed}${sep}width=${width}&quality=75&resize=contain`;
    }

    // Cloudflare R2 dev URL → swap to custom CDN domain if configured
    if (CF_IMAGES_BASE && R2_DEV_PATTERN.test(url)) {
        return url.replace(R2_DEV_PATTERN, CF_IMAGES_BASE.replace(/\/$/, ""));
    }

    return url;
}
