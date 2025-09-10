import { H3Event } from "h3";
import type { PaginatedResponse, Product } from "@/types/product";
import { getProductsData } from "../util/products";

export default defineEventHandler(
    async (_event: H3Event): Promise<PaginatedResponse<Product>> => {
        return await getProductsData();
    },
);
