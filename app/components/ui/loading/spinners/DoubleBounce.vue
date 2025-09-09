<template>
	<div v-show="loading" class="spinner">
		<div v-for="i in 2" :key="i" class="bg-current" :class="`double-bounce${i}`" />
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{ loading: boolean; size: number }>()
const spinnerSize = computed(() => `${props.size * 3}px`)
</script>

<style scoped lang="scss">
.spinner {
	width: v-bind(spinnerSize);
	height: v-bind(spinnerSize);
	position: relative;
}

.double-bounce1,
.double-bounce2 {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	opacity: 0.6;
	position: absolute;
	top: 0;
	left: 0;
	animation: bounce 2s infinite ease-in-out;

	&.double-bounce2 {
		animation-delay: -1s;
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
