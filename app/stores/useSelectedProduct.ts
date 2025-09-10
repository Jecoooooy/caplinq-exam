import type { ChildProduct } from "@/types/product";

export type SelectedProduct = ChildProduct & { quantity: number };

export const useSelectedProduct = defineStore("selected", () => {
    const selectedProducts = ref<SelectedProduct[]>([]);
    const count = computed(() => selectedProducts.value.length);

    const addProduct = (product: SelectedProduct) => {
        selectedProducts.value.push(product);
    };

    const deleteProduct = (productId: string) => {
        const index = selectedProducts.value.findIndex((p) => p.id === productId);
        if (index > -1) {
            selectedProducts.value.splice(index, 1);
        }
    };

    const updateQuantity = (productId: string, quantity: number) => {
        const product = selectedProducts.value.find((p) => p.id === productId);
        if (product) {
            product.quantity = quantity;
        }
        console.log(selectedProducts);
    };

    return {
        selectedProducts,
        count,
        addProduct,
        deleteProduct,
        updateQuantity,
    };
});
