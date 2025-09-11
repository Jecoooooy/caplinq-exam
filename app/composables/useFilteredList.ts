export function useFilteredList<T extends Record<string, Primitive | AnyArray>>(
    list: Ref<T[]>,
    search: Ref<string>,
    key: keyof T,
) {
    const filtered = computed(() => {
        const query = search.value.trim().toLowerCase();
        const items = list.value;
        if (!query) return items;
        return items.filter((item) => String(item[key]).toLowerCase().includes(query));
    });

    return {
        filtered,
    };
}
