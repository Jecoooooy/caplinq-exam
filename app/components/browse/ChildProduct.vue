<template>
    <BrowseGroup :is-auto-focus="false">
        <template v-for="(childProduct, childIndex) in childProductWithQuantity" :key="childProduct.id">
            <Separator />
            <BrowseList
                :index="childIndex"
                :is-arrow-visible="false"
                :is-auto-focus="false"
                class="px-8 animate-fade cursor-pointer focus:bg-muted"
                :class="{
                    'bg-muted': !isChildProductSelected(childProduct.id),
                    '!bg-accent/20': isChildProductSelected(childProduct.id),
                }"
                @click="toggleChildProduct(childProduct)"
            >
                <Checkbox
                    class="border-muted-foreground/50 border-2"
                    :model-value="isChildProductSelected(childProduct.id)"
                    @click="toggleChildProduct(childProduct)"
                ></Checkbox>
                <div class="flex-1 overflow-hidden">
                    <p class="text-sm truncate font-medium">
                        {{ childProduct.name }}
                    </p>
                    <p class="text-xs text-foreground/50">SKU: {{ childProduct.sku }}</p>
                </div>
                <div
                    class="text-xs text-foreground/60"
                    @click="isChildProductSelected(childProduct.id) ? $event.stopPropagation() : null"
                >
                    <NumberField
                        :model-value="childProduct.quantity"
                        :min="0"
                        :disabled="!isChildProductSelected(childProduct.id)"
                        @update:model-value="(value) => updateQuantity(childProduct.id, value)"
                    >
                        <NumberFieldContent>
                            <NumberFieldInput class="h-7 text-end px-2 rounded-xs w-17" />
                        </NumberFieldContent>
                    </NumberField>
                </div>
            </BrowseList>
        </template>
    </BrowseGroup>
</template>
<script lang="ts" setup>
import type { ChildProduct } from "@/types/product";
import type { SelectedProduct } from "@/stores/useSelectedProduct";
const props = defineProps<{ childProducts: ChildProduct[] }>();

const { selectedProducts, addProduct, deleteProduct, updateQuantity } = useSelectedProduct();

const childProductWithQuantity = computed(() => {
    return props.childProducts.map((element: ChildProduct) => {
        const selectedProduct = selectedProducts.find((p: SelectedProduct) => p.id === element.id);
        return {
            ...element,
            quantity: selectedProduct?.quantity ?? 1,
        };
    });
});

const isChildProductSelected = (productId: string) => {
    return selectedProducts.some((p: SelectedProduct) => p.id === productId);
};

const toggleChildProduct = (childProduct: SelectedProduct) => {
    if (isChildProductSelected(childProduct.id)) {
        deleteProduct(childProduct.id);
    } else {
        addProduct(childProduct);
    }
    console.log(selectedProducts);
};
</script>
