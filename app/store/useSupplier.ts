import type { Supplier } from "@/types/supplier";

export const useSupplier = defineStore("supplier", () => {
    const suppliers = ref<Supplier[]>([]);
    const activeSupplier = ref<Supplier | null>(null);
    const suppliersPending = ref(false);
    const suppliersError = ref<unknown>(null);

    async function getSuppliers() {
        suppliersPending.value = true;
        try {
            const { data, error } =
                await useFetch<Supplier[]>("/api/suppliers");
            suppliers.value = data.value ?? [];
            suppliersError.value = error.value;
        } finally {
            suppliersPending.value = false;
        }
    }

    return {
        suppliers,
        activeSupplier,
        suppliersPending,
        suppliersError,
        getSuppliers,
    };
});
