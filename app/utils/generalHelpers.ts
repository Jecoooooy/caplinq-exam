export const isEmpty = (
    value: unknown,
    includeNull = false,
): value is null | undefined | "" | [] | Record<string, never> | (() => void) => {
    return (
        value === undefined ||
        value === "" ||
        (includeNull && value === null) ||
        isEmptyArray(value) ||
        isEmptyObject(value) ||
        isEmptyFunction(value)
    );
};
