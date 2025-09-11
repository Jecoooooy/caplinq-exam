<template>
    <div v-show="loading" class="spinner">
        <div v-for="i in 9" :key="i" class="cube bg-current" :class="`cube${i}`" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ loading: boolean; size: number }>();
const spinnerSize = computed(() => `${props.size * 3}px`);
</script>

<style scoped>
.spinner {
    width: v-bind(spinnerSize);
    height: v-bind(spinnerSize);
}

.cube {
    width: 33%;
    height: 33%;
    float: left;
    animation: cube-grid-scale-delay 1.3s infinite ease-in-out;
}

.cube1 {
    animation-delay: 0.2s;
}

.cube2 {
    animation-delay: 0.3s;
}

.cube3 {
    animation-delay: 0.4s;
}

.cube4 {
    animation-delay: 0.1s;
}

.cube5 {
    animation-delay: 0.2s;
}

.cube6 {
    animation-delay: 0.3s;
}

.cube7 {
    animation-delay: 0s;
}

.cube8 {
    animation-delay: 0.1s;
}

.cube9 {
    animation-delay: 0.2s;
}

@keyframes cube-grid-scale-delay {
    0%,
    70%,
    100% {
        transform: scale3d(1, 1, 1);
    }

    35% {
        transform: scale3d(0, 0, 1);
    }
}
</style>
