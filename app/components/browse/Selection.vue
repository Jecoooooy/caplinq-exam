<template>
    <section ref="container" class="h-full border-t animate-fade scroll-py-1 overflow-x-hidden">
        <BrowseGroup>
            <TransitionGroup name="slide-left" tag="div">
                <BrowseList
                    v-for="(product, index) in selectedProductStore.selectedProducts"
                    :key="product.id"
                    :index="index"
                    :is-arrow-visible="false"
                    class="py-2 pl-4 pr-4 md:px-10 group md:py-5 items-center gap-4 md:gap-5"
                >
                    <span class="text-xs">{{ index + 1 }}.</span>
                    <Avatar class="!rounded-xs size-12.5 border">
                        <AvatarImage src="/images/caplinq-logo.webp" class="p-2"></AvatarImage>
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div class="flex-1 overflow-hidden">
                        <p class="text-xs uppercase truncate font-semibold">
                            {{ product.name }}
                        </p>
                        <p class="text-xs truncate">{{ product.id }}</p>
                        <p class="text-xs truncate text-foreground/50">
                            {{ product.sku }}
                        </p>
                    </div>
                    <div class="text-xs flex items-center text-foreground/60">
                        <NumberField :model-value="product.quantity" :min="0">
                            <NumberFieldContent>
                                <NumberFieldInput class="h-7 text-end px-2 rounded-xs w-17" />
                            </NumberFieldContent>
                        </NumberField>
                    </div>
                    <Icon
                        class="md:opacity-0 md:group-hover:animate-fade-right cursor-pointer"
                        name="mdi:trash-outline"
                        size="20"
                        @click="deleteProduct(product)"
                    />
                    <div
                        class="w-full max-md:left-0 md:w-[calc(100%-80px)] mx-auto absolute -bottom-0.25 bg-input h-0.5"
                    ></div>
                </BrowseList>
            </TransitionGroup>
        </BrowseGroup>
    </section>
</template>
<script lang="ts" setup>
import type { SelectedProduct } from "@/stores/useSelectedProduct";
const selectedProductStore = useSelectedProduct();
const { showSuccess, showError, showSuccessWithAction } = useNotification();

function deleteProduct(product: SelectedProduct) {
    showSuccessWithAction(`Delete ${product.name}?`, {
        label: "Undo",

        onClick: () => {
            selectedProductStore.addProduct(product);
            showSuccess(`${product.name} restored successfully.`);
        },
    });

    selectedProductStore.deleteProduct(product.id);
}

const container: Ref<HTMLElement | null> = ref(null);
useScrollHint(container, { height: "160px" });
</script>
