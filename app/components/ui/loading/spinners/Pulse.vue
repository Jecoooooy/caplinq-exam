<template>
    <div v-show="loading" class="spinner bg-current" />
</template>

<script lang="ts" setup>
const props = defineProps<{ loading: boolean; size: number }>();
const spinnerSize = computed(() => `${props.size * 3}px`);
</script>

<style scoped lang="scss">
.spinner {
    width: v-bind(spinnerSize);
    height: v-bind(spinnerSize);
    border-radius: 100%;
    animation: scale-out 1s infinite ease-in-out;
}

@keyframes scale-out {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>
