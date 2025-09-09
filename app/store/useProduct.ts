import type { PaginatedResponse, Product } from "@/types/product";

export const useProduct = defineStore("product", () => {
    const products = ref<PaginatedResponse<Product> | null>(null);
    const productsPending = ref(false);
    const productsError = ref<unknown>(null);

    async function getProductPaginate() {
        productsPending.value = true;
        try {
            const { data, error } =
                await useFetch<PaginatedResponse<Product>>("/api/products");
            products.value = data.value ?? null;
            productsError.value = error.value;
        } finally {
            productsPending.value = false;
        }
    }

    return {
        products,
        productsPending,
        productsError,
        getProductPaginate,
    };
});
