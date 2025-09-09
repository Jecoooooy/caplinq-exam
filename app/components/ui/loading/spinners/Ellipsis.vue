<template>
	<div v-show="loading" class="spinner">
		<div v-for="i in 3" :key="i" class="bg-current" :class="`bounce${i}`" />
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{ loading: boolean; size: number }>()
const spinnerSize = computed(() => `${props.size}px`)
</script>

<style scoped lang="scss">
.spinner {
	display: flex;
	justify-content: center;
	align-items: center;

	div {
		width: v-bind(spinnerSize);
		height: v-bind(spinnerSize);
		border-radius: 100%;
		animation: bounce-delay 1.4s infinite ease-in-out both;

		&.bounce1 {
			animation-delay: -0.32s;
		}

		&.bounce2 {
			animation-delay: -0.16s;
		}
	}
}

@keyframes bounce-delay {
	0%,
	80%,
	100% {
		transform: scale(0);
	}

	40% {
		transform: scale(1);
	}
}
</style>
