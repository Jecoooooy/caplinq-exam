<template>
	<div v-for="(value, key) in object" :key="key">
		<!-- Array Content -->
		<template v-if="Array.isArray(value)">
			<div class="py-2 pl-2 text-sm font-bold">
				<h3>{{ toTitleCase(key) }}</h3>
				<p class="text-muted-foreground mb-2 text-xs">{{ value.length }} items</p>
				<div v-if="value.length" class="divide-border/30 border-border/30 divide-y rounded border">
					<template v-if="isArrayTypeOf(value, 'object')">
						<template v-for="(item, itemIndex) in value" :key="itemIndex">
							<div v-for="(v, k) in item" :key="k" class="flex items-center">
								<div class="text-muted-foreground w-fit px-2 py-1 font-mono text-xs">
									{{ k }}
								</div>
								<div class="grow px-2 py-1">
									<span
										class="bg-muted rounded px-2 py-0.5 font-mono text-xs font-semibold"
									>
										{{ formatValue(v) }}
									</span>
								</div>
							</div>
						</template>
					</template>
					<template v-else>
						<div v-for="(item, itemIndex) in value" :key="itemIndex" class="flex items-center">
							<div class="text-muted-foreground w-fit px-2 py-1 font-mono text-xs">
								{{ itemIndex }}
							</div>
							<div class="w-1/2 grow px-2 py-1">
								<span class="bg-muted rounded px-2 py-0.5 font-mono text-xs font-semibold">
									{{ formatValue(item) }}
								</span>
							</div>
						</div>
					</template>
				</div>
				<div
					v-else
					class="text-muted-foreground border-border/30 rounded border border-dashed py-3 text-center"
				>
					<span class="text-xs">Empty</span>
				</div>
			</div>
		</template>
		<!-- Nested Object Content -->
		<div v-else-if="isObject(value)" class="py-2 pl-2 text-sm font-bold">
			<h3>{{ toTitleCase(key) }}</h3>
			<p class="text-muted-foreground mb-2 text-xs">{{ Object.keys(value).length }} properties</p>
			<div class="border-border/20 space-y-1 border-b border-l pl-2">
				<TooltipContentObject :object="value" />
			</div>
		</div>
		<!-- Primitive Value Content -->
		<div v-else class="flex items-center justify-between py-2 pl-2">
			<div class="flex items-center gap-2">
				<span class="bg-primary h-1 w-1 rounded-full"></span>
				<span class="text-foreground text-xs font-medium tracking-tight">
					{{ toTitleCase(key) }}
				</span>
			</div>
			<span class="bg-muted rounded px-2 py-0.5 font-mono text-xs font-semibold">
				{{ formatValue(value) }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{ object: Record<string, unknown> }>()

function formatValue(value: unknown): string {
	if (value === null) return 'null'
	if (value === undefined) return 'undefined'
	if (typeof value === 'boolean') return value ? 'true' : 'false'
	if (typeof value === 'number') return String(value)
	if (typeof value === 'string') return value
	return String(value)
}
</script>
