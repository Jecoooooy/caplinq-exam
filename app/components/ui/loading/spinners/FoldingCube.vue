<template>
    <div v-show="loading" class="spinner">
        <div v-for="i in 4" :key="i" class="cube" :class="`cube${i}`">
            <div class="inner-cube bg-current"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ loading: boolean; size: number }>();
const spinnerSize = computed(() => `${props.size * 2.5}px`);
</script>

<style scoped>
.spinner {
    width: v-bind(spinnerSize);
    height: v-bind(spinnerSize);
    transform: rotateZ(45deg);
}

.spinner .cube {
    float: left;
    width: 50%;
    height: 50%;
    position: relative;
    transform: scale(1.1);
}

.spinner .inner-cube {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: inherit; /* This will be overridden by the inline style */
    animation: fold-cube-angle 2.4s infinite linear both;
    transform-origin: 100% 100%;
}

.spinner .cube2 {
    transform: scale(1.1) rotateZ(90deg);
}

.spinner .cube4 {
    transform: scale(1.1) rotateZ(180deg);
}

.spinner .cube3 {
    transform: scale(1.1) rotateZ(270deg);
}

.spinner .cube2 .inner-cube {
    animation-delay: 0.3s;
}

.spinner .cube4 .inner-cube {
    animation-delay: 0.6s;
}

.spinner .cube3 .inner-cube {
    animation-delay: 0.9s;
}

@keyframes fold-cube-angle {
    0%,
    10% {
        transform: perspective(140px) rotateX(-180deg);
        opacity: 0;
    }

    25%,
    75% {
        transform: perspective(140px) rotateX(0deg);
        opacity: 1;
    }

    90%,
    100% {
        transform: perspective(140px) rotateY(180deg);
        opacity: 0;
    }
}
</style>
