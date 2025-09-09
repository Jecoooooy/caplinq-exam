<template>
    <div class="absolute right-5.5 h-fit w-fit">
        <div
            v-show="dialog"
            ref="itemContainer"
            :class="{
                'close-dialog': closeDelay,
                'open-dialog': dialog && !closeDelay,
            }"
            class="fixed z-50 h-svh content-center overflow-hidden overscroll-none backdrop-blur"
        >
            <section class="max-w-2xl mx-auto">
                <Card class="relative overflow-hidden"
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
                        ><CardTitle class="text-center text-muted-foreground"
                            >Browse</CardTitle
                        ></CardHeader
                    >
                    <CardContent class="px-4"
                        ><Command>
                            <CommandInput placeholder="Search Supplier" />
                            <CommandList class="pl-6 pr-4">
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    <CommandItem
                                        v-for="item in suppliers"
                                        value="calendar"
                                        class="hover:bg-muted focus:bg-primary"
                                    >
                                        {{ item.name }}
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </CardContent>
                </Card>
            </section>
        </div>
        <div ref="item">
            <Button variant="outline" @click="toggleDialog()" class=""
                >browse</Button
            >
        </div>
    </div>
</template>
<script lang="ts" setup>
const dialog = ref(false);
const closeDelay = ref(false);
const item = ref<HTMLDivElement | null>(null);
const itemContainer = ref<HTMLDivElement | null>(null);
console.log(itemContainer.value);
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

const {
    data: suppliers,
    pending: suppliersPending,
    error: suppliersError,
} = await useFetch("/api/suppliers");
</script>
<style lang="scss" scoped>
@keyframes open-dialog {
    from {
        height: var(--item-height, 0);
        width: var(--item-width, 0);
        top: var(--item-top, 0);
        left: var(--item-left, 0);
        border-radius: 16px;
    }

    to {
        height: 100svh;
        width: 100svw;
        top: 0;
        left: 0;
        border-radius: 0;
    }
}

.open-dialog {
    animation: open-dialog 0.3s ease-in-out 0s 1 forwards;
}

@keyframes close-dialog {
    from {
        height: var(--item-height, 0);
        width: var(--item-width, 0);
        top: var(--item-top, 0);
        left: var(--item-left, 0);
        border-radius: 16px;
    }

    to {
        height: 100svh;
        width: 100svw;
        top: 0;
        left: 0;
        border-radius: 0;
    }
}

.close-dialog {
    animation: close-dialog 0.3s ease-in-out 0s 1 reverse forwards;
}
</style>
