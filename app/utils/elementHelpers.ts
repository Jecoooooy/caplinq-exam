export const getElement = (el: unknown): Maybe<HTMLElement> => {
	if (isString(el)) {
		const found = document.querySelector(el)
		return found instanceof HTMLElement ? found : undefined
	}
	if (!isObject(el)) return
	if (el.$el) return el.$el // If it's a Vue component instance
	if (el.value && el.value.$el) return el.value.$el // If it's a ref to a Vue component
	if (el instanceof HTMLElement) return el // If it's already an HTMLElement
	if (el.value && el.value instanceof HTMLElement) return el.value // If it's a ref to an HTMLElement
}
