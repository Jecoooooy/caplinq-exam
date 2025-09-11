<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { ButtonVariants } from ".";
import type Ripple from "../animation/Ripple.vue";
import type { LoaderType } from "../loading/Loading.vue";
import { Primitive } from "reka-ui";
import { buttonVariants } from ".";
import { cn } from "@/lib/utils";

export interface Props extends PrimitiveProps {
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    elevation?: ButtonVariants["elevation"];
    color?: ButtonVariants["color"];
    ripple?: boolean;
    as?: string;
    class?: HTMLAttributes["class"];
    loading?: boolean | { type?: LoaderType; color?: HTMLAttributes["class"] };
    loadOnClick?: boolean | number; // number is how long to display loading
    icon?: boolean | "sm" | "md" | "lg";
    tooltip?: { text?: string; side?: "top" | "bottom" | "left" | "right" } | string;
    hideWhenLoading?: boolean;
}

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
    as: "button",
    ripple: true,
});

const rippleRef = ref<InstanceType<typeof Ripple> | null>(null);

const loadingColor = computed(() => (isObject(props.loading) && props.loading?.color) || undefined);
const loadingType = computed(() => (isObject(props.loading) && props.loading.type) || "FadingCircle");

const loadingSize = computed(() => {
    if ([props.size, props.icon].includes("sm")) return 6;
    else if ([props.size, props.icon].includes("lg")) return 8;
    else return 7;
});

const clickLoading = ref(false);
function clickLoad(event: MouseEvent) {
    if (props.ripple) rippleRef.value?.startRipple(event);
    if (!props.loadOnClick) return;
    clickLoading.value = true;
    setTimeout(() => (clickLoading.value = false), isNumber(props.loadOnClick) ? props.loadOnClick : 500);
}
</script>

<template>
    <Tooltip
        :disabled="isEmpty(tooltip)"
        :text="isString(tooltip) ? tooltip : tooltip?.text"
        :side="isObject(tooltip) ? tooltip?.side : undefined"
    >
        <Primitive
            :as="as"
            :as-child="asChild"
            :class="
                cn(
                    buttonVariants({
                        variant,
                        size,
                        elevation,
                        icon,
                        color,
                    }),
                    props.class,
                )
            "
            v-bind="$attrs"
            @click="clickLoad"
        >
            <template v-if="as === 'button' && ripple && variant !== 'link'">
                <AnimationRipple ref="rippleRef" />
            </template>
            <Loading
                v-if="loading || clickLoading"
                :type="loadingType"
                :size="loadingSize"
                :class="[loadingColor, { 'mr-2': !hideWhenLoading && !icon }]"
            />
            <slot v-if="!((loading || clickLoading) && (hideWhenLoading || icon))" />
        </Primitive>
    </Tooltip>
</template>
