<script setup lang="ts">
import type { ProgressRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { cn } from '~/lib/utils'

const props = withDefaults(
	defineProps<
		ProgressRootProps & {
			class?: HTMLAttributes['class']
			loading?: boolean
		}
	>(),
	{
		modelValue: 0,
		loading: false,
	},
)

const delegatedProps = computed(() => {
	const { class: _, loading: __, ...delegated } = props

	return delegated
})
</script>

<template>
	<ProgressRoot
		v-bind="delegatedProps"
		:class="
			cn(
				'bg-secondary relative h-1 w-full overflow-hidden rounded-full',
				props.loading ? 'opacity-100' : 'opacity-0',
			)
		"
	>
		<ProgressIndicator
			class="origin-left-right h-full w-auto flex-1 bg-current"
			:class="[props.loading ? 'animate-progress' : '', props.class]"
			:style="[props.loading ? '' : `transform: translateX(-${100 - (props.modelValue ?? 0)}%);`]"
		/>
	</ProgressRoot>
</template>
