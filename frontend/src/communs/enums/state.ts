const State: any = {
    ORCAMENTO: { id: '1', description: 'Orçamento' },
    APROVADO: { id: '2', description: 'Aprovado' },
    ENTREGADO: { id: '3', description: 'Entregado' },
    ENTREGADO_SEM_CONSERTO: { id: '11', description: 'Entregado sem custo' },
    FALTA_PECA: { id: '4', description: 'Falta peça' },
    NAO_APROVADO: { id: '5', description: 'Não aprovado' },
    SEM_CONSERTO: { id: '6', description: 'Sem conserto' },
    SERVICO_REALIZADO: { id: '7', description: 'Serviço realizado' },
    GARANTIA_ANDAMENTO: { id: '8', description: 'Garantia em andamento' },
    GARANTIA_FALTA_PECA: { id: '9', description: 'Garanria em falta de peça' },
    GARANTIA_CONCLUIDA: { id: '10', description: 'Garantia concluída' },
};

export class StateEnum {
    getId(id: string) {
        const keys = Object.keys(State);
        for (const key in keys) {
            const element: any = keys[key];
            if (id === State[element].id) {
                return element;
            }
        }
        return null;
    }

    getObject(id: string) {
        const keys = Object.keys(State);
        for (const key in keys) {
            const element: any = keys[key];
            if (id === State[element].id) {
                return State[element];
            }
        }
        return {};
    }
}

export const optionsState = () => {
    const keys = Object.keys(State);

    const list = [];
    for (const key in keys) {
        const element: any = keys[key];
        list.push(State[element]);
    }
    return list;
};

export const stateFind = (id: string) => {
    const keys = Object.keys(State);
    for (const key in keys) {
        const element: any = keys[key];
        if (id === State[element].id) {
            return State[element];
        }
    }
    return {};
};

// Enum state:
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
