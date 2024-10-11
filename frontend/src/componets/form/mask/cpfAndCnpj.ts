export function cpfAndCnpjMask(value: string, onBlur: boolean) {
    if (onBlur) {
        // if (!(value.length == 14) && !(value.length == 18)) {
        //     return '';
        // }
    }
    // Remove tudo o que não é dígito
    value = value.replace(/\D/g, '');

    // CNPJ - Ex.: 46.852.487/0001-31 - (18) (4)
    if (value.length > 11) {
        if (value.length == 12) {
            return value.replace(
                new RegExp(eval(`/(\\d{2})(\\d{3})(\\d{3})(\\d{4})$/`)),
                '$1.$2.$3/$4',
            );
        }
        if (value.length > 12) {
            if (value.length > 14) {
                value = value.substring(0, 14);
            }
            const length = value.length - 12;
            return value.replace(
                new RegExp(
                    eval(`/(\\d{2})(\\d{3})(\\d{3})(\\d{4})(\\d{${length}})$/`),
                ),
                '$1.$2.$3/$4-$5',
            );
        }
    }

    if (value.length <= 6 && value.length > 3) {
        const length = value.length - 3;
        // return value.replace(new RegExp(eval(`/${str}/i`)), '$1.$2');
        return value.replace(
            new RegExp(eval(`/(\\d{3})(\\d{${length}})$/`)),
            '$1.$2',
        );
    }

    if (value.length <= 9) {
        const length = value.length - 3 - 3;
        // return value.replace(new RegExp(eval(`/${str}/i`)), '$1.$2');
        return value.replace(
            new RegExp(eval(`/(\\d{3})(\\d{3})(\\d{${length}})$/`)),
            '$1.$2.$3',
        );
    }
    const length = value.length - 3 - 3 - 3;

    return value.replace(
        new RegExp(eval(`/(\\d{3})(\\d{3})(\\d{3})(\\d{${length}})$/`)),
        '$1.$2.$3-$4',
    );
}
