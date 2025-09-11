<template>
    <li
        v-bind="$attrs"
        tabindex="-1"
        :class="
            cn(
                'hover:!bg-accent cursor-pointer py-5 gap-5 relative focus-within:outline-none hover:text-accent-foreground text-sm focus:bg-accent/20 flex items-center',
                className,
            )
        "
        @keydown="handleKeyDown($event, index)"
        @click="clickLoad($event)"
    >
        <AnimationRipple ref="rippleRef" />
        <slot></slot>
        <Icon
            v-if="isArrowVisible"
            name="mdi:chevron-right"
            class="absolute right-2 text-foreground/50 duration-300 transition-all"
            :class="{ 'rotate-90': isExpanded, 'rotate-0': !isExpanded }"
            size="20"
        />
    </li>
</template>
<script lang="ts" setup>
import type Ripple from "~/components/ui/animation/Ripple.vue";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const {
    isArrowVisible = true,
    class: className,
    index,
} = defineProps<{
    index: number;
    isArrowVisible?: boolean;
    class?: HTMLAttributes["class"];
}>();

const emit = defineEmits<{
    click: [event: MouseEvent];
}>();

const list = inject<Ref<HTMLUListElement | null>>("list", ref(null));
const { handleKeyDown } = useArrowNavigation(list);

const rippleRef = ref<InstanceType<typeof Ripple> | null>(null);

const isExpanded = ref(false);
function clickLoad(event: MouseEvent) {
    rippleRef.value?.startRipple(event);
    isExpanded.value = !isExpanded.value;
    emit("click", event);
}
</script>
