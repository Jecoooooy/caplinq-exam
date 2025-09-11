import type { PaginatedResponse, Product } from "@/types/product";

export async function getProductsData(): Promise<PaginatedResponse<Product>> {
    const data = await useStorage().getItem<PaginatedResponse<Product>>("data:products.json");

    if (!data) {
        throw createError({
            statusCode: 404,
            statusMessage: "Products data not found",
        });
    }

    return data;
}

export async function getProductsBySupplierId(supplierId: string): Promise<Product[]> {
    const data = await getProductsData();

    return data.data.filter((product: Product) => product.supplierId === supplierId);
}
