declare global {
	// generic query result
	type QueryResult = { [queryName: string]: { data?: AnyObject[] } | AnyObject[] | AnyObject }

	// string | number | symbol
	type AnyKey = keyof any
	// matches array of any
	type AnyArray = any[]
	// matches any functions
	type AnyFunction = (...args: any) => any
	// matches any objects
	interface AnyObject<T = any> {
		[key: string]: T
	}
	// matches objects with string keys
	interface AnyObjectWithStringKeys<T = any> {
		[key: string]: T
	}
	// matches objects with number keys
	interface AnyObjectWithNumberKeys<T = any> {
		[key: number]: T
	}

	type nil = null | undefined
	type Nilable<T> = T | nil
	type Nullable<T> = T | null
	type Undefinable<T> = T | undefined
	type Primitive = string | number | boolean | undefined | null

	// set return type of thunk
	type Thunk<T> = () => T
	// get return type of thunk
	type Unthunk<T extends Thunk<any>> = T extends Thunk<infer R> ? R : never

	// get type of the array elements
	type UnwrapArray<T> = T extends (infer U)[] ? U : T

	// create nested array
	type NestedArray<T> = Array<T | NestedArray<T>>

	// get promise return type
	type PromisedType<T extends Promise<any>> = T extends Promise<infer R> ? R : never

	type Maybe<T> = T | undefined
	type MaybeNil<T> = T | nil
	type MaybeNull<T> = T | null
	type MaybeUndefined<T> = T | undefined
	type MaybeBoolean<T> = T | boolean
	type MaybeThunk<T> = T | Thunk<T>
	// get return type if thunk, otherwise get self
	type MaybeUnthunk<T> = T extends Thunk<infer R> ? R : T
	type MaybePromise<T> = T | Promise<T>
	// get promise return type if promised, otherwise return itself
	type MaybePromisedType<T> = T extends Promise<infer R> ? R : T
	// get promise return type
	type MaybeAsyncReturnType<T extends AnyFunction> = MaybePromisedType<ReturnType<T>>
	type MaybeArray<T> = T | T[]
	type MaybeAsReturnType<T> = T | ((...args: any) => T)
	// get return type if a function, otherwise return itself
	type MaybeReturnType<T> = T extends (...args: any[]) => infer R ? R : T

	// removes both null or undefined from T
	type NonNil<T> = T extends nil ? never : T
	// removes null from T
	type NonNull<T> = T extends null ? never : T
	// removes undefined from T
	type NonUndefined<T> = T extends undefined ? never : T

	// make all properties nilable
	type NilableProps<T> = { [P in keyof T]?: T[P] | nil }
	// make all properties nullable
	type NullableProps<T> = { [P in keyof T]: T[P] | null }

	// make all properties undefinable
	type UndefinableProps<T> = { [P in keyof T]?: T[P] | undefined }
	// make all properties non nilable
	type NonNilProps<T> = { [P in keyof T]-?: NonNil<T[P]> }
	// make all properties non null
	type NonNullProps<T> = { [P in keyof T]: NonNull<T[P]> }
	// make all properties non undefined
	type NonUndefinedProps<T> = { [P in keyof T]-?: NonUndefined<T[P]> }

	// values of object
	type ValueOf<T> = T[keyof T]

	// without some keys
	type ExcludeKeys<T, K extends AnyKey> = Omit<T, K>

	// define at least one property on a given object
	type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
	// define only one property on a given object
	type OnlyOne<T, U = { [K in keyof T]: { [P in K]: T[P] } }> = {
		[K in keyof U]: U[K] & Partial<Record<Exclude<keyof T, K>, undefined>>
	}[keyof U]

	type StrictUnion<T> = T extends any ? (k: T) => void : never

	// get a property
	type Property<T, K> = K extends keyof T ? T[K] : never

	// get keys with values of given type
	type KeyOfType<T, U> = {
		[P in keyof T]-?: T[P] extends U ? P : never
	}[keyof T]

	// get keys with values of given subtype
	type KeyOfSubType<T, U> = {
		[P in keyof T]-?: U extends T[P] ? P : never
	}[keyof T]

	// make some keys optional
	type WithOptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

	// make some keys required
	type WithRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

	// make some keys nilable
	type WithNilableKeys<T, K extends keyof T> = Omit<T, K> & NilableProps<Pick<T, K>>

	// make some keys nullable
	type WithNullableKeys<T, K extends keyof T> = Omit<T, K> & NullableProps<Pick<T, K>>

	// make some keys undefinable
	type WithUndefinableKeys<T, K extends keyof T> = Omit<T, K> & UndefinableProps<Pick<T, K>>

	// make some keys non-nil
	type WithNonNilKeys<T, K extends keyof T> = Omit<T, K> & NonNilProps<Pick<T, K>>

	// make some keys non-null
	type WithNonNullKeys<T, K extends keyof T> = Omit<T, K> & NonNullProps<Pick<T, K>>

	// make some keys non-undefined
	type WithNonUndefinedKeys<T, K extends keyof T> = Omit<T, K> & NonUndefinedProps<Pick<T, K>>

	// first object properties excluding common keys with second object
	type DiffObjects<T, U> = Omit<T, keyof U>

	// union of two objects
	type UnionObjects<T extends AnyObject, U extends AnyObject> = DiffObjects<T, U> & {
		[P in keyof T & keyof U]: T[P] | U[P]
	} & DiffObjects<U, T>

	// similar to Object.assign
	type OverwriteProps<T, U> = U & DiffObjects<T, U>

	// get arguments type
	type Arguments<T extends AnyFunction> = Parameters<T>

	// get arguments type
	type FirstArgument<T extends AnyFunction> = T extends (arg: infer A, ...args: any) => any
		? A
		: never

	// get return value type
	type Return<T extends AnyFunction> = ReturnType<T>

	// get array item type
	type ItemType<T extends any[]> = T extends Array<infer I> ? I : never

	// make all properties readonly recursively including nested objects.
	type DeepReadonly<T> = T extends Primitive
		? T
		: {
				readonly [P in keyof T]: T[P] extends (infer R)[]
					? ReadonlyArray<DeepReadonly<R>>
					: DeepReadonly<T[P]>
			}
	// make all properties mutable recursively including nested objects.
	type DeepMutable<T> = T extends Primitive
		? T
		: T extends ReadonlyArray<infer R>
			? DeepMutable<R>[]
			: T extends Readonly<infer R>
				? DeepMutable<R>
				: {
						-readonly [P in keyof T]: DeepMutable<T[P]>
					}

	// make all properties readonly
	type ShallowReadonly<T> = { readonly [P in keyof T]: T[P] }
	// make all properties mutable
	type ShallowMutable<T> = { -readonly [P in keyof T]: T[P] }

	// make all properties optional recursively including nested objects.
	type DeepPartial<T> = T extends Primitive
		? T
		: {
				[P in keyof T]?: T[P] extends Array<infer I>
					? Array<DeepPartial<I>>
					: DeepPartial<T[P]>
			}
}

export {}
