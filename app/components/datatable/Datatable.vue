<template>
    <section
        class="flex h-full grow flex-col gap-4"
        role="region"
        :aria-labelledby="uniqueId"
    >
        <!-- Title and Subtitle -->
        <header
            class="flex justify-center pb-2 gap-4 max-md:flex-col md:items-center"
        >
            <hgroup>
                <h2
                    :id="uniqueId"
                    class="tracking-wide text-xl text-muted-foreground"
                >
                    {{ title }}
                </h2>
                <p v-if="subtitle" class="text-muted-foreground">
                    {{ subtitle }}
                </p>
            </hgroup>
            <slot name="prepend"></slot>
        </header>
        <Input
            v-model="search"
            :placeholder="searchPlaceholder"
            @input="currentPage = 1"
            :icon="{ name: 'magnify', size: 32 }"
            class="h-16 pl-6 text-xl"
        />
        <!-- Table -->
        <Table>
            <TableCaption v-if="title" class="sr-only">
                {{ title }}
            </TableCaption>
            <TableHeader
                class="sticky top-0 z-20 shadow-[0_4px_4px_rgba(0,0,0,0.3)]"
            >
                <TableRow>
                    <TableHead
                        v-for="col in columns"
                        :key="col.value"
                        :style="col.width ? { width: col.width } : {}"
                        :class="
                            cn('even:bg-muted odd:bg-background', col.class)
                        "
                        :rowspan="col.rowspan"
                    >
                        {{ col.text }}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <!-- Loading State -->
                <template v-if="loading">
                    <TableRow v-for="i in pageSize" :key="`loading-${i}`">
                        <TableCell
                            v-for="(col, index) in columns"
                            :key="col.value"
                            :style="col.width ? { maxWidth: col.width } : {}"
                            :class="cn('h-10 even:bg-muted', col.class)"
                        >
                            <div
                                :style="{
                                    animationDelay: `${(i + index + 1) * 40}ms`,
                                }"
                                class="bg-primary/80 h-4 animate-pulse rounded"
                            />
                        </TableCell>
                    </TableRow>
                </template>
                <TableRow v-else-if="error">
                    <TableCell
                        role="alert"
                        aria-live="assertive"
                        :colspan="columns.length"
                        class="py-12 text-center"
                    >
                        <div class="flex flex-col items-center gap-3">
                            <div class="text-destructive">
                                <Icon name="mdi:alert-circle" size="48" />
                            </div>
                            <div class="text-center">
                                <h3 class="text-foreground text-lg font-medium">
                                    Error Loading Data
                                </h3>
                                <p class="text-muted-foreground mt-1 text-sm">
                                    {{ error }}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                @click="$emit('retry')"
                            >
                                <Icon
                                    name="mdi:refresh"
                                    class="mr-2"
                                    size="16"
                                />
                                refresh
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
                <TableRow
                    v-else-if="paginatedItems.length === 0"
                    class="h-full"
                >
                    <TableCell
                        :colspan="columns.length"
                        class="py-12 text-center"
                    >
                        <div class="flex flex-col items-center gap-3">
                            <div class="text-muted-foreground">
                                <Icon name="mdi:database-outline" size="48" />
                            </div>
                            <div class="text-center">
                                <h3 class="text-foreground text-lg font-medium">
                                    Oops!
                                </h3>
                                <p class="text-muted-foreground mt-1 text-sm">
                                    {{
                                        search
                                            ? "No Matched Data"
                                            : "No Data Available"
                                    }}
                                </p>
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
                <template v-else>
                    <TableRow
                        v-for="(row, i) in paginatedItems"
                        :key="row.id"
                        class="cursor-pointer"
                        @click="openDialog(row)"
                    >
                        <Tooltip
                            v-for="col in columns"
                            :key="col.value"
                            :content="getTooltipContent(row[col.value])"
                            :disabled="!isEmpty(row[col.value]) && !col.tooltip"
                            side="bottom"
                            align="center"
                        >
                            <TableCell
                                :key="row.id"
                                :style="{
                                    maxWidth: col.width || undefined,
                                    animationDelay: `${(i + 1) * 30}ms`,
                                }"
                                class="animate-fade h-10 truncate overflow-hidden whitespace-nowrap"
                                :class="cn('even:bg-muted', col.class)"
                            >
                                <template
                                    v-if="
                                        typeof col.badge === 'object' &&
                                        col.badge !== null
                                    "
                                >
                                    <Badge
                                        :variant="
                                            getBadgeVariant(
                                                col.badge,
                                                row[col.value],
                                            )
                                        "
                                    >
                                        {{ row[col.value] }}
                                    </Badge>
                                </template>
                                <template v-else-if="col.badge === true">
                                    <Badge>{{ row[col.value] }}</Badge>
                                </template>
                                <template v-else>
                                    {{ row[col.value] }}
                                </template>
                            </TableCell>
                        </Tooltip>
                    </TableRow>
                </template>
            </TableBody>
        </Table>

        <!-- Pagination -->
        <Pagination
            v-model="currentPage"
            :error="error"
            :loading="loading"
            :total-pages="totalPages"
            :items-per-page="pageSize"
            class="w-auto"
        />

        <Dialog v-model:open="dialog">
            <DialogContent class="bg-popover !max-w-200">
                <DialogHeader class="flex-row items-center gap-4">
                    <div class="flex items-center gap-2">
                        <Icon name="mdi:information-outline" size="24" />
                    </div>
                    <div>
                        <DialogTitle>{{ dialogContent.name }}</DialogTitle>
                        <DialogDescription>{{
                            dialogContent.id
                        }}</DialogDescription>
                    </div>
                </DialogHeader>

                <ScrollArea class="max-h-96 overflow-auto">
                    <DatatableViewer :object="dialogContent ?? {}" />
                </ScrollArea>

                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="destructive">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </section>
</template>

<script setup lang="ts">
import type { BadgeVariants } from "~/components/ui/badge";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
type BadgeVariant = BadgeVariants["variant"];
type ItemsWithId = Record<string, unknown> & { id: string | number };
const {
    items,

    headers,
    pageSize = 25,
    loading = true,
    error = null,
    subtitle = "",
} = defineProps<{
    items: ItemsWithId[];
    pageSize?: number;
    loading?: boolean;
    searchPlaceholder?: string;
    error?: string | null;
    headers?: {
        text: string;
        value: string;
        class?: HTMLAttributes["class"];
        width?: string;
        rowspan?: number;
        searchable?: boolean;
        tooltip?: boolean;
        badge?: boolean | Record<string, BadgeVariant>;
    }[];
    title: string;
    subtitle?: string;
}>();

defineEmits<{
    retry: [];
}>();
const search = ref("");
const currentPage = ref(1);

const columns = computed(() => {
    if (headers && headers.length > 0) {
        return [
            headers.find((col) => col.value === "id") ?? {
                value: "id",
                text: "ID",
                width: "200px",
                tooltip: true,
                searchable: true,
                rowspan: 1,
                badge: false,
                class: ["text-center"],
            },
            ...headers.filter((col) => col.value !== "id"),
        ];
    }
    return Object.keys(items[0] ?? {}).map((key) => ({
        value: key,
        text: key === "id" ? "ID" : key,
        width: key === "id" ? "200px" : undefined,
        tooltip: true,
        searchable: true,
        rowspan: 1,
        badge: false,
        class: ["text-center"],
    }));
});

const filteredItems = computed(() => {
    return (
        items
            // Search
            .filter((row) => {
                if (!search.value) return true;
                const searchLower = search.value.toLowerCase();
                return columns.value.some(
                    (col) =>
                        col.searchable !== false &&
                        String(row[col.value] ?? "")
                            .toLowerCase()
                            .includes(searchLower),
                );
            })
    );
});

const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredItems.value.length / pageSize)),
);
const startIndex = computed(() => (currentPage.value - 1) * pageSize);
const paginatedItems = computed(() => {
    const start = startIndex.value;
    return filteredItems.value.slice(start, start + pageSize);
});

function getBadgeVariant(
    badge: boolean | Record<string, BadgeVariant> | undefined,
    value: unknown,
): BadgeVariant | undefined {
    if (badge && typeof badge === "object" && value !== undefined) {
        const key = String(value);
        if (Object.prototype.hasOwnProperty.call(badge, key)) {
            return badge[key as keyof typeof badge];
        }
    }
    return undefined;
}

function getTooltipContent(
    val: unknown,
): string | Record<string, unknown> | undefined {
    if (typeof val === "string") return val;
    if (
        isObject(val) &&
        Object.getPrototypeOf(val) === Object.prototype &&
        Object.keys(val).length > 0
    ) {
        return val;
    }
    return undefined;
}

const uniqueId = `heading-${useId()}`;

const dialog = ref(false);
const dialogContent = reactive<Record<string, unknown>>({});
function openDialog(item: Record<string, unknown>) {
    dialog.value = true;
    Object.keys(dialogContent).forEach((key) => delete dialogContent[key]);
    Object.assign(dialogContent, item);
}
</script>
