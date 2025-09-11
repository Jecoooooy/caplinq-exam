<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from "reka-ui";
import { TooltipRoot, useForwardPropsEmits } from "reka-ui";

const props = defineProps<
    TooltipRootProps & {
        content?: string | Record<string, unknown>;
        align?: "start" | "center" | "end";
        side?: "top" | "bottom" | "left" | "right";
    }
>();
const emits = defineEmits<TooltipRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <TooltipProvider>
        <TooltipRoot data-slot="tooltip" v-bind="forwarded">
            <TooltipTrigger as-child>
                <slot />
            </TooltipTrigger>
            <TooltipContent :align="align" :align-offset="0" :side="side" :side-offset="-4">
                <slot name="content">
                    <div
                        v-if="typeof content === 'object' && content"
                        class="scrollbar-hide max-h-96 max-w-md space-y-2 overflow-auto p-1"
                    >
                        <TooltipContentObject :object="content" />
                    </div>
                    <div v-else class="text-sm">
                        {{ content }}
                    </div>
                </slot>
            </TooltipContent>
        </TooltipRoot>
    </TooltipProvider>
</template>
