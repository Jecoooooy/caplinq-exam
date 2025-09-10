<template>
    <section ref="container" class="pl-10 pr-3 w-[calc(100%-16px)] h-80 scroll-py-1 overflow-x-hidden">
        <BrowseGroup>
            <template v-for="(supplier, index) in filteredSuppliers" :key="supplier.id">
                <BrowseList
                    :index="index"
                    class="p-4"
                    @click="getSupplierProducts(supplier)"
                    @keydown.enter="getSupplierProducts(supplier)"
                >
                    {{ supplier.name }}
                </BrowseList>
                <Separator />
            </template>
        </BrowseGroup>
    </section>
</template>
<script lang="ts" setup>
import type { Supplier } from "@/types/supplier";

const { suppliers } = storeToRefs(useSupplier());
const allSuppliers = computed(() => suppliers.value ?? []);

const search = defineModel<string>("search", { default: "" });
const { filtered: filteredSuppliers } = useFilteredList(allSuppliers, search, "name");

const container: Ref<HTMLElement | null> = ref(null);
useEnhancedScrollbar(container, "scroll", "y");

const activeSupplier = inject<Ref<Supplier | null> | null>("supplier", null);

function getSupplierProducts(supplier: Supplier) {
    activeSupplier && (activeSupplier.value = supplier);
}
</script>
