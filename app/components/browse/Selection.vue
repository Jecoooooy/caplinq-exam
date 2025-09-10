<template>
    <section ref="container" class="h-full scroll-py-1 overflow-x-hidden">
        <BrowseGroup>
            <template v-for="(product, index) in selectedProductStore.selectedProducts" :key="product.id">
                <BrowseList :index="index" :is-arrow-visible="false" class="px-10 py-5 items-center gap-5">
                    <span class="text-xs">{{ index + 1 }}</span>
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
                    <div class="text-xs text-foreground/60">
                        <NumberField :model-value="product.quantity" :min="0">
                            <NumberFieldContent>
                                <NumberFieldInput class="h-7 text-end px-2 rounded-xs w-17" />
                            </NumberFieldContent>
                        </NumberField>
                    </div>
                </BrowseList>
                <Separator />
            </template>
        </BrowseGroup>
    </section>
</template>
<script lang="ts" setup>
const selectedProductStore = useSelectedProduct();

const container: Ref<HTMLElement | null> = ref(null);
useScrollHint(container);
</script>
