const optionsEnum: any = {
    ID_0: { id: '00', description: '00-Entrada com recuperação de crédito'},
    ID_49: { id: '49', description: '49-Outras entradas' },
    ID_50: { id: '50', description: '50-Saída tributada' },
    ID_99: { id: '99', description: '99-Outras saídas' },
};

export class CstIpint {
    getId(id: string) {
        const keys = Object.keys(optionsEnum);
        for (const key in keys) {
            const element: any = keys[key];
            if (id === optionsEnum[element].id) {
                return element;
            }
        }
        return null;
    }

    getObject(id: string) {
        const keys = Object.keys(optionsEnum);
        for (const key in keys) {
            const element: any = keys[key];
            if (id === optionsEnum[element].id) {
                return optionsEnum[element];
            }
        }
        return {};
    }
}

export const optionsCstIpiTrib = () => {
    const keys = Object.keys(optionsEnum);

    const list = [];
    for (const key in keys) {
        const element: any = keys[key];
        list.push(optionsEnum[element]);
    }
    return list;
};

export const find = (id: string) => {
    const keys = Object.keys(optionsEnum);
    for (const key in keys) {
        const element: any = keys[key];
        if (id === optionsEnum[element].id) {
            return optionsEnum[element];
        }
    }
    return {};
};

