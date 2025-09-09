<template>
	<div v-show="loading" class="spinner">
		<div v-for="i in 2" :key="i" class="bg-current" :class="`cube${i}`" />
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{ loading: boolean; size: number }>()
const spinnerSize = computed(() => `${props.size}px`)
const translateX = computed(() => `${props.size * 2}px`)
const translateY = computed(() => `-${props.size * 2}px`)
const translateOriginX = computed(() => `-${props.size}px`)
const translateOriginY = computed(() => `${props.size}px`)
</script>

<style scoped lang="scss">
.spinner {
	position: relative;
	width: v-bind(spinnerSize);
	height: v-bind(spinnerSize);
	transform: translateX(v-bind(translateOriginX)) translateY(v-bind(translateOriginY));
}

.cube1,
.cube2 {
	width: v-bind(spinnerSize);
	height: v-bind(spinnerSize);
	position: absolute;
	top: 0;
	left: 0;
	animation: cube-move 1.8s infinite ease-in-out;

	&:nth-child(2) {
		animation-delay: -0.9s;
	}
}

@keyframes cube-move {
	25% {
		transform: translateX(0) translateY(v-bind(translateY)) rotate(90deg) scale(0.5);
	}

	50% {
		transform: translateX(v-bind(translateX)) translateY(v-bind(translateY)) rotate(180deg);
	}

	75% {
		transform: translateX(v-bind(translateX)) rotate(270deg) scale(0.5);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
