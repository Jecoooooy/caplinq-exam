<template>
    <div class="absolute right-16 h-fit w-fit">
        <div ref="item">
            <Button variant="outline" size="sm" @click="toggleDialog()"
                >browse</Button
            >
        </div>
        <div
            v-show="dialog"
            ref="itemContainer"
            :class="{
                'close-dialog': closeDelay,
                'open-dialog': dialog && !closeDelay,
            }"
            class="fixed z-50 h-svh content-center overflow-hidden overscroll-none backdrop-blur"
        >
            <section class="max-w-2xl px-4 md:px-8 mx-auto">
                <Card class="relative overflow-hidden gap-8"
                    ><Button
                        class="absolute right-2 top-2 animate-fade animate-delay-500"
                        variant="ghost"
                        icon
                        size="icon-sm"
                        @click="toggleDialog()"
                    >
                        <Icon name="mdi:close"></Icon>
                    </Button>
                    <CardHeader
                        ><CardTitle
                            class="text-center font-normal text-muted-foreground"
                            >Browse</CardTitle
                        ></CardHeader
                    >
                    <CardContent class="px-0"
                        ><BrowseDropdown></BrowseDropdown>
                    </CardContent>
                    <CardFooter class="gap-4">
                        <Button variant="outline">Products Selected</Button>
                        <div class="grow"></div>
                        <Button variant="outline">Cancel</Button>
                        <Button>Add</Button>
                    </CardFooter>
                </Card>
            </section>
        </div>
    </div>
</template>
<script lang="ts" setup>
const supplierStore = useSupplier();
await supplierStore.getSuppliers();

const dialog = ref(false);
const closeDelay = ref(false);
const item = ref<HTMLDivElement | null>(null);
const itemContainer = ref<HTMLDivElement | null>(null);

function toggleDialog() {
    if (item?.value && itemContainer?.value) {
        const rect = item.value.getBoundingClientRect();
        itemContainer.value.style.setProperty(
            "--item-height",
            `${rect.height}px`,
        );
        itemContainer.value.style.setProperty(
            "--item-width",
            `${rect.width}px`,
        );
        itemContainer.value.style.setProperty("--item-top", `${rect.top}px`);
        itemContainer.value.style.setProperty("--item-left", `${rect.left}px`);
        if (!dialog.value && !closeDelay.value) {
            dialog.value = true;
        } else {
            closeDelay.value = true;
            setTimeout(() => {
                closeDelay.value = false;
                dialog.value = false;
            }, 300);
        }
    }
}
</script>
