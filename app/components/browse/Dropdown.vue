<template>
    <article class="flex-col flex gap-6">
        <div class="px-10 border-b pb-6">
            <Input
                placeholder="Search Supplier"
                :icon="{ name: 'magnify', position: 'left' }"
            />
        </div>

        <section
            ref="container"
            class="pl-10 pr-3 w-[calc(100%-16px)] max-h-60 scroll-py-1 overflow-x-hidden"
        >
            <ul class="p-0 flex flex-col">
                <template v-for="(item, index) in allSuppliers" :key="item.id">
                    <li
                        :value="item.id"
                        tabindex="0"
                        class="hover:bg-primary h-10 hover:text-primary-foreground text-sm px-4 focus:bg-primary/50 flex justify-between items-center"
                    >
                        {{ item.name }}
                        <Icon name="mdi:chevron-right" size="20" />
                    </li>
                    <Separator />
                </template>
            </ul>
        </section>
    </article>
</template>
<script lang="ts" setup>
const { suppliers } = useSupplier();
const allSuppliers = computed(() => suppliers ?? []);

const container: Ref<HTMLElement | null> = ref(null);
useEnhancedScrollbar(container, "scroll", "y");
</script>
