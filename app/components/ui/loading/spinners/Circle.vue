<template>
	<div v-show="loading" class="spinner">
		<div v-for="i in 12" :key="i" class="child" :class="`circle${i}`">
			<div class="inner bg-current"></div>
		</div>
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

.child {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
}

.inner {
	width: 15%;
	height: 15%;
	border-radius: 100%;
	animation: circle-bounce-delay 1.2s infinite ease-in-out both;
	margin: 0 auto;
}

@for $i from 1 through 12 {
	.circle#{$i} {
		transform: rotate(#{($i - 1) * 30}deg);

		.inner {
			animation-delay: -#{(12 - $i) * 0.1}s;
		}
	}
}

@keyframes circle-bounce-delay {
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
