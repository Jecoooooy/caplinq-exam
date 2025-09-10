type ScrollColor =
    | "primary"
    | "card"
    | "popover"
    | "background"
    | "foreground"
    | "accent"
    | "secondary"
    | "muted"
    | "destructive"
    | "success"
    | "warning"
    | "info"
    | "error";

type ScrollHintOptions = {
    color?: ScrollColor;
    height?: string;
    scrollbarHidden?: boolean;
    text?: boolean;
};

export default function useScrollHint(
    element: MaybeRef<HTMLElement | null> | string,
    userOptions: ScrollHintOptions = {},
) {
    if (!element) return;
    let unwatchScrollIndicator: Maybe<AnyFunction>;

    const options: Required<ScrollHintOptions> = {
        color: "card",
        height: "80px",
        scrollbarHidden: true,
        text: true,
        ...userOptions,
    };

    const createScrollIndicator = (target?: HTMLElement) => {
        if (!target) return;
        const { arrivedState } = useScroll(target);

        const scrollIndicatorBottom = document.createElement("div");
        scrollIndicatorBottom.style.backgroundImage = `linear-gradient(to bottom, transparent, var(--${options.color}))`;
        scrollIndicatorBottom.className =
            "scroll-indicator pointer-events-none select-none sticky pb-2 -bottom-1 left-0 flex w-full flex-col items-center justify-end duration-1000 transition-opacity order-last";
        scrollIndicatorBottom.innerHTML = `
		<span class="animate-fade-up  scale-x-150 rotate-180 text-primary/80 animate-infinite">^</span>
			${options.text ? '<span class="block animate-fade-up text-sm text-muted-foreground/50">Scroll down to see more</span>' : ""}`;
        scrollIndicatorBottom.style.minHeight = options.height ?? "80px";
        scrollIndicatorBottom.style.marginTop = `-${options.height}`;

        if (options.scrollbarHidden) {
            target.classList.add("scrollbar-none");
        }

        target.appendChild(scrollIndicatorBottom);
        target.classList.add("relative");

        unwatchScrollIndicator = watch(
            arrivedState,
            (arrivedState) => {
                const hasOverflow = target.scrollHeight > target.clientHeight;
                if (hasOverflow) {
                    scrollIndicatorBottom.style.display = "flex";
                    scrollIndicatorBottom.classList.toggle("opacity-0", arrivedState.bottom);
                    // scrollIndicatorBottom.classList.toggle("pointer-events-none", arrivedState.bottom);
                } else {
                    scrollIndicatorBottom.style.display = "none";
                }
            },
            { immediate: true },
        );
    };

    const cleanup = (el?: HTMLElement) => {
        unwatchScrollIndicator?.();

        if (el instanceof HTMLElement) {
            const scrollIndicator = el.querySelector(".scroll-indicator");
            scrollIndicator?.remove();
            el.classList.remove("relative", "scrollbar-none");
        }
    };

    onBeforeMount(() => {
        if (isRef(element)) {
            watch(
                element,
                (newElement) => {
                    const el = getElement(newElement);
                    cleanup(el);
                    createScrollIndicator(el);
                },
                { immediate: true },
            );
        } else createScrollIndicator(getElement(element));
    });
}
