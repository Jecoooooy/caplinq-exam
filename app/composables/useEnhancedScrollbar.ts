export default function useEnhancedScrollbar(
    element: MaybeRef<HTMLElement | null> | string,
    overflow: "auto" | "scroll" = "auto",
    orientation: "x" | "y" | "auto" = "auto",
) {
    if (!element) return;
    let unwatch: Maybe<AnyFunction>;
    let stopTimeout: Maybe<AnyFunction>;

    const updateScrollbar = (target?: HTMLElement) => {
        if (!target) return;
        // const root = document.body;
        // const primaryColor = getComputedStyle(root).getPropertyValue("--primary").trim();
        // const [l = "0", c = "0", h = "100"] = primaryColor.match(/\d+(\.\d+)?/g) ?? ["0", "0", "100"];
        const l = 0.4;
        const c = 0.04;
        const h = 269.05;
        target.classList.add("scroll-style");
        if (orientation === "auto") {
            target.style.overflow = overflow;
        } else if (orientation === "y") {
            target.style.overflowY = overflow;
        } else {
            target.style.overflowX = overflow;
        }

        target.style.setProperty("--scrollbar-thumb-bg", `oklch(${l} ${c} ${h})`);

        const stylesheet = document.createElement("style");
        stylesheet.textContent = `
		${target.tagName.toLowerCase()}.scroll-style::-webkit-scrollbar {
		width: 8px;
		height: 8px;
		}

		${target.tagName.toLowerCase()}.scroll-style::-webkit-scrollbar-track {
		background-color: oklch(${l} ${c} ${h} / 10%);
        border-radius: 12px;
		}

		${target.tagName.toLowerCase()}.scroll-style::-webkit-scrollbar-thumb {
		border-radius: 12px;
		background-color: var(--scrollbar-thumb-bg);
		
		cursor: grab;
		}

		${target.tagName.toLowerCase()}.scroll-style::-webkit-scrollbar-thumb:hover {
		background-color: oklch(${l} ${c} ${h} / 100%);
		}

		${target.tagName.toLowerCase()}.scroll-style::-webkit-scrollbar-thumb:active {
		background-color: oklch(${l} ${c} ${h} / 100%);
		cursor: grabbing;
		}

		@media (max-width: 768px) {
			${target.tagName.toLowerCase()}.scroll-style::-webkit-scrollbar {
			width: 8px;
			height: 8px;
			}

			${target.tagName.toLowerCase()}.scroll-style::-webkit-scrollbar-thumb {
			border-radius: 6px;
			border: 2px solid transparent;
			}
		}`;
        const existingStylesheet = target.querySelector("style[data-enhanced-scrollbar]");
        if (existingStylesheet) {
            existingStylesheet.remove();
        }
        stylesheet.setAttribute("data-enhanced-scrollbar", "");
        target.appendChild(stylesheet);

        const { isScrolling } = useScroll(target);
        const { start, stop } = useTimeoutFn(
            () => target.style.setProperty("--scrollbar-thumb-bg", `oklch(${l} ${c} ${h} / 50%)`),
            1000,
        );
        stopTimeout = stop;
        unwatch = watch(isScrolling, (scrolling) => {
            scrolling && target.style.setProperty("--scrollbar-thumb-bg", `oklch(${l} ${c} ${h} / 100%)`);
            scrolling ? stop() : start();
        });
    };

    const cleanup = (el: MaybeNull<HTMLElement> = null) => {
        unwatch?.();
        stopTimeout?.();

        if (el) {
            const stylesheet = el.querySelector("style[data-enhanced-scrollbar]");
            stylesheet?.remove();
            el.classList.remove("scroll-style");
        }
    };

    onBeforeMount(() => {
        if (isRef(element)) {
            watch(
                element,
                (newElement) => {
                    const el = getElement(newElement);
                    cleanup(el);
                    updateScrollbar(el);
                },
                { immediate: true },
            );
        } else updateScrollbar(getElement(element));
    });
}
