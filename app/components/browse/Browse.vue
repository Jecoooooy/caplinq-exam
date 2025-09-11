<template>
    <div class="absolute right-16 h-fit w-fit">
        <div ref="item">
            <Button variant="outline" :ripple="false" size="sm" @click="toggleDialog()"> browse </Button>
        </div>
        <div
            v-show="isModalOpen"
            ref="itemContainer"
            :class="{
                'close-dialog': closeDelay,
                'open-dialog': isModalOpen && !closeDelay,
            }"
            class="fixed z-40 h-svh content-center overflow-hidden backdrop-blur-lg overscroll-none"
        >
            <section class="max-w-2xl px-4 md:px-8 mx-auto">
                <Card class="relative overflow-hidden shadow-lg py-5 gap-0">
                    <Button
                        class="absolute right-8 top-6 animate-fade"
                        variant="ghost"
                        icon
                        :ripple="false"
                        size="icon-sm"
                        @click="toggleDialog()"
                    >
                        <Icon name="mdi:close" size="20"></Icon>
                    </Button>
                    <Button
                        v-if="!isEmpty(supplier, true) && selectedProductStore.count === 0"
                        class="absolute left-10 top-6 animate-fade"
                        variant="outline"
                        icon
                        size="icon-sm"
                        @click="((supplier = null), (search = ''))"
                    >
                        <Icon name="mdi:chevron-left" size="20"></Icon>
                    </Button>
                    <Button
                        v-else-if="productSelection"
                        class="absolute left-10 top-6 animate-fade"
                        variant="outline"
                        icon
                        size="icon-sm"
                        @click="productSelection = false"
                    >
                        <Icon name="mdi:chevron-left" size="20"></Icon>
                    </Button>
                    <CardHeader class="h-7 flex items-end justify-center">
                        <CardTitle class="text-center font-normal text-muted-foreground">
                            {{ productSelection ? "Selection" : toTitleCase(ActiveSupplier) }}
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="px-0 h-117.75 pt-10 flex-col flex gap-6" :class="{ 'pb-5': !productSelection }">
                        <template v-if="!productSelection">
                            <div class="px-10 border-b pb-6">
                                <Input
                                    v-model="search"
                                    class="h-10.5"
                                    :placeholder="`Search ${isEmpty(supplier, true) ? 'Supplier' : 'Products'}`"
                                    :icon="{ name: 'magnify', position: 'left' }"
                                />
                            </div>
                            <BrowseSupplier
                                v-if="isEmpty(supplier, true)"
                                :search="search"
                                @reset-search="search = ''"
                            />
                            <BrowseProduct v-else :search="search" :supplier-id="supplier.id" />
                        </template>
                        <BrowseSelection v-else />
                    </CardContent>
                    <CardFooter class="gap-4 border-t">
                        <Button
                            v-if="!productSelection"
                            variant="outline"
                            :disabled="selectedProductStore.count === 0"
                            @click="productSelection = !productSelection"
                        >
                            {{ selectedProductStore.count }} Products Selected</Button
                        >
                        <div class="grow"></div>
                        <Button variant="outline" @click="toggleDialog()"> Cancel </Button>
                        <Button :disabled="selectedProductStore.count === 0" @click="addToOrder()">Add</Button>
                    </CardFooter>
                </Card>
            </section>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { Supplier } from "@/types/supplier";
const selectedProductStore = useSelectedProduct();
const supplierStore = useSupplier();
await supplierStore.getSuppliers();
const { showSuccessWithAction } = useNotification();

const isModalOpen = ref(false);
provide("isModalOpen", isModalOpen);

const closeDelay = ref(false);
const item = ref<HTMLDivElement | null>(null);
const itemContainer = ref<HTMLDivElement | null>(null);

const supplier = ref<Supplier | null>(null);
const ActiveSupplier = computed(() => supplier.value?.name ?? "Browse");

provide("supplier", supplier);
const search = ref("");

function toggleDialog() {
    // if (isModalOpen.value) supplier.value = null;
    search.value = "";
    if (item?.value && itemContainer?.value) {
        const rect = item.value.getBoundingClientRect();
        itemContainer.value.style.setProperty("--item-height", `${rect.height}px`);
        itemContainer.value.style.setProperty("--item-width", `${rect.width}px`);
        itemContainer.value.style.setProperty("--item-top", `${rect.top}px`);
        itemContainer.value.style.setProperty("--item-left", `${rect.left}px`);
        if (!isModalOpen.value && !closeDelay.value) {
            isModalOpen.value = true;
        } else {
            closeDelay.value = true;
            setTimeout(() => {
                closeDelay.value = false;
                isModalOpen.value = false;
            }, 300);
        }
    }
}

const productSelection = ref(false);

function addToOrder() {
    showSuccessWithAction("Your order has been added", {
        label: "view",
        onClick: () => undefined,
    });
    isModalOpen.value = false;
    selectedProductStore.selectedProducts = [];
    supplier.value = null;
}
</script>
