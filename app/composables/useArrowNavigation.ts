export function useArrowNavigation(listRef: Ref<HTMLElement | null>) {
    function handleKeyDown(e: KeyboardEvent, index: number) {
        const nodeList = listRef.value?.querySelectorAll<HTMLLIElement>("li");
        if (!nodeList || nodeList.length === 0) return;

        const items = Array.from(nodeList);

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = (index + 1) % items.length;
            items[next]?.focus();
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev = (index - 1 + items.length) % items.length;
            items[prev]?.focus();
        }
    }

    return {
        handleKeyDown,
    };
}
