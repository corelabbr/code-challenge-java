export const tpNfOptions: any = {
    ENTRADA: { id: '0', description: '0 - Entrada' },
    SAIDA: { id: '1', description: '1 - Saída' },
};

export const environmentOptions: any = {
    PRODUCAO: { id: '1', description: '1 - Produção' },
    HOMOLOGACAO: { id: '2', description: '2 - Homologação' },
};

export const tpImpOptions: any = {
    SEM_DANFE: { id: '0', description: '0 - Sem DANFE' },
    DANFE_RETRATO: { id: '1', description: '1 - DANFe Retrato' },
    DANFE_PAISAGEM: { id: '2', description: '2 - DANFe Paisagem' },
    DANFE_SIMPLIFICADO: { id: '3', description: '3 - DANFe Simplificado' },
    DANFE_NFCE: { id: '4', description: '4 - DANFe NFC-e' },
    DANFE_NFCE_MSG_ELETRONICA: {
        id: '5',
        description: '5 - DANFe NFC-e em mensagem eletrônica',
    },
};

export const tpEmisOptions: any = {
    NORMAL: { id: '1', description: '1 - Normal' },
    FS: { id: '2', description: '2 - Contingência FS' },
    NFF: { id: '3', description: '3 - Regime Especial NFF (NT 2021.002)' },
    DPEC: { id: '4', description: '4 - Contingência DPEC' },
    FSDA: { id: '5', description: '5 - Contingência FSDA' },
    SVCRS: { id: '7', description: '7 - Contingência SVC - RS' },
    NFCE: { id: '9', description: '9 - Contingência off-line NFC-e' },
};

export const finNFeOptions: any = {
    NORMAL: { id: '1', description: '1 - NFe normal' },
    NFE_COMPLEMENTAR: { id: '2', description: '2 - NFe complementar' },
    NFE_AJUSTE: { id: '3', description: '3 - NFe de ajuste' },
    DEVOLUCAO_RETORNO: { id: '4', description: '4 - Devolução/Retorno' },
};

export const indFinalOptions: any = {
    NAO: { id: '0', description: '0 - Não' },
    CONSUMIDOR_FINAL: { id: '1', description: '1 - Consumidor final' },
};
// )
export const indPresOptions: any = {
    NAO_SE_APLICA: { id: '0', description: '0 - Não se aplica' },
    OPERACAO_PRESENCIAL: { id: '1', description: '1 - Operação presencial' },
    NAO_PRESENCIAL_INTERNET: {
        id: '2',
        description: '2 - Não presencial, internet',
    },
    NAO_PRESENCIAL_TEL: {
        id: '3',
        description: '3 - Não presencial, teleatendimento',
    },
    NAO_PRESENCIAL_ENTREGA: {
        id: '4',
        description: '4 - NFC-e entrega em domicílio',
    },
    NAO_PRESENCIAL_FORA_ESTABELECIMENTO: {
        id: '5',
        description: '5 - Operação presencial, fora do estabelecimento',
    },
    NAO_PRESENCIAL_OUTROS: {
        id: '9',
        description: '9 - Não presencial, outros',
    },
};

export const procEmiOptions: any = {
    0: {
        id: '0',
        description: '0 - Emissão de NF-e com aplicativo do contribuinte',
    },
    1: { id: '1', description: '1 - Emissão de NF-e avulsa pelo Fisco' },
    2: {
        id: '2',
        description:
            '2 - Emissão de NF-e avulsa, pelo contribuinte com seu certificado digital, através do site do Fisco',
    },
    3: {
        id: '3',
        description:
            '3- Emissão de NF-e pelo contribuinte com aplicativo fornecido pelo Fisco',
    },
};

export const idDestOptions: any = {
    1: {
        id: '1',
        description: '1 - Interna',
    },
    2: { id: '2', description: '2 - Interestadual' },
    3: {
        id: '3',
        description: '3 - Exterior',
    },
};

export const crtOptions: any = {
    1: {
        id: '1',
        description: '1 - Simples Nacional',
    },
    2: {
        id: '2',
        description:
            '2 - Simples Nacional - excesso de sublimite de receita bruta',
    },
    3: {
        id: '3',
        description: '3 - Regime Normal',
    },
};

export const indTotOptions: any = {
    0: {
        id: '0',
        description:
            '0 - O valor do item (vProd) não compõe o valor total da NF-e (vProd)',
    },
    1: {
        id: '1',
        description:
            '1  - O valor do item (vProd) compõe o valor total da NF-e (vProd)',
    },
};

export const origOptions: any = {
    NACIONAL: { id: '0', description: '0 - Nacional' },
    IMPORTACAO_DIRETA: { id: '1', description: '1 - Importação direta' },
    MERCADO_INTERNO: {
        id: '2',
        description: '2 - Adquirida no mercado interno',
    },
};

export const cstIpintOptions: any = {
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

export const cstIpiTribOptions: any = {
    ID_0: { id: '00', description: '00-Entrada com recuperação de crédito' },
    ID_49: { id: '49', description: '49-Outras entradas' },
    ID_50: { id: '50', description: '50-Saída tributada' },
    ID_99: { id: '99', description: '99-Outras saídas' },
};

export const cstPisntOptions: any = {
    ID_4: {
        id: '04',
        description:
            '04-Operação Tributável - Tributação Monofásica - (Alíquota Zero)',
    },
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

export const cstCofinsntOptions: any = {
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

export const indIEDestOptions: any = {
    1: {
        id: '1',
        description: '1 - Contribuinte ICMSpagamento à vista',
    },
    2: { id: '2', description: '2 - Contribuinte isento de inscrição' },
    3: { id: '3', description: '9 - Não Contribuinte' },
};

export const modFreteOptions: any = {
    0: {
        id: '0',
        description: '0 - Contratação do Frete por conta do remetente (CIF)',
    },
    1: {
        id: '1',
        description:
            '1- Contratação do frete por conta do destinatário/remetente (FOB)',
    },
    2: {
        id: '2',
        description: '2 - Contratação do frete por conta de terceiros',
    },
    3: {
        id: '3',
        description: '3 - Transporte próprio por conta do remetente',
    },
    4: {
        id: '4',
        description: '4 - Transporte próprio por conta do destinatário',
    },
    9: {
        id: '9',
        description: '9 - Sem Ocorrência de transporte',
    },
};

export const indPagOptions: any = {
    0: {
        id: '0',
        description: '0 - Pagamento à vista',
    },
    1: {
        id: '1',
        description: '1 - Pagamento à prazo',
    },
};

export const tPagOptions: any = {
    1: { id: '01', description: '01 - Dinheiro' },
    2: { id: '02', description: '02 - Cheque' },
    3: { id: '03', description: '03 - Cartão de Crédito' },
    4: { id: '04', description: '04 - Cartão de Débito' },
    5: { id: '05', description: '05 - Crédito Loja' },
    10: { id: '10', description: '10 - Vale Alimentação' },
    11: { id: '11', description: '11 - Vale Refeição' },
    12: { id: '12', description: '12 - Vale Presente' },
    13: { id: '13', description: '13 - Vale Combustível' },
    15: { id: '15', description: '15 - Boleto Bancário' },
    16: { id: '16', description: '16 - Depósito Bancário' },
    17: { id: '17', description: '17 - Pagamento Instantâneo (PIX)' },
    18: {
        id: '18',
        description: '18 - Transferência bancária, Carteira Digital',
    },
    19: {
        id: '19',
        description: '19 - Programa de fidelidade, Cashback, Crédito Virtual',
    },
    90: { id: '90', description: '90 -  Sem pagamento' },
    99: { id: '99', description: '99 - Outros' },
};

export const yesOrNoOptions: any = {
    0: {
        id: '0',
        description: '0 - Não',
    },
    1: {
        id: '1',
        description: '1 - Sim',
    },
};

export const yesOrNoOrBothOptions: any = {
    0: {
        id: '0',
        description: '0 - Não',
    },
    1: {
        id: '1',
        description: '1 - Sim',
    },
    2: {
        id: '2',
        description: '2 - Todos',
    },
};

export const typeQueryOptions: any = {
    0: {
        id: 'additionalHonorarium',
        description: 'Honorários adicionais',
    },
    1: {
        id: 'legalProcess',
        description: 'Processos',
    },
    2: {
        id: 'additionalExpense',
        description: 'Despesas adicionais',
    },
};

export const typeQueryOperationOptions: any = {
    0: {
        id: 'received',
        description: 'À receber',
    },
    1: {
        id: 'payable',
        description: 'À pagar',
    },
    2: {
        id: 'all',
        description: 'Todas',
    },
};

export const stateLegalProcessOptions: any = {
    0: { id: '1', description: 'Postulatória' },
    1: { id: '2', description: 'Instrutória' },
    2: { id: '3', description: 'Decisória' },
    3: { id: '4', description: 'Recursal' },
    4: { id: '5', description: 'Executória' },
};

export const typeUserOptions: any = {
    0: { id: 'admin', description: 'Administrador' },
    1: { id: 'user', description: 'Usuário' },
};

export const typeQueryExpenditurePortionOptions: any = {
    0: { id: 'admin', description: 'Administrador' },
    1: { id: 'user', description: 'Usuário' },
};

export const monthOptions: any = {
    1: { id: '01', description: 'Janeiro' },
    2: { id: '02', description: 'Fevereiro' },
    3: { id: '03', description: 'Março' },
    4: { id: '04', description: 'Abril' },
    5: { id: '05', description: 'Maio' },
    6: { id: '06', description: 'Junho' },
    7: { id: '07', description: 'Julho' },
    8: { id: '08', description: 'Agosto' },
    9: { id: '09', description: 'Setembro' },
    10: { id: '10', description: 'Outubro' },
    11: { id: '11', description: 'Novembro' },
    12: { id: '12', description: 'Dezembro' },
};

export const maritalStatusOptions: any = {
    '1': {
        id: '01',
        description: 'Solteiro(a)',
    },
    '2': {
        id: '02',
        description: 'Casado(a)',
    },
    '3': {
        id: '03',
        description: 'Separado(a)',
    },
    '4': {
        id: '04',
        description: 'Divorciado(a)',
    },
    '5': {
        id: '05',
        description: 'Viúvo(a)',
    },
    '6': {
        id: '06',
        description: 'União Estável',
    },
};
export const phaseOptions: any = {
    '1': {
        id: '01',
        description: 'Fase Inicial',
    },
    '2': {
        id: '02',
        description: 'Fase de Audiência',
    },
    '3': {
        id: '03',
        description: 'Fase de Citação',
    },
    '4': {
        id: '04',
        description: 'Fase de Conciliação',
    },
    '5': {
        id: '05',
        description: 'Fase de Contestação',
    },
    '6': {
        id: '06',
        description: 'Fase de Sentença',
    },
};

export const resultOptions: any = {
    '1': {
        id: '01',
        description: 'Acordo',
    },
    '2': {
        id: '02',
        description: 'Extinto',
    },
    '3': {
        id: '03',
        description: 'Improcedente',
    },
    '4': {
        id: '04',
        description: 'Parcialmente Procedente',
    },
    '5': {
        id: '05',
        description: 'Procedente',
    },
};

export const statusOptions: any = {
    '1': {
        id: '01',
        description: 'Ativo',
    },
    '2': {
        id: '02',
        description: 'Encerrado',
    },
};

export const urgencyOptions: any = {
    '1': {
        id: '01',
        description: 'Pode esperar',
    },
    '2': {
        id: '02',
        description: 'Pouco urgente',
    },
    '3': {
        id: '03',
        description: 'Requer atenção',
    },
    '4': {
        id: '04',
        description: 'Pode esperar',
    },
};

export const taskSituationOptions: any = {
    '1': {
        id: '01',
        description: 'Não Iniciada',
    },
    '2': {
        id: '02',
        description: 'Em andamento',
    },
    '3': {
        id: '03',
        description: 'Concluída',
    },
};

export const howDidYouFindOptions = {
    '1': {
        id: '01',
        description: 'Agronegócio',
    },
    '2': {
        id: '02',
        description: 'Alimentos e Bebidas',
    },
    '3': {
        id: '03',
        description: 'Arquitetura',
    },
    '4': {
        id: '04',
        description: 'Atacado e Distribuição',
    },
    '5': {
        id: '05',
        description: 'Bebidas',
    },
    '6': {
        id: '06',
        description: 'Beleza',
    },
    '7': {
        id: '07',
        description: 'Cartório',
    },
    '8': {
        id: '08',
        description: 'Comércio em Geral',
    },
    '9': {
        id: '09',
        description: 'Condomínio e Administradora',
    },
    '10': {
        id: '10',
        description: 'Construção Civil',
    },
    '11': {
        id: '11',
        description: 'Contabilidade',
    },
    '12': {
        id: '12',
        description: 'Corretora de Imóveis',
    },
    '13': {
        id: '13',
        description: 'Corretora de Seguros',
    },
    '14': {
        id: '14',
        description: 'Educação',
    },
    '15': {
        id: '15',
        description: 'Indústria',
    },
    '16': {
        id: '16',
        description: 'Material de Construção',
    },
    '17': {
        id: '17',
        description: 'Medicina e Saúde',
    },
    '18': {
        id: '18',
        description: 'Metalúrgica',
    },
    '19': {
        id: '19',
        description: 'Moda',
    },
    '20': {
        id: '20',
        description: 'Outros',
    },
    '21': {
        id: '21',
        description: 'Tecnologia',
    },
    '22': {
        id: '22',
        description: 'Veículos e Peças',
    },
};

export const expertiseSituationOptions: any = {
    '1': {
        id: '01',
        description: 'Agendada',
    },
    '2': {
        id: '02',
        description: 'Concluída',
    },
    '3': {
        id: '03',
        description: 'Cancelada',
    },
};

export const typeNumberPhone: any = {
    CELULAR: { id: '1', description: 'Celular' },
    RESIDENCIAL: { id: '2', description: 'Residencial' },
    TRABALHO: { id: '3', description: 'Trabalho' },
    PARENTE: { id: '4', description: 'Parente' },
    MORA_MESMA_RESIDENCIA: { id: '5', description: 'Mora na mesma residência' },
    VIZINHO: { id: '6', description: 'Vizinho' },
};

export const typeLegalProcessOptions: any = {
    '1': {
        id: '01',
        description: 'Judicial',
    },
    '2': {
        id: '02',
        description: 'Administrativo',
    },
};

export const phaseLegalProcessOptions: any = {
    '1': {
        id: '01',
        description: 'Fase Inicial',
    },
    '2': {
        id: '02',
        description: 'Fase de Audiência',
    },
    '3': {
        id: '03',
        description: 'Fase de Citação',
    },
    '4': {
        id: '04',
        description: 'Fase de Conciliação',
    },
    '5': {
        id: '05',
        description: 'Fase de Contestação',
    },
    '6': {
        id: '06',
        description: 'Fase de Sentença',
    },
};

export const permissionOptions: any = {
    '1': {
        id: '1',
        description: 'Criar usuário',
    },
    '2': {
        id: '2',
        description: 'Alterar usuário',
    },
    '3': {
        id: '3',
        description: 'Deletar usuário',
    },
    '4': {
        id: '4',
        description: 'Listar usuário',
    },
    '5': {
        id: '5',
        description: 'Criar tarefa',
    },
    '6': {
        id: '6',
        description: 'Alterar tarefa',
    },
    '7': {
        id: '7',
        description: 'Excluir tarefa',
    },
    '8': {
        id: '8',
        description: 'Listar tarefa',
    },
    '9': {
        id: '9',
        description: 'Ação master na entidade usuário',
    },
};

export class GenericEnum {
    // Vai receber uma constante do tipo enum
    constructor(private enumProperties: any) {}

    getId(id: string) {
        const keys = Object.keys(this.enumProperties);
        for (const key in keys) {
            const element: any = keys[key];
            if (id === this.enumProperties[element].id) {
                return element;
            }
        }
        return null;
    }

    getObject(id: string): { id: string; description: string } {
        const keys = Object.keys(this.enumProperties);
        for (const key in keys) {
            const element: any = keys[key];
            if (id === this.enumProperties[element].id) {
                return this.enumProperties[element];
            }
        }
        return { id: '', description: '' };
    }

    optionsList = () => {
        const keys = Object.keys(this.enumProperties);

        const list = [];
        for (const key in keys) {
            const element: any = keys[key];
            list.push(this.enumProperties[element]);
        }
        return list;
    };
}
