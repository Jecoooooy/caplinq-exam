<template>
    <!-- Handle root level array -->
    <div v-if="Array.isArray(dataContent)" class="space-y-6">
        <div
            v-for="(item, index) in dataContent"
            :key="index"
            class="border-border/30 rounded-lg border p-6 bg-card/50"
        >
            <div class="mb-4 flex items-center gap-3">
                <div class="bg-primary h-3 w-3 rounded-full"></div>
                <h3 class="text-lg font-semibold">Item {{ index + 1 }}</h3>
                <Badge variant="outline" class="text-xs">{{ Object.keys(item).length }} properties</Badge>
            </div>
            <DatatableViewer :data-content="item" />
        </div>
    </div>

    <!-- Handle root level object -->
    <template v-else>
        <div v-for="(value, key) in dataContent" :key="key" class="space-y-2">
            <!-- Array Content -->

            <div v-if="Array.isArray(value)" class="mb-4">
                <div class="mb-2 flex items-center gap-2">
                    <div class="bg-primary h-2 w-2 rounded-full"></div>
                    <h3 class="text-lg font-semibold">{{ toTitleCase(key) }}</h3>
                    <Badge variant="outline" class="text-xs">{{ value.length }} items</Badge>
                </div>
                <div
                    v-if="value.length"
                    class="border-border/30 divide-border/30 divide-y overflow-hidden rounded border"
                >
                    <div
                        v-for="(item, itemIndex) in value"
                        :key="itemIndex"
                        class="p-3 border-l-2 border-border/20 pl-4"
                    >
                        <div v-if="isObject(item)" class="space-y-2">
                            <div class="text-muted-foreground text-xs font-medium mb-2 flex items-center gap-2">
                                <div class="bg-muted h-1 w-1 rounded-full"></div>
                                Item {{ itemIndex + 1 }}
                                <Badge variant="secondary" class="text-xs"
                                    >{{ Object.keys(item).length }} properties</Badge
                                >
                            </div>
                            <DatatableViewer :data-content="item" />
                        </div>
                        <div v-else class="flex items-center gap-2">
                            <Badge :variant="getBadgeVariant(item)" class="px-2 py-1 font-mono text-xs font-semibold">
                                {{ formatValue(item) }}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div
                    v-else
                    class="text-muted-foreground border-border/30 rounded border border-dashed py-6 text-center"
                >
                    <Icon name="mdi:database-outline" size="24" class="mx-auto mb-1" />
                    <p class="text-xs">Empty array</p>
                </div>
            </div>

            <!-- Nested Object Content -->
            <div v-else-if="isObject(value)" class="mb-4">
                <div class="mb-2 flex items-center gap-2">
                    <div class="bg-primary h-2 w-2 rounded-full"></div>
                    <h3 class="text-lg font-semibold">{{ toTitleCase(key) }}</h3>
                    <Badge variant="outline" class="text-xs">{{ Object.keys(value).length }} properties</Badge>
                </div>
                <div class="border-border/20 space-y-2 border-l-2 pl-4">
                    <DatatableViewer :data-content="value" />
                </div>
            </div>

            <!-- Primitive Value Content -->
            <div v-else class="flex items-center justify-between py-2">
                <div class="flex items-center gap-2">
                    <div class="bg-muted h-1.5 w-1.5 rounded-full"></div>
                    <p class="text-foreground text-sm font-medium">
                        {{ toTitleCase(key) }}
                    </p>
                </div>

                <Badge :variant="getBadgeVariant(value)" class="px-2 py-1 font-mono text-xs font-semibold">
                    {{ formatValue(value) }}
                </Badge>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import type { BadgeVariants } from "~/components/ui/badge";

defineProps<{ dataContent: Record<string, unknown> | Record<string, unknown>[] }>();

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
