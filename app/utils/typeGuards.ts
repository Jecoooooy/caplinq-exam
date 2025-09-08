/**
 * Type guards
 */
export const isString = (value: unknown): value is string => typeof value === 'string'
export const isNumber = (value: unknown): value is number => typeof value === 'number'
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'
export const isArray = <T = unknown>(value: unknown): value is T[] => Array.isArray(value)
export const isObject = (value: unknown): value is AnyObject & Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value)
export const isFunction = (value: unknown): value is AnyFunction => typeof value === 'function'
export const isEmptyFunction = (func: unknown) =>
	isFunction(func) && func.toString().replace(/ |[\n\r]+/g, '') === '()=>{}'
export const isPrimitive = (value: unknown): value is Primitive =>
	!isObject(value) && !isArray(value)
export const isNull = (value: unknown): value is null => value === null
export const isUndefined = (value: unknown): value is undefined => value === undefined
export const isFloat32Array = (value: unknown): value is Float32Array =>
	value instanceof Float32Array
export const isDate = (value: unknown): value is Date => value instanceof Date
