import { H3Event } from "h3";
import type { Product } from "@/types/product";
import { getProductsBySupplierId } from "../../util/products";

export default defineEventHandler(async (event: H3Event): Promise<Product[]> => {
    const supplierId = getRouterParam(event, "supplierId");

    if (!supplierId) {
        throw createError({
            statusCode: 400,
            statusMessage: "Supplier ID is required",
        });
    }

    return await getProductsBySupplierId(supplierId);
});
