import { H3Event } from "h3";
import type { PaginatedResponse, Product } from "@/types/product";
export default defineEventHandler(
    async (_event: H3Event): Promise<PaginatedResponse<Product>> => {
        const data =
            await useStorage().getItem<PaginatedResponse<Product>>(
                "data:products.json",
            );
        return data!;
    },
);
