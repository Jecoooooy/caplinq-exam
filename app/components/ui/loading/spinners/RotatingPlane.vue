<template>
	<div v-show="loading" class="spinner bg-current" />
</template>

<script lang="ts" setup>
const props = defineProps<{ loading: boolean; size: number }>()
const spinnerSize = computed(() => `${props.size * 3}px`)
</script>

<style scoped lang="scss">
.spinner {
	width: v-bind(spinnerSize);
	height: v-bind(spinnerSize);
	animation: rotate-plane 1.2s infinite ease-in-out;
}

@keyframes rotate-plane {
	0% {
		transform: perspective(120px) rotateX(0deg) rotateY(0deg);
	}

	50% {
		transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
	}

	100% {
		transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
	}
}
</style>
