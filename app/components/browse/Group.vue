<template>
    <ul v-bind="$attrs" :class="cn('p-0 flex flex-col', className)" ref="list">
        <slot></slot>
    </ul>
</template>
<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";
const { isAutoFocus = true, class: className } = defineProps<{
    class?: HTMLAttributes["class"];
    isAutoFocus?: boolean;
}>();

const list: Ref<HTMLUListElement | null> = ref(null);
provide("list", list);
const isModalOpen = inject<Ref<boolean>>("isModalOpen", ref(false));

watch(
    () => isModalOpen.value,
    () => {
        if (isAutoFocus) {
            const first = list.value?.querySelector<HTMLLIElement>("li");
            setTimeout(() => first?.focus(), 100);
        }
    },
    { immediate: true },
);

onMounted(() => {
    if (isAutoFocus) {
        const first = list.value?.querySelector<HTMLLIElement>("li");
        setTimeout(() => first?.focus(), 400);
    }
});
</script>
