type ValidTypes = { string: string; number: number; object: AnyObject; array: any[] }
export const isArrayTypeOf = <K extends keyof ValidTypes>(arr: unknown, type: K): arr is ValidTypes[K][] =>
	isArray(arr) &&
	// eslint-disable-next-line valid-typeof
	arr.every((i) => (type === 'array' ? isArray(i) : type === 'object' ? isObject(i) : typeof i === type))

export const isEmptyArray = (arr: unknown) => isArray(arr) && !arr.length

export const toArray = <T>(input: Record<string, T> | T[], sort?: boolean): T[] =>
	(isArray(input)
		? input
		: (sort ? Object.keys(input).sort((a, b) => +a - +b) : Object.keys(input)).map(
				(key) => input[key],
			)) as T[]
