import type { CatalogResponse } from "../../types";

export const MOCK_TENANT = {
    id: "1",
    name: "Vendex Shop Demo",
    slug: "demo",
    logo_url: "https://api.dicebear.com/7.x/shapes/svg?seed=vendex",
    whatsapp: "5491122334455",
    config: {
        catalogView: "grid", // "list" | "grid"
        primaryColor: "#10B981",
    }
};

export const MOCK_CATALOG: CatalogResponse = {
    store: MOCK_TENANT as any,
    categories: [
        {
            id: "cat1",
            name: "Hamburguesas 🍔",
            products: [
                {
                    id: "1",
                    name: "Doble Bacon Burger",
                    description: "Doble carne, doble cheddar, mucho bacon crocante y salsa Vendex.",
                    price: 9500,
                    offer_price: null,
                    image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
                },
                {
                    id: "2",
                    name: "Crispy Chicken",
                    description: "Pollo frito súper crocante, lechuga, tomate y mayonesa casera.",
                    price: 8200,
                    offer_price: null,
                    image_url: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&q=80",
                }
            ]
        },
        {
            id: "cat2",
            name: "Pizzas 🍕",
            products: [
                {
                    id: "3",
                    name: "Muzzarella Premium",
                    description: "Salsa de tomate natural, muzzarella de exportación y aceitunas.",
                    price: 12000,
                    offer_price: null,
                    image_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
                },
                {
                    id: "4",
                    name: "Pepperoni Blast",
                    description: "Cargada de pepperoni americano y un toque de picante.",
                    price: 14500,
                    offer_price: null,
                    image_url: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80",
                }
            ]
        }
    ]
};

export async function fetchMockCatalog(slug: string): Promise<CatalogResponse> {
    console.log(`[MockAdapter] Fetching catalog for: ${slug}`);
    await new Promise(resolve => setTimeout(resolve, 800));
    if (slug === "error") throw new Error("Store not found (Mock Error)");
    return MOCK_CATALOG;
}
