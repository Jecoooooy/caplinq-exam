<template>
	<div v-show="loading" class="fading-circle">
		<div v-for="i in 12" :key="i" class="circle" :class="`circle${i}`">
			<div class="inner bg-current"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{ loading: boolean; size: number }>()
const spinnerSize = computed(() => `${props.size * 3}px`)
</script>

<style scoped lang="scss">
.fading-circle {
	width: v-bind(spinnerSize);
	height: v-bind(spinnerSize);
	position: relative;

	.circle {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;

		.inner {
			display: block;
			margin: 0 auto;
			width: 15%;
			height: 15%;
			border-radius: 100%;
			animation: circle-fade-delay 1.2s infinite ease-in-out both;
		}

		@for $i from 1 through 12 {
			&.circle#{$i} {
				transform: rotate(30deg * $i);

				.inner {
					animation-delay: -1.1s + 0.1s * ($i - 1);
				}
			}
		}
	}
}

@keyframes circle-fade-delay {
	0%,
	39%,
	100% {
		opacity: 0;
	}

	40% {
		opacity: 1;
	}
}
</style>
