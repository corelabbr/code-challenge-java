// Fiz essa máscara para casos ter inputs que comecem com zero, que é caso do 047
export function numberMask(value: string) {
    // Remove tudo o que não é dígito
    return value.replace(/\D/g, '');
}
