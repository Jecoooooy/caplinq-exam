<template>
    <article class="flex-col flex gap-6">
        <div class="px-10 border-b pb-6">
            <Input
                v-model="search"
                class="h-10.5"
                placeholder="Search Supplier"
                :icon="{ name: 'magnify', position: 'left' }"
            />
        </div>

        <section
            ref="container"
            class="pl-10 pr-3 w-[calc(100%-16px)] max-h-60 scroll-py-1 overflow-x-hidden"
        >
            <ul class="p-0 flex flex-col" ref="list">
                <template
                    v-for="(item, index) in filteredSuppliers"
                    :key="item.id"
                >
                    <li
                        :value="item.id"
                        tabindex="-1"
                        class="hover:bg-accent relative h-10 hover:text-accent-foreground text-sm px-4 focus:bg-accent/20 flex justify-between items-center"
                        @keydown="handleKeyDown($event, index)"
                        @click="expandList($event, index)"
                    >
                        <AnimationRipple ref="rippleRef" />
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
import type Ripple from "~/components/ui/animation/Ripple.vue";

const props = defineProps<{ isOpen: boolean }>();

const { suppliers } = useSupplier();
const allSuppliers = computed(() => suppliers ?? []);

const search = ref("");
const filteredSuppliers = computed(() => {
    const query = search.value.trim().toLowerCase();
    const list = allSuppliers.value;
    if (!query) return list;
    return list.filter((s) => s.name.toLowerCase().includes(query));
});

const container: Ref<HTMLElement | null> = ref(null);
useEnhancedScrollbar(container, "scroll", "y");

const list: Ref<HTMLUListElement | null> = ref(null);
const { handleKeyDown } = useArrowNavigation(list);

watch(
    () => props.isOpen,
    () => {
        const first = list.value?.querySelector<HTMLLIElement>("li");
        setTimeout(() => first?.focus(), 100);
    },
    { immediate: true },
);

const rippleRef = ref<InstanceType<typeof Ripple>[]>([]);

function expandList(event: MouseEvent, index: number) {
    rippleRef.value[index]?.startRipple(event);
}
</script>
