const Labor: any = {
    SEM_PRODUTO: { id: '0', description: 'Sem produto' },
    COM_PRODUTO: { id: '1', description: 'Com produto' },
};

export class LaborEnum {
    getId(id: string) {
        const keys = Object.keys(Labor);
        for (const key in keys) {
            const element: any = keys[key];
            if (id === Labor[element].id) {
                return element;
            }
        }
        return null;
    }

    getObject(id: string) {
        const keys = Object.keys(Labor);
        for (const key in keys) {
            const element: any = keys[key];
            if (id === Labor[element].id) {
                return Labor[element];
            }
        }
        return {};
    }
}

export const optionsLabor = (): {
    name?: string;
    description?: string;
    id?: string;
    code?: string;
}[] => {
    const keys = Object.keys(Labor);

    const list = [];
    for (const key in keys) {
        const element: any = keys[key];
        list.push(Labor[element]);
    }
    return list;
};

export const laborFind = (id: string) => {
    const keys = Object.keys(Labor);
    for (const key in keys) {
        const element: any = keys[key];
        if (id === Labor[element].id) {
            return Labor[element];
        }
    }
    return {};
};

export const laborFindDescription = (description: string) => {
    const keys = Object.keys(Labor);
    for (const key in keys) {
        const element: any = keys[key];
        if (description === Labor[element].description) {
            return Labor[element];
        }
    }
    return {};
};

// Enum labor:
// ORCAMENTO(1, "Orçamento"),
// APROVADO(2, "Aprovado/Em andamento"),
// ENTREGADO(3, "Finalizado"),
// FALTA_PECA(5, "Falta peça"),
// NAO_APROVADO(6, "Não aprovado"),
// SEM_CONSERTO(7, "Sem conserto"),
// SERVICO_RELIAZADO(9, "Serviço realizado"),
// GARANTIA_ANDAMENTO(10, "Garantia em andamento"),
// GARANTIA_FALTA_PECA(11, "Garantia em falta peça"),
// GARANTIA_CONCLUIDA(12, "Garantia concluída"),
// TODOS(8, "Todos");
