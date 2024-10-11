export const WarrantyTime: any = {
    SEM: { id: '0', description: 'Sem garantia' },
    UM_MES: { id: '1', description: '1 mês' },
    TRES_MESES: { id: '3', description: '3 meses' },
    QUATRO_MESES: { id: '4', description: '4 meses' },
    CINCO_MESES: { id: '5', description: '5 meses' },
    SEIS_MESES: { id: '6', description: '6 meses' },
    UM_ANO: { id: '12', description: '1 ano' },
};

export const optionsWarrantyTime = () => {
    const keys = Object.keys(WarrantyTime);

    const list = [];
    for (const key in keys) {
        const element: any = keys[key];
        list.push(WarrantyTime[element]);
    }
    return list;
};

export const warrantyTimeFind = (id: string) => {
    const keys = Object.keys(WarrantyTime);
    for (const key in keys) {
        const element: any = keys[key];
        if (id === WarrantyTime[element].id) {
            return WarrantyTime[element];
        }
    }
    return {};
};
