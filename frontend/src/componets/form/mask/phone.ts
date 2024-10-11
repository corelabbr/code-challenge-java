export function phoneMask(value: string, onBlur: boolean) {
    if (onBlur) {
        if (!(value.length >= 9)) {
            return '';
        }
    }
    // Remove tudo o que não é dígito
    value = value.replace(/\D/g, '');

    if (value.length > 9) {
        value = value.substring(0, 9);
    }

    return value.replace(/(\d)(\d{4})$/, '$1-$2');
}
