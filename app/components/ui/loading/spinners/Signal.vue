<template>
	<div v-show="loading" class="spinner">
		<div v-for="i in 5" :key="i" class="bg-current" :class="`rect${i}`" />
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{ loading: boolean; size: number }>()
const spinnerWidth = computed(() => `${props.size * 3}px`)
const spinnerHeight = computed(() => `${props.size * 3.5}px`)
</script>

<style scoped lang="scss">
.spinner {
	width: v-bind(spinnerWidth);
	height: v-bind(spinnerHeight);
	text-align: center;

	div {
		height: 100%;
		margin-right: 1px;
		width: calc(100% / 6.5);
		display: inline-block;
		animation: stretch-delay 1.2s infinite ease-in-out;

		&:nth-child(2) {
			animation-delay: -1.1s;
		}

		&:nth-child(3) {
			animation-delay: -1s;
		}

		&:nth-child(4) {
			animation-delay: -0.9s;
		}

		&:nth-child(5) {
			animation-delay: -0.8s;
		}
	}
}

@keyframes stretch-delay {
	0%,
	40%,
	100% {
		transform: scaleY(0.4);
	}

	20% {
		transform: scaleY(1);
	}
}
</style>
