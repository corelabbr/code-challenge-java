export const formatNumber = (number: string | number | any) => {
    if (!number) {
        return '0,00';
    }
    number = Number(number).toFixed(2);
    const newNumber = Number(number).toLocaleString('pt-BR', {
        style: 'decimal',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });

    return newNumber;
};

export const floatValue = (number: string | any) => {
    if ((number && typeof number) === 'string') {
        number = Number(number.replace('.', '').replace(',', '.'));
    }
    return number;
};

export const roundNumber = (number: string | number) => {
    return Number(Number(number).toFixed(2));
};

export interface IObjectKeys {
    [key: string]: string | number | any;
}
