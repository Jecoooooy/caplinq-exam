<template>
    <div v-show="loading" class="spinner">
        <div v-for="i in 2" :key="i" class="bg-current" :class="`dot${i}`" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ loading: boolean; size: number }>();
const spinnerSize = computed(() => `${props.size * 3}px`);
</script>

<style scoped lang="scss">
.spinner {
    width: v-bind(spinnerSize);
    height: v-bind(spinnerSize);
    position: relative;
    text-align: center;
    animation: rotate 2s infinite linear;
}

.dot1,
.dot2 {
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    border-radius: 100%;
    animation: bounce 2s infinite ease-in-out;
}

.dot2 {
    top: auto;
    bottom: 0;
    animation-delay: -1s;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes bounce {
    0%,
    100% {
        transform: scale(0);
    }

    50% {
        transform: scale(1);
    }
}
</style>
