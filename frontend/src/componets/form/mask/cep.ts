export function cepMask(value: string, onBlur: boolean) {
    if (onBlur) {
        if (!(value.length >= 9)) {
            return '';
        }
    }
    // Remove tudo o que não é dígito
    value = value.replace(/\D/g, '');

    if (value.length > 8) {
        value = value.substring(0, 8);
    }

    return value.replace(/(\d)(\d{3})$/, '$1-$2');
}
