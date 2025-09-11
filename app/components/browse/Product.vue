<template>
    <section ref="container" class="pl-10 animate-fade pr-3 w-[calc(100%-16px)] h-80 scroll-py-1 overflow-x-hidden">
        <BrowseGroup>
            <template v-for="(product, index) in filteredProducts" :key="product.id">
                <BrowseList
                    class="px-5"
                    :index="index"
                    @click="toggleExpanded(product.id)"
                    :class="{
                        'bg-muted focus:bg-muted':
                            hasSelectedChildProducts(product.id) && product.childProducts.length > 0,
                    }"
                >
                    <Avatar class="!rounded-xs size-12.5 border">
                        <AvatarImage src="/images/caplinq-logo.webp" class="p-2"></AvatarImage>
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div class="w-full pr-8 overflow-hidden">
                        <p class="truncate">
                            {{ product.name }}
                        </p>
                        <p class="text-xs text-foreground/50">
                            {{ product.id }}
                        </p>
                    </div>
                </BrowseList>

                <Transition
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 max-h-0 overflow-hidden"
                    enter-to-class="opacity-100 max-h-96"
                    leave-active-class="transition-all duration-300 ease-in"
                    leave-from-class="opacity-100 max-h-96"
                    leave-to-class="opacity-0 max-h-0 overflow-hidden"
                >
                    <BrowseChildProduct
                        v-if="
                            (expandedProducts.has(product.id) || hasSelectedChildProducts(product.id)) &&
                            product.childProducts.length > 0
                        "
                        :child-products="product.childProducts"
                    />
                </Transition>
                <Separator />
            </template>
        </BrowseGroup>
    </section>
</template>
<script lang="ts" setup>
import type { Supplier } from "@/types/supplier";

const props = defineProps<{
    supplierId: Supplier["id"];
}>();

const productStore = useProduct();
await productStore.getProductsBySupplierId(props.supplierId);
const allSupplierProducts = computed(() => productStore.products ?? []);

const search = defineModel<string>("search", { default: "" });
const { filtered: filteredProducts } = useFilteredList(allSupplierProducts, search, "name");

const { selectedProducts } = useSelectedProduct();

const expandedProducts = ref(new Set<string>());
const toggleExpanded = (productId: string) => {
    if (expandedProducts.value.has(productId)) {
        expandedProducts.value.delete(productId);
    } else {
        expandedProducts.value.add(productId);
    }
};

const hasSelectedChildProducts = (productId: string) => {
    const product = allSupplierProducts.value.find((p) => p.id === productId);
    if (!product) return false;

    return product.childProducts.some((childProduct) =>
        selectedProducts.some((selected) => selected.id === childProduct.id),
    );
};

const container: Ref<HTMLElement | null> = ref(null);
useEnhancedScrollbar(container, "scroll", "y");
</script>
