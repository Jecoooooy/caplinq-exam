export const isEmptyObject = (obj: any): obj is Record<string, never> => isObject(obj) && !Object.keys(obj).length;
