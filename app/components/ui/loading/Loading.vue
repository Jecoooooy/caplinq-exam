<template>
    <component :is="component" v-if="component" :loading="loading" :size="size" />
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from "vue";

export type LoaderType =
    | "Chase"
    | "Circle"
    | "DoubleBounce"
    | "Ellipsis"
    | "FadingCircle"
    | "FoldingCube"
    | "Linear"
    | "Pulse"
    | "PulseGrid"
    | "RotatingCircles"
    | "RotatingCubes"
    | "RotatingPlane"
    | "Signal";

const props = withDefaults(
    defineProps<{
        loading?: boolean;
        size?: number;
        type?: LoaderType;
    }>(),
    {
        loading: true,
        size: 8,
        type: "Chase",
    },
);

const spinners = import.meta.glob("./spinners/*.vue");

const component = computed(() => {
    const path = `./spinners/${props.type}.vue`;
    const loader = spinners[path];
    return loader ? defineAsyncComponent(loader as () => Promise<{ default: any }>) : null;
});
</script>
