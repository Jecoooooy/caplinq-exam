<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <ScrollArea
        as="figure"
        class="relative size-full grow overflow-auto rounded-md border"
    >
        <table
            data-slot="table"
            :class="cn('w-full caption-bottom text-sm', props.class)"
        >
            <slot />
        </table>
    </ScrollArea>
</template>
