export const TypeNumberPhone: any = {
    CELULAR: { id: '1', description: 'Celular' },
    RESIDENCIAL: { id: '2', description: 'Residencial' },
    TRABALHO: { id: '3', description: 'Trabalho' },
    PARENTE: { id: '4', description: 'Parente' },
    MORA_MESMA_RESIDENCIA: { id: '5', description: 'Mora na mesma residência' },
    VIZINHO: { id: '6', description: 'Vizinho' },
};

export const optionsTypeNumberPhone = () => {
    const keys = Object.keys(TypeNumberPhone);

    const list = [];
    for (const key in keys) {
        const element: any = keys[key];
        list.push(TypeNumberPhone[element]);
    }
    return list;
};

export const typeNumberPhoneFind = (id: string) => {
    const keys = Object.keys(TypeNumberPhone);
    for (const key in keys) {
        const element: any = keys[key];
        if (id === TypeNumberPhone[element].id) {
            return TypeNumberPhone[element];
        }
    }
    return {};
};
