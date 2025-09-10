<template>
    <div
        class="ripple absolute inset-0 overflow-hidden"
        style="border-radius: inherit"
    >
        <span
            v-for="item in ripples"
            :key="item.id"
            class="absolute z-50 rounded-full bg-black/50 dark:bg-white/50"
            :style="{
                top: `${item.y}px`,
                left: `${item.x}px`,
                width: `${item.size}px`,
                height: `${item.size}px`,
                transform: 'scale(0.5)',
            }"
            @animationend="removeRipple(item.id)"
        />
    </div>
</template>
<script lang="ts" setup>
interface Ripple {
    id: number;
    x: number;
    y: number;
    size: number;
}

const ripples = ref<Ripple[]>([]);

const startRipple = (event: MouseEvent): void => {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: Ripple = { id: Date.now(), x, y, size };
    ripples.value.push(newRipple);
};

const removeRipple = (id: number): void => {
    ripples.value = ripples.value.filter((r) => r.id !== id);
};

defineExpose({ startRipple });
</script>
<style lang="scss" scoped>
@keyframes ripple {
    from {
        transform: scale(0.5);
        opacity: 1;
    }

    to {
        transform: scale(2.3);
        opacity: 0;
    }
}

.ripple span {
    position: absolute;
    animation: ripple 0.4s linear;
}
</style>
