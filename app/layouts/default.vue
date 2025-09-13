<template>
    <div
        class="fixed p-4 transition-all duration-1000 z-50 bg-white"
        :class="{
            'size-full top-0 left-0 bg-white rounded-none': !navbar,
            'w-xs h-14 top-2 border -translate-x-1/2 left-1/2 bg-card shadow-md rounded-md': navbar,
        }"
    >
        <div
            ref="rollingBoxRef"
            class="animate-rolling-box z-10 drop-shadow-[-4px_4px_4px_rgba(0,0,0,0.5)] absolute size-fit"
            :class="{
                'scale-30 md:scale-14 left-6 top-5 md:left-0 md:top-0 !translate-0 duration-1000 transition-all':
                    navbar,
                'left-1/2 top-1/2 ': !navbar,
            }"
        >
            <div
                class="rounded-xs relative size-8 md:size-20 bg-red-800 transition-transform duration-1000"
                :class="{
                    '-translate-y-full -translate-x-[calc(100%+16px)]': hide,
                }"
            >
                <template v-if="hide">
                    <div class="rounded-xs absolute translate-x-full left-2 size-full animate-pop-up bg-gray-600"></div>

                    <div
                        class="rounded-xs absolute translate-full left-2 top-2 size-full animate-pop-up bg-gray-600 animate-delay-100"
                    ></div>
                    <div
                        class="rounded-xs absolute translate-x-[200%] left-4 size-full animate-pop-up bg-gray-600 animate-delay-200"
                    ></div>
                    <div
                        class="rounded-xs absolute translate-x-[200%] translate-y-full left-4 top-2 size-full animate-pop-up bg-red-800 animate-delay-300"
                    ></div>
                    <div
                        class="rounded-xs absolute translate-[200%] left-4 top-4 size-full animate-pop-up bg-red-800 animate-delay-400"
                    ></div>
                </template>
            </div>
        </div>
        <h1 v-show="navbar" class="pl-14 text-xl animate-delay-900 animate-fade-right font-semibold">
            Caplinq Functional Task
        </h1>
    </div>
    <main v-show="navbar" class="min-h-svh px-4 m:px-8"><slot /></main>
</template>
<script lang="ts" setup>
const hide = ref(false);
const navbar = ref(false);
const rollingBoxRef = ref<HTMLElement>();

onMounted(() => {
    // Listen for the rolling animation to complete
    if (rollingBoxRef.value) {
        rollingBoxRef.value.addEventListener("animationend", () => {
            hide.value = true;
            setTimeout(() => {
                navbar.value = true;
            }, 900);
        });
    }
});
</script>

<style lang="scss" setup>
@keyframes rolling-dice {
    0% {
        transform: translateX(100svw) rotate(360deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(-45deg);
    }
}
.animate-rolling-box {
    animation: rolling-dice 1s cubic-bezier(0.79, 0.33, 0.14, 0.53) 0s 1 forwards;
}

@keyframes pop-up {
    0% {
        opacity: 0;
        scale: 80%;
    }
    20% {
        opacity: 0%;
    }
    80% {
        scale: 110%;
    }
    100% {
        opacity: 1;
        scale: 100%;
    }
}

.animate-pop-up {
    opacity: 0;
    animation-name: pop-up;
    animation-duration: 300ms;
    animation-timing-function: ease-in;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-direction: normal;
    animation-play-state: running;
}
</style>
