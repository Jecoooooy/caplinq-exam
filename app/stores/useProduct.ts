import type { Product } from "@/types/product";
import type { Supplier } from "@/types/supplier";
export const useProduct = defineStore("product", () => {
    const products = ref<Product[]>([]);

    async function getProductsBySupplierId(supplierId: Supplier["id"]) {
        products.value = await $fetch(`/api/products/${supplierId}`);
    }

    return {
        products,
        getProductsBySupplierId,
    };
});
