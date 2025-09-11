<template>
    <div v-show="loading" class="spinner">
        <div class="chase">
            <div v-for="i in 6" :key="i" class="chase-dot" :class="[delayClasses[i - 1]]">
                <div class="chase-dot-inner bg-current" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ loading: boolean; size: number }>();
const delayClasses = ["-delay-100", "-delay-200", "-delay-300", "-delay-400", "-delay-500", "-delay-600"];
const spinnerSize = computed(() => `${props.size * 3}px`);
</script>

<style scoped lang="scss">
.spinner {
    width: v-bind(spinnerSize);
    height: v-bind(spinnerSize);
}

.chase {
    width: v-bind(spinnerSize);
    height: v-bind(spinnerSize);
    animation: chase 2.5s infinite linear both;

    .chase-dot {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        animation: chase-dot 2s infinite ease-in-out both;

        &:nth-child(1) {
            animation-delay: -1.1s;
        }

        &:nth-child(2) {
            animation-delay: -1s;
        }

        &:nth-child(3) {
            animation-delay: -0.9s;
        }

        &:nth-child(4) {
            animation-delay: -0.8s;
        }

        &:nth-child(5) {
            animation-delay: -0.7s;
        }

        &:nth-child(6) {
            animation-delay: -0.6s;
        }

        .chase-dot-inner {
            width: 25%;
            height: 25%;
            border-radius: 100%;
            animation: chase-dot-before 2s infinite ease-in-out both;

            &:nth-child(1) {
                animation-delay: -1.1s;
            }

            &:nth-child(2) {
                animation-delay: -1s;
            }

            &:nth-child(3) {
                animation-delay: -0.9s;
            }

            &:nth-child(4) {
                animation-delay: -0.8s;
            }

            &:nth-child(5) {
                animation-delay: -0.7s;
            }

            &:nth-child(6) {
                animation-delay: -0.6s;
            }
        }
    }
}

@keyframes chase {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes chase-dot {
    80%,
    100% {
        transform: rotate(360deg);
    }
}

@keyframes chase-dot-before {
    50% {
        transform: scale(0.4);
    }

    0%,
    100% {
        transform: scale(1);
    }
}
</style>
