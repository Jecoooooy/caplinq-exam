export const toRegularCase = (str: string = ""): string =>
    str.replace(/([a-z])([A-Z])|[-_]/g, "$1 $2").toLowerCase();

export const toTitleCase = (str: string = ""): string => {
    return toRegularCase(str).replace(/\b\w/g, (char) => char.toUpperCase());
};

export const toCamelCase = (str: string = ""): string => {
    return toRegularCase(str).replace(/(?:^| )(\w)/g, (match, p1, offset) =>
        offset ? p1.toUpperCase() : p1,
    );
};

export const toPascalCase = (str: string = ""): string => {
    return toRegularCase(str).replace(/(?:^| )(\w)/g, (match, p1) =>
        p1.toUpperCase(),
    );
};

export const toSnakeCase = (str: string = ""): string => {
    return toRegularCase(str).replace(/ /g, "_");
};

export const toKebabCase = (str: string = "", delim: string = "-"): string => {
    return toRegularCase(str).replace(/ /g, delim);
};

export const toUpperFirstChar = (str: string = ""): string =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
