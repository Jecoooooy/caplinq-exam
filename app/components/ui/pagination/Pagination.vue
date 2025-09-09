<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PaginationRoot } from "reka-ui";
import { cn } from "~/lib/utils";

interface Props {
    class?: HTMLAttributes["class"];
    modelValue?: number;
    totalPages?: number;
    itemsPerPage?: number;
    siblingCount?: number;
    showFirstLast?: boolean;
    showPrevNext?: boolean;
    loading?: boolean;
    error?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: 1,
    totalPages: 1,
    itemsPerPage: 10,
    siblingCount: 1,
    showFirstLast: true,
    showPrevNext: true,
    loading: false,
    error: null,
});

const emits = defineEmits<{
    "update:modelValue": [value: number];
}>();

// Calculate total items from totalPages and itemsPerPage
const total = computed(() => props.totalPages * props.itemsPerPage);

const visiblePages = computed(() => {
    const pages: (number | string)[] = [];
    if (props.totalPages <= 5) {
        for (let i = 1; i <= props.totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if ((props.modelValue ?? 1) > 3) pages.push("...");
        const start = Math.max(2, (props.modelValue ?? 1) - 1);
        const end = Math.min(props.totalPages - 1, (props.modelValue ?? 1) + 1);
        for (let i = start; i <= end; i++) pages.push(i);
        if ((props.modelValue ?? 1) < props.totalPages - 2) pages.push("...");
        pages.push(props.totalPages);
    }
    return pages;
});
</script>

<template>
    <template v-if="props.loading">
        <div class="flex w-full items-center justify-center py-2">
            <span
                class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            ></span>
            <span role="status" aria-live="polite"> fetching data ... </span>
        </div>
    </template>
    <template v-else-if="props.error">
        <div
            class="text-destructive flex w-full items-center justify-center py-2"
        >
            <span class="mr-2">&#9888;</span>
            <span>error: {{ props.error }}</span>
        </div>
    </template>

    <PaginationRoot
        v-else
        v-slot="{ page }"
        :total="total"
        :items-per-page="itemsPerPage"
        :page="modelValue"
        :sibling-count="siblingCount"
        :class="cn('flex w-full justify-between', props.class)"
        @update:page="emits('update:modelValue', $event)"
    >
        <div
            class="text-muted-foreground mr-4 h-8 content-center text-sm"
            role="status"
            aria-live="polite"
        >
            <span
                >{{
                    `showing ${(page - 1) * itemsPerPage + 1}/${Math.min(page * itemsPerPage, total)} out of ${total}`
                }}
            </span>
        </div>
        <PaginationContent :class="{ 'opacity-50': totalPages < 2 }">
            <template v-for="(pageNum, idx) in visiblePages" :key="idx">
                <PaginationEllipsis v-if="pageNum === '...'" />
                <Button
                    v-else-if="typeof pageNum === 'number'"
                    class="size-8"
                    :class="{
                        'shadow-md': pageNum === page,
                        'shadow-none': pageNum !== page,
                    }"
                    :variant="pageNum === page ? 'default' : 'outline'"
                    @click="emits('update:modelValue', pageNum)"
                >
                    <PaginationItem
                        as-child
                        :value="pageNum"
                        :is-active="pageNum === page"
                    >
                        {{ pageNum }}
                    </PaginationItem>
                </Button>
            </template>
        </PaginationContent>
    </PaginationRoot>
</template>
