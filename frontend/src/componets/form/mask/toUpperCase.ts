export function toUpperCaseMask(value: string, onBlur: boolean) {
    if (onBlur) {
        return value;
    }

    if (value.length > 0) {
        value = value.toLocaleUpperCase();
    }

    return value;
}
