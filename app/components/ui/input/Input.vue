<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";

const props = defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    class?: HTMLAttributes["class"];
    icon?: {
        name: string;
        size?: string | number;
        position?: "left" | "right";
    };
}>();

const emits = defineEmits<{
    (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
    passive: true,
    defaultValue: props.defaultValue,
});
</script>

<template>
    <fieldset class="relative">
        <input
            v-model="modelValue"
            data-slot="input"
            v-bind="$attrs"
            :class="
                cn(
                    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-xs border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                    icon?.position === 'left' ? 'pl-14' : '',
                    props.class,
                )
            "
        />
        <Icon
            v-if="!isEmpty(icon, true)"
            :name="`mdi:${icon.name}`"
            class="absolute text-muted-foreground top-1/2 -translate-y-1/2"
            :class="{
                'right-4': icon.position === 'right' || isEmpty(icon.position, true),
                'left-4': icon.position === 'left',
            }"
            :size="icon.size ?? 24"
        />
    </fieldset>
</template>
