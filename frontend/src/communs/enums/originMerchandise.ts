const optionsEnum: any = {
    NACIONAL: { id: '0', description: '0-Nacional' },
    IMPORTACAO_DIRETA: { id: '1', description: '1-Importação direta' },
    MERCADO_INTERNO: { id: '2', description: '2-Adquirida no mercado interno' },
};

export class OriginMerchandise {
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

export const optionsList = () => {
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
