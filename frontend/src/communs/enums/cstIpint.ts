const optionsEnum: any = {
    ID_1: { id: '01', description: '01-Entrada tributada com alíquota zero' },
    ID_2: { id: '02', description: '02-Entrada isenta' },
    ID_03: { id: '03', description: '03-Entrada não-tributada' },
    ID_04: { id: '04', description: '04-Entrada imune' },
    ID_05: { id: '05', description: '05-Entrada com suspensão' },
    ID_51: { id: '51', description: '51-Saída tributada com alíquota zero' },
    ID_52: { id: '52', description: '52-Saída isenta' },
    ID_53: { id: '53', description: '53-Saída não-tributada' },
    ID_54: { id: '54', description: '54-Saída imune' },
    ID_55: { id: '55', description: '55-Saída com suspensão' },
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

export const optionsCstIpint = () => {
    const keys = Object.keys(optionsEnum);

    const list = [];
    for (const key in keys) {
        const element: any = keys[key];
        list.push(optionsEnum[element]);
    }
    return list;
};

export const findCstIpint = (id: string) => {
    const keys = Object.keys(optionsEnum);
    for (const key in keys) {
        const element: any = keys[key];
        if (id === optionsEnum[element].id) {
            return optionsEnum[element];
        }
    }
    return {};
};
