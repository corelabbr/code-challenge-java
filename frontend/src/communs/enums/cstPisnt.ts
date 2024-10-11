const optionsEnum: any = {
    ID_4: {
        id: '04',
        description:
            '04-Operação Tributável - Tributação Monofásica - (Alíquota Zero)',
    },
    ID_5: { id: '05', description: '05 - Operação Tributável (ST)' },
    ID_6: { id: '06', description: '06-Operação Tributável - Alíquota Zero' },
    ID_7: { id: '07', description: '07-Operação Isenta da contribuição' },
    ID_8: {
        id: '08',
        description: '08-Operação Sem Incidência da contribuição',
    },
    ID_9: {
        id: '09',
        description: '09-Operação com suspensão da contribuição',
    },
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

export const optionsCstPisnt = () => {
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
