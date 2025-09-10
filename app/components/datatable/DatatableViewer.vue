<template>
    <div v-for="(value, key) in object" :key="key">
        <!-- Array Content -->
        <template v-if="Array.isArray(value)">
            <div class="mb-1 py-6 pl-4 text-xl font-bold tracking-tight">
                <h3>{{ toTitleCase(key) }}</h3>
                <p class="text-muted-foreground mb-4 text-xs">{{ value.length }} items</p>
                <div
                    v-if="value.length"
                    class="border-border/30 divide-border/30 divide-y overflow-hidden rounded border"
                >
                    <template v-if="isArrayTypeOf(value, 'object')">
                        <div v-for="(item, itemIndex) in value" :key="itemIndex">
                            <div v-for="(v, k) in item" :key="k" class="flex items-center">
                                <div class="text-muted-foreground w-fit px-3 py-2 font-mono text-xs">
                                    {{ k }}
                                </div>
                                <div class="grow px-3 py-2">
                                    <Badge
                                        :variant="getBadgeVariant(v)"
                                        class="px-2 py-1 font-mono text-xs font-semibold"
                                    >
                                        {{ formatValue(v) }}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div v-for="(item, itemIndex) in value" :key="itemIndex" class="flex items-center">
                            <div class="text-muted-foreground w-fit px-3 py-2 font-mono text-xs">
                                {{ itemIndex }}
                            </div>
                            <div class="w-1/2 grow px-3 py-2">
                                <Badge
                                    :variant="getBadgeVariant(item)"
                                    class="px-2 py-1 font-mono text-xs font-semibold"
                                >
                                    {{ formatValue(item) }}
                                </Badge>
                            </div>
                        </div>
                    </template>
                </div>
                <div
                    v-else
                    class="text-muted-foreground border-border/30 rounded border border-dashed py-6 text-center"
                >
                    <Icon name="mdi:database-outline" size="24" class="mx-auto mb-1" />
                    <p class="text-xs">Empty array</p>
                </div>
            </div>
        </template>

        <!-- Nested Object Content -->
        <template v-else-if="isObject(value)">
            <div class="mb-1 py-6 pl-4 text-xl font-bold tracking-tight">
                <h3>{{ toTitleCase(key) }}</h3>
                <p class="text-muted-foreground mb-4 text-xs">{{ Object.keys(value).length }} properties</p>
                <div class="border-border/20 space-y-2 border-b-2 border-l-2 pl-4">
                    <DatatableViewer :object="value" />
                </div>
            </div>
        </template>

        <!-- Primitive Value Content -->
        <template v-else>
            <div class="flex items-center justify-between py-3 pl-4">
                <div class="flex items-center gap-2">
                    <div class="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <p class="text-foreground text-base font-medium tracking-tight">
                        {{ toTitleCase(key) }}
                    </p>
                </div>
                <Badge :variant="getBadgeVariant(value)" class="px-2 py-1 font-mono text-xs font-semibold">
                    {{ formatValue(value) }}
                </Badge>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { BadgeVariants } from "~/components/ui/badge";
defineProps<{ object: Record<string, unknown> }>();

function formatValue(value: unknown): string {
    if (value === null) return "null";
    if (value === undefined) return "undefined";
    if (typeof value === "boolean") return value ? "true" : "false";
    if (typeof value === "number") return String(value);
    if (typeof value === "string") return value;
    return String(value);
}

function getBadgeVariant(value: unknown): BadgeVariants["variant"] {
    if (value === null || value === undefined) return "secondary";
    if (typeof value === "boolean") return value ? "success" : "destructive";
    if (typeof value === "number") return "info";
    if (typeof value === "string") return "muted";
    return "outline";
}
</script>
